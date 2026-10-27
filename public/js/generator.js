(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    const shapes = require('./shapes.js');
    module.exports = factory(shapes);
  } else {
    root.ArrowGenerator = factory(root.ArrowShapes);
  }
})(typeof self !== 'undefined' ? self : this, function (ArrowShapes) {
  'use strict';

  const DIRS = [
    { dx: 1, dy: 0, name: 'right' },
    { dx: -1, dy: 0, name: 'left' },
    { dx: 0, dy: 1, name: 'down' },
    { dx: 0, dy: -1, name: 'up' }
  ];

  // Mulberry32 deterministic PRNG
  function createRng(seed) {
    let a = (seed >>> 0) || 123456789;
    return function () {
      a |= 0;
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /**
   * Sawtooth Difficulty Plan across 150 Levels:
   * Cycle of 5: [Easy, Easy, Medium, Hard Spike, Relaxing Breather]
   * Special showcase levels: Level 10 (Trophy) & Level 27 (Anchor) match 12.jpeg density!
   */
  function getCampaignConfig(level) {
    const pos = (level - 1) % 5; // 0,1,2 = steady, 3 = hard spike, 4 = breather
    const chapterProg = Math.min(1, (level - 1) / 140);

    let tier = 'smooth';
    let tierLabel = 'Tactical';
    let gridSize = Math.round(19 + chapterProg * 6);
    let maxLen = Math.round(14 + chapterProg * 12);
    let blocking = 0.78 + chapterProg * 0.18;
    let droplets = 3;

    if (level <= 2) {
      gridSize = 17 + level; // 18, 19 — engaging labyrinth right from Level 1!
      maxLen = 13 + level * 2;
      blocking = 0.72 + level * 0.05;
      droplets = 3;
    } else if (pos === 3) {
      // Sawtooth Hard Spike (Levels 4, 9, 14, 19, 24, 29...)
      tier = 'challenge';
      tierLabel = 'Hard Challenge';
      gridSize = Math.min(26, Math.round(21 + chapterProg * 5));
      maxLen = Math.min(30, Math.round(20 + chapterProg * 10));
      blocking = Math.min(0.98, 0.90 + chapterProg * 0.08);
      droplets = 3;
    } else if (pos === 4) {
      // Post-spike Flow Level (Levels 5, 10, 15, 20...)
      tier = 'breather';
      tierLabel = 'Strategic Flow';
      gridSize = Math.min(24, Math.round(18 + chapterProg * 6));
      maxLen = Math.min(26, Math.round(16 + chapterProg * 9));
      blocking = 0.74 + chapterProg * 0.16;
      droplets = 3;
    } else if (pos === 2) {
      tier = 'medium';
      tierLabel = 'Intense';
      gridSize = Math.min(25, Math.round(20 + chapterProg * 5));
      maxLen = Math.min(28, Math.round(18 + chapterProg * 10));
      blocking = 0.84 + chapterProg * 0.13;
      droplets = 3;
    }

    // Showcase Levels 10 (Trophy) & 27 (Anchor)
    if (level === 10) {
      gridSize = 23;
      maxLen = 22;
      blocking = 0.88;
      droplets = 3;
    } else if (level === 27) {
      tier = 'challenge';
      tierLabel = 'Master Signature';
      gridSize = 25;
      maxLen = 24;
      blocking = 0.94;
      droplets = 3;
    }

    // Rotating Level Task (English only)
    const taskTypes = ['flawless', 'speed', 'no_hint', 'red_first', 'combo', 'no_undo'];
    const taskType = level === 1 ? 'flawless' : taskTypes[(level - 1) % taskTypes.length];
    const parSeconds = Math.max(45, Math.min(150, Math.round(gridSize * 4.2 + (tier === 'challenge' ? 25 : 0))));
    const comboTarget = level <= 6 ? 4 : (tier === 'challenge' ? 6 : 5);
    const redCount = taskType === 'red_first' ? (gridSize >= 18 ? 4 : 3) : 0;

    const TASK_DEFS = {
      flawless: {
        type: 'flawless',
        en: 'Solve with 0 mistakes',
        bonusPts: 120
      },
      speed: {
        type: 'speed',
        targetSec: parSeconds,
        en: `Finish under ${parSeconds}s`,
        bonusPts: 140
      },
      no_hint: {
        type: 'no_hint',
        en: 'Solve without Hints',
        bonusPts: 100
      },
      red_first: {
        type: 'red_first',
        redCount,
        en: `Clear ${redCount} Red arrows first`,
        bonusPts: 150
      },
      combo: {
        type: 'combo',
        comboTarget,
        en: `Build a Combo x${comboTarget}`,
        bonusPts: 130
      },
      no_undo: {
        type: 'no_undo',
        en: 'Solve without Undo',
        bonusPts: 100
      }
    };

    return {
      level,
      tier,
      tierLabel,
      gridW: gridSize,
      gridH: gridSize,
      minLen: 3,
      maxLen,
      density: 1.0,
      blocking,
      droplets,
      task: TASK_DEFS[taskType]
    };
  }

  function isRayClearOfRemaining(rem, gridW, gridH, hx, hy, dx, dy) {
    let cx = hx + dx;
    let cy = hy + dy;
    while (cx >= 0 && cx < gridW && cy >= 0 && cy < gridH) {
      if (rem[cy][cx]) return false;
      cx += dx;
      cy += dy;
    }
    return true;
  }

  function countRayPeeledHits(peeledDepthGrid, gridW, gridH, hx, hy, dx, dy) {
    let hits = 0;
    let maxDepth = 0;
    let cx = hx + dx;
    let cy = hy + dy;
    while (cx >= 0 && cx < gridW && cy >= 0 && cy < gridH) {
      const d = peeledDepthGrid[cy][cx];
      if (d > 0) {
        hits++;
        if (d > maxDepth) maxDepth = d;
      }
      cx += dx;
      cy += dy;
    }
    return { hits, maxDepth };
  }

  function countNeighbors(rem, gridW, gridH, x, y) {
    let c = 0;
    if (x > 0 && rem[y][x - 1]) c++;
    if (x + 1 < gridW && rem[y][x + 1]) c++;
    if (y > 0 && rem[y - 1][x]) c++;
    if (y + 1 < gridH && rem[y + 1][x]) c++;
    return c;
  }

  /**
   * Core Guaranteed-Solvable Snake Arrow Generator
   * Uses outside-in / channel-carving peeling + lossless tail absorption:
   * - Every arrow is an orthogonal bent snake of 3..maxLen (<=30) cells.
   * - Guaranteed solvable removal order [arrows[0], arrows[1], ..., arrows[N-1]] (shuffled IDs for display).
   */
  function generateBoard(customMask, config) {
    const cfg = Object.assign({
      seed: 1001,
      gridW: 18,
      gridH: 18,
      minLen: 3,
      maxLen: 20,
      density: 1.0,
      blocking: 0.65,
      turnBias: 0.58,
      redCount: 0
    }, config || {});

    const gridW = cfg.gridW;
    const gridH = cfg.gridH;
    const minLen = Math.max(3, Math.min(10, cfg.minLen || 3));
    const maxLen = Math.max(minLen + 1, Math.min(30, cfg.maxLen || 20));
    const rng = createRng(cfg.seed);

    // Clone mask into mutable remaining grid
    const rem = Array.from({ length: gridH }, (_, y) => {
      const row = new Uint8Array(gridW);
      for (let x = 0; x < gridW; x++) {
        row[x] = customMask[y]?.[x] ? 1 : 0;
      }
      return row;
    });

    // Track depth of peeled cells to score interlock chains
    const peeledDepthGrid = Array.from({ length: gridH }, () => new Uint16Array(gridW));
    const peeledArrows = [];

    let safety = gridW * gridH * 4;
    while (safety-- > 0) {
      // Collect all valid (head, dir) candidates where:
      // 1) head in rem
      // 2) neck = head - dir in rem
      // 3) neck has at least 1 other neighbor in rem (so length >= 3 is achievable!)
      // 4) exit ray from head in dir hits NO cells in rem
      const candidates = [];

      for (let y = 0; y < gridH; y++) {
        for (let x = 0; x < gridW; x++) {
          if (!rem[y][x]) continue;
          for (let di = 0; di < 4; di++) {
            const d = DIRS[di];
            const nx = x - d.dx;
            const ny = y - d.dy;
            if (nx < 0 || nx >= gridW || ny < 0 || ny >= gridH || !rem[ny][nx]) continue;
            if (!isRayClearOfRemaining(rem, gridW, gridH, x, y, d.dx, d.dy)) continue;

            // Check if at least 1 third cell exists adjacent to neck (excluding head)
            let hasThird = false;
            for (let k = 0; k < 4; k++) {
              const tx = nx + DIRS[k].dx;
              const ty = ny + DIRS[k].dy;
              if ((tx !== x || ty !== y) && tx >= 0 && tx < gridW && ty >= 0 && ty < gridH && rem[ty][tx]) {
                hasThird = true;
                break;
              }
            }
            if (!hasThird) continue;

            const rayInfo = countRayPeeledHits(peeledDepthGrid, gridW, gridH, x, y, d.dx, d.dy);
            const headDeg = countNeighbors(rem, gridW, gridH, x, y);

            // Score candidate according to blocking depth:
            // Once at least 2 entry arrows exist, strongly penalize 0-blocker boundary exits so arrows form deep sequential lock chains!
            const zeroHitPenalty = (peeledArrows.length >= 2 && rayInfo.hits === 0) ? (-9.0 * cfg.blocking) : 0;
            const lockBonus = (rayInfo.maxDepth * 4.8 + Math.min(rayInfo.hits, 8) * 2.1) * cfg.blocking + zeroHitPenalty;
            const leafBonus = (4 - headDeg) * 0.7;
            const score = lockBonus + leafBonus + rng() * 0.85;

            candidates.push({
              hx: x,
              hy: y,
              nx,
              ny,
              dx: d.dx,
              dy: d.dy,
              unlockDepth: rayInfo.maxDepth + 1,
              score
            });
          }
        }
      }

      if (candidates.length === 0) break;

      // Pick top interlocking candidate
      candidates.sort((a, b) => b.score - a.score);
      const pickIdx = Math.min(candidates.length - 1, Math.floor(rng() * Math.min(2, candidates.length)));
      const pick = candidates[pickIdx];

      // Target length biased toward dense labyrinth snakes (4..11) + medium hero snakes so more arrows pack the silhouette!
      const roll = rng();
      const span = maxLen - minLen + 1;
      const skewed = roll < 0.84 ? Math.pow(rng(), 1.85) : (0.50 + rng() * 0.50);
      const targetLen = Math.min(maxLen, minLen + Math.floor(skewed * span));

      // Grow snake from head -> neck -> ... -> tail inside rem (never stepping onto Ray(head, dir), which has rem==0 anyway!)
      const revCells = [
        { x: pick.hx, y: pick.hy },
        { x: pick.nx, y: pick.ny }
      ];
      rem[pick.hy][pick.hx] = 0;
      rem[pick.ny][pick.nx] = 0;

      let prevDx = pick.nx - pick.hx;
      let prevDy = pick.ny - pick.hy;

      while (revCells.length < targetLen) {
        const cur = revCells[revCells.length - 1];
        const stepOpts = [];
        for (let k = 0; k < 4; k++) {
          const sd = DIRS[k];
          const sx = cur.x + sd.dx;
          const sy = cur.y + sd.dy;
          if (sx < 0 || sx >= gridW || sy < 0 || sy >= gridH || !rem[sy][sx]) continue;
          const deg = countNeighbors(rem, gridW, gridH, sx, sy);
          const isTurn = (sd.dx !== prevDx || sd.dy !== prevDy);
          // Warnsdorff heuristic (prefer low-degree cells so we don't strand 1-cell islands) + bendy maze bias!
          const wScore = (4 - deg) * 1.35 + (isTurn ? cfg.turnBias * 1.5 : 0.4) + rng() * 1.1;
          stepOpts.push({ x: sx, y: sy, dx: sd.dx, dy: sd.dy, wScore });
        }
        if (stepOpts.length === 0) break;
        stepOpts.sort((a, b) => b.wScore - a.wScore);
        const best = stepOpts[0];
        revCells.push({ x: best.x, y: best.y });
        rem[best.y][best.x] = 0;
        prevDx = best.dx;
        prevDy = best.dy;
      }

      if (revCells.length < 3) {
        // Restore (should not happen due to hasThird check)
        for (const c of revCells) rem[c.y][c.x] = 1;
        break;
      }

      // Convert [head, neck, ..., tail] -> [tail, ..., neck, head]
      const cells = revCells.reverse();
      const arrowObj = {
        peelIndex: peeledArrows.length,
        cells,
        dir: { dx: pick.dx, dy: pick.dy },
        unlockDepth: pick.unlockDepth,
        isRed: false
      };
      peeledArrows.push(arrowObj);

      for (const c of cells) {
        peeledDepthGrid[c.y][c.x] = pick.unlockDepth;
      }
    }

    // Lossless Tail-Absorption Pass:
    // Any remaining cell u in rem was NEVER on Ray(A_k) for any peeled arrow A_k!
    // Prepending u onto an adjacent tail up to 30 cells preserves 100% mathematical solvability and fills silhouettes completely!
    let absorbed = true;
    while (absorbed) {
      absorbed = false;
      for (const arrow of peeledArrows) {
        if (arrow.cells.length >= 30) continue;
        const tail = arrow.cells[0];
        for (let k = 0; k < 4; k++) {
          const ux = tail.x + DIRS[k].dx;
          const uy = tail.y + DIRS[k].dy;
          if (ux >= 0 && ux < gridW && uy >= 0 && uy < gridH && rem[uy][ux]) {
            rem[uy][ux] = 0;
            arrow.cells.unshift({ x: ux, y: uy });
            peeledDepthGrid[uy][ux] = arrow.unlockDepth;
            absorbed = true;
            break;
          }
        }
      }
    }

    let finalArrows = peeledArrows;

    // Tag Red First priority arrows on the FIRST redCount peeled arrows so they are 100% guaranteed clearable first!
    const redCount = Math.min(cfg.redCount || 0, Math.max(0, finalArrows.length - 2));
    for (let i = 0; i < redCount; i++) {
      finalArrows[i].isRed = true;
    }

    const coveredMask = Array.from({ length: gridH }, () => new Uint8Array(gridW));
    const indexed = finalArrows.map((a, idx) => {
      for (const c of a.cells) {
        if (c.x >= 0 && c.x < gridW && c.y >= 0 && c.y < gridH) {
          coveredMask[c.y][c.x] = 1;
        }
      }
      return {
        id: idx + 1,
        peelOrder: idx,
        cells: a.cells,
        dir: a.dir,
        unlockDepth: a.unlockDepth,
        isRed: a.isRed
      };
    });

    let totalCells = 0;
    let maxDepth = 1;
    for (const a of indexed) {
      totalCells += a.cells.length;
      if (a.unlockDepth > maxDepth) maxDepth = a.unlockDepth;
    }

    return {
      gridW,
      gridH,
      coveredMask,
      arrows: indexed,
      stats: {
        arrowCount: indexed.length,
        totalCells,
        avgLen: indexed.length ? +(totalCells / indexed.length).toFixed(1) : 0,
        maxUnlockDepth: maxDepth
      }
    };
  }

  /**
   * Checks if arrow `target` is unblocked given `activeArrows` on board.
   * Returns { blocked: false } OR { blocked: true, blockerId, distanceCells }
   */
  function checkArrowExit(target, activeArrows, gridW, gridH) {
    const occ = new Int32Array(gridW * gridH);
    for (let i = 0; i < activeArrows.length; i++) {
      const a = activeArrows[i];
      if (a.id === target.id || a.exiting) continue;
      for (let j = 0; j < a.cells.length; j++) {
        const c = a.cells[j];
        if (c.x >= 0 && c.x < gridW && c.y >= 0 && c.y < gridH) {
          occ[c.y * gridW + c.x] = a.id;
        }
      }
    }

    const head = target.cells[target.cells.length - 1];
    let cx = head.x + target.dir.dx;
    let cy = head.y + target.dir.dy;
    let step = 1;
    while (cx >= 0 && cx < gridW && cy >= 0 && cy < gridH) {
      const hitId = occ[cy * gridW + cx];
      if (hitId !== 0) {
        return {
          blocked: true,
          blockerId: hitId,
          distanceCells: step,
          hitCell: { x: cx, y: cy }
        };
      }
      cx += target.dir.dx;
      cy += target.dir.dy;
      step++;
    }
    return { blocked: false, distanceCells: step };
  }

  /**
   * Finds the best unblocked arrow for the Hint Bulb (prioritizes Red arrows if redFirstActive!)
   */
  function findHintArrow(activeArrows, gridW, gridH, preferRed) {
    const candidates = activeArrows.filter((a) => !a.exiting);
    candidates.sort((a, b) => {
      if (preferRed && a.isRed !== b.isRed) return a.isRed ? -1 : 1;
      return a.peelOrder - b.peelOrder;
    });
    for (const a of candidates) {
      const res = checkArrowExit(a, candidates, gridW, gridH);
      if (!res.blocked) return a;
    }
    return null;
  }

  /**
   * Generates a complete campaign level (1..150+)
   */
  function generateCampaignLevel(level) {
    const meta = ArrowShapes.getLevelMeta(level);
    const camp = getCampaignConfig(level);
    const mask = ArrowShapes.getShapeMask(meta, camp.gridW, camp.gridH);
    const board = generateBoard(mask, {
      seed: level * 7919 + 1337,
      gridW: camp.gridW,
      gridH: camp.gridH,
      minLen: camp.minLen,
      maxLen: camp.maxLen,
      density: camp.density,
      blocking: camp.blocking,
      redCount: camp.task.redCount || 0
    });
    return {
      level,
      meta,
      campaign: camp,
      mask: board.coveredMask,
      coveredMask: board.coveredMask,
      gridW: board.gridW,
      gridH: board.gridH,
      arrows: board.arrows,
      stats: board.stats
    };
  }

  /**
   * Generates the Global Daily Arena Level for a given YYYY-MM-DD dateKey.
   * Every player worldwide gets the exact same shape & snake layout for today!
   */
  function generateDailyArenaLevel(dateKey) {
    const cleanDate = String(dateKey || '2026-10-25').trim();
    let hash = 2166136261;
    for (let i = 0; i < cleanDate.length; i++) {
      hash ^= cleanDate.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    const uSeed = (hash >>> 0) || 987654321;
    const shapeLv = (uSeed % 150) + 1;
    const baseMeta = ArrowShapes.getLevelMeta(shapeLv);
    const meta = Object.assign({}, baseMeta, {
      name: `Daily Arena: ${baseMeta.name}`
    });
    const gridW = 20;
    const gridH = 20;
    const mask = ArrowShapes.getShapeMask(baseMeta, gridW, gridH);
    const board = generateBoard(mask, {
      seed: uSeed,
      gridW,
      gridH,
      minLen: 3,
      maxLen: 14,
      density: 0.94,
      blocking: 1.35,
      redCount: 0
    });
    return {
      level: shapeLv,
      isDailyArena: true,
      dateKey: cleanDate,
      meta,
      campaign: {
        gridW,
        gridH,
        tierLabel: 'Daily Arena • Fastest Time Wins',
        droplets: 5,
        task: {
          type: 'speed',
          targetSec: 75,
          bonusPts: 250,
          en: 'Fastest Time Wins Today!'
        }
      },
      mask: board.coveredMask,
      coveredMask: board.coveredMask,
      gridW: board.gridW,
      gridH: board.gridH,
      arrows: board.arrows,
      stats: board.stats
    };
  }

  return {
    DIRS,
    createRng,
    getCampaignConfig,
    generateBoard,
    generateCampaignLevel,
    generateDailyArenaLevel,
    checkArrowExit,
    findHintArrow
  };
});
