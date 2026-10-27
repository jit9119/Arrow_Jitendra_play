(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ArrowShapes = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // --- Fast Analytic 2D Primitives on normalized [-1, 1] x [-1, 1] ---
  function dist(x, y, cx, cy) {
    const dx = x - cx, dy = y - cy;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function inCircle(x, y, cx, cy, r) {
    const dx = x - cx, dy = y - cy;
    return dx * dx + dy * dy <= r * r;
  }

  function inRing(x, y, cx, cy, rOut, rIn) {
    const d2 = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    return d2 <= rOut * rOut && d2 >= rIn * rIn;
  }

  function inEllipse(x, y, cx, cy, rx, ry, rot) {
    let dx = x - cx, dy = y - cy;
    if (rot) {
      const c = Math.cos(-rot), s = Math.sin(-rot);
      const nx = dx * c - dy * s;
      dy = dx * s + dy * c;
      dx = nx;
    }
    return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
  }

  function inBox(x, y, cx, cy, hw, hh, rot) {
    let dx = x - cx, dy = y - cy;
    if (rot) {
      const c = Math.cos(-rot), s = Math.sin(-rot);
      const nx = dx * c - dy * s;
      dy = dx * s + dy * c;
      dx = nx;
    }
    return Math.abs(dx) <= hw && Math.abs(dy) <= hh;
  }

  function inRoundBox(x, y, cx, cy, hw, hh, r) {
    const qx = Math.abs(x - cx) - (hw - r);
    const qy = Math.abs(y - cy) - (hh - r);
    const ox = Math.max(qx, 0), oy = Math.max(qy, 0);
    return ox * ox + oy * oy <= r * r;
  }

  function inSegment(x, y, ax, ay, bx, by, r) {
    const pax = x - ax, pay = y - ay;
    const bax = bx - ax, bay = by - ay;
    const denom = bax * bax + bay * bay || 1e-6;
    const h = Math.max(0, Math.min(1, (pax * bax + pay * bay) / denom));
    const dx = pax - bax * h, dy = pay - bay * h;
    return dx * dx + dy * dy <= r * r;
  }

  function inTrapezoid(x, y, yTop, yBot, wTop, wBot, cx) {
    cx = cx || 0;
    if (y < yTop || y > yBot) return false;
    const t = (y - yTop) / ((yBot - yTop) || 1e-6);
    const hw = wTop + (wBot - wTop) * t;
    return Math.abs(x - cx) <= hw;
  }

  function inPoly(x, y, pts) {
    let inside = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const xi = pts[i][0], yi = pts[i][1];
      const xj = pts[j][0], yj = pts[j][1];
      const intersect = ((yi > y) !== (yj > y)) &&
        (x < ((xj - xi) * (y - yi)) / ((yj - yi) || 1e-9) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  function inStar(x, y, cx, cy, n, rOut, rIn, rotOffset) {
    const dx = x - cx, dy = y - cy;
    const r = Math.sqrt(dx * dx + dy * dy);
    if (r > rOut) return false;
    let ang = Math.atan2(dy, dx) + (rotOffset || Math.PI / 2);
    const sector = (Math.PI * 2) / n;
    ang = ((ang % sector) + sector) % sector;
    const half = sector / 2;
    const dAng = Math.abs(ang - half); // 0 at valley, half at tip
    const t = dAng / half; // 0..1
    // Linear polar interpolation cleanly approximates crisp stars
    const maxR = rIn + (rOut - rIn) * Math.pow(t, 0.85);
    return r <= maxR;
  }

  function inHeart(x, y, cx, cy, scale) {
    const px = (x - cx) / scale;
    const py = -(y - cy) / scale + 0.12;
    if (Math.abs(px) > 1.15 || py < -1.1 || py > 1.15) return false;
    const a = px * px + py * py - 0.62;
    return a * a * a - px * px * py * py * py <= 0;
  }

  // 10 Collection Album Chapters (15 levels each = 150 silhouette levels)
  const CHAPTERS = [
    { id: 1, title: 'Royal Treasures', color: '#D4942A' },
    { id: 2, title: 'Ocean Voyage', color: '#2B83B8' },
    { id: 3, title: 'Cozy Cafe', color: '#C85A3B' },
    { id: 4, title: 'Garden Bloom', color: '#4E8F52' },
    { id: 5, title: 'Cute Companions', color: '#D17A3A' },
    { id: 6, title: 'Heritage Wonders', color: '#B55239' },
    { id: 7, title: 'Music & Craft', color: '#7D539E' },
    { id: 8, title: 'Sky & Cosmos', color: '#3962A8' },
    { id: 9, title: 'Play & Arena', color: '#C44545' },
    { id: 10, title: 'Grand Masters', color: '#9E6B24' }
  ];

  // Reusable parametric archetype builders (30 distinct base geometries + parametric variations = 150 distinct silhouettes)
  const ARCHETYPES = {
    // Exact match to Level 10 in 12.jpeg!
    trophy: (x, y, v) => {
      const ax = Math.abs(x);
      const rim = inTrapezoid(x, y, -0.82, -0.12, 0.64 * v.w, 0.20 * v.w);
      const handles = inRing(ax, y, 0.56 * v.w, -0.50, 0.30, 0.14) && ax >= 0.42 * v.w && y >= -0.78 && y <= -0.20;
      const stem = inBox(x, y, 0, 0.08, 0.11, 0.22);
      const base = inTrapezoid(x, y, 0.26, 0.84, 0.14, 0.58 * v.b);
      return rim || handles || stem || base;
    },
    // Exact match to Level 27 in 12.jpeg!
    anchor: (x, y, v) => {
      const ax = Math.abs(x);
      const topRing = inCircle(x, y, 0, -0.63, 0.24 * v.w) && !inCircle(x, y, 0, -0.65, 0.06);
      const shank = inBox(x, y, 0, 0.12, 0.11, 0.64);
      const cross = inBox(x, y, 0, -0.26, 0.48 * v.w, 0.09) || inCircle(ax, y, 0.48 * v.w, -0.20, 0.10);
      const armArc = inRing(x, y, 0, 0.16, 0.72 * v.b, 0.50 * v.b) && y >= 0.14;
      const fluke = inPoly(ax, y, [[0.46 * v.b, 0.28], [0.78 * v.b, 0.04], [0.74 * v.b, 0.44]]);
      const bottomTip = inPoly(x, y, [[-0.22, 0.72], [0.22, 0.72], [0, 0.90]]);
      return topRing || shank || cross || armArc || fluke || bottomTip;
    },
    heart: (x, y, v) => inHeart(x, y, 0, 0.02, 0.82 * v.w) || (v.crown && inTrapezoid(x, y, -0.88, -0.58, 0.26, 0.18)),
    crown: (x, y, v) => {
      const band = inRoundBox(x, y, 0, 0.52, 0.74 * v.w, 0.20, 0.06);
      const body = inPoly(x, y, [
        [-0.74 * v.w, 0.38], [-0.84 * v.w, -0.42 * v.b], [-0.38 * v.w, 0.05],
        [0, -0.68 * v.b], [0.38 * v.w, 0.05], [0.84 * v.w, -0.42 * v.b], [0.74 * v.w, 0.38]
      ]);
      const tips = inCircle(0, -0.70 * v.b, x, y, 0.11) || inCircle(0.84 * v.w, -0.44 * v.b, Math.abs(x), y, 0.10);
      return band || body || tips;
    },
    diamond: (x, y, v) => {
      const top = inTrapezoid(x, y, -0.72 * v.b, -0.24, 0.48 * v.w, 0.84 * v.w);
      const bot = inTrapezoid(x, y, -0.24, 0.82 * v.b, 0.84 * v.w, 0.03);
      return top || bot;
    },
    key: (x, y, v) => {
      const bow = inCircle(x, y, 0, -0.46, 0.36 * v.w) && !inCircle(x, y, 0, -0.50, 0.11);
      const shaft = inBox(x, y, 0, 0.24, 0.11, 0.58);
      const teeth = inBox(x, y, 0.20, 0.50, 0.16 * v.b, 0.09) || inBox(x, y, 0.22, 0.72, 0.18 * v.b, 0.09);
      return bow || shaft || teeth;
    },
    shield: (x, y, v) => {
      if (y < -0.78 || y > 0.86) return false;
      const t = (y + 0.78) / 1.64;
      const hw = t < 0.45 ? 0.76 * v.w : 0.76 * v.w * Math.pow(1 - (t - 0.45) / 0.55, 0.72);
      return Math.abs(x) <= hw;
    },
    hourglass: (x, y, v) => {
      const caps = inBox(x, y, 0, -0.78, 0.66 * v.w, 0.09) || inBox(x, y, 0, 0.78, 0.66 * v.w, 0.09);
      const top = inTrapezoid(x, y, -0.72, 0.02, 0.58 * v.w, 0.13);
      const bot = inTrapezoid(x, y, -0.02, 0.72, 0.13, 0.58 * v.b);
      return caps || top || bot;
    },
    bell: (x, y, v) => {
      const loop = inCircle(x, y, 0, -0.76, 0.14);
      const dome = inEllipse(x, y, 0, -0.22, 0.52 * v.w, 0.50) && y <= 0.25;
      const flare = inTrapezoid(x, y, -0.10, 0.54, 0.48 * v.w, 0.78 * v.b);
      const clapper = inCircle(x, y, 0, 0.64, 0.18);
      return loop || dome || flare || clapper;
    },
    lantern: (x, y, v) => {
      const ring = inCircle(x, y, 0, -0.78, 0.13);
      const roof = inTrapezoid(x, y, -0.68, -0.44, 0.20, 0.58 * v.w);
      const glass = inEllipse(x, y, 0, 0.06, 0.56 * v.w, 0.54 * v.b);
      const foot = inTrapezoid(x, y, 0.52, 0.82, 0.36, 0.52 * v.w);
      return ring || roof || glass || foot;
    },
    star: (x, y, v) => inStar(x, y, 0, 0.03, v.pts || 5, 0.88 * v.w, 0.40 * v.b, -Math.PI / 2),
    sailboat: (x, y, v) => {
      const hull = inTrapezoid(x, y, 0.34, 0.78, 0.82 * v.w, 0.50 * v.w);
      const mast = inBox(x, y, -0.04, -0.12, 0.08, 0.56);
      const mainSail = inPoly(x, y, [[-0.06, -0.82], [-0.06, 0.28], [0.68 * v.b, 0.28]]);
      const jib = inPoly(x, y, [[-0.10, -0.68], [-0.10, 0.28], [-0.66 * v.w, 0.28]]);
      return hull || mast || mainSail || jib;
    },
    lighthouse: (x, y, v) => {
      const dome = inCircle(x, y, 0, -0.68, 0.22);
      const gallery = inBox(x, y, 0, -0.48, 0.36 * v.w, 0.09);
      const tower = inTrapezoid(x, y, -0.42, 0.68, 0.26 * v.w, 0.46 * v.b);
      const rocks = inEllipse(x, y, 0, 0.74, 0.76 * v.w, 0.18);
      return dome || gallery || tower || rocks;
    },
    fish: (x, y, v) => {
      const body = inEllipse(x, y, -0.12, 0, 0.62 * v.w, 0.46 * v.b);
      const tail = inPoly(x, y, [[0.32, 0], [0.86, -0.48 * v.b], [0.74, 0], [0.86, 0.48 * v.b]]);
      const dorsal = inPoly(x, y, [[-0.28, -0.36], [0.06, -0.76 * v.b], [0.22, -0.32]]);
      const ventral = inPoly(x, y, [[-0.18, 0.36], [0.08, 0.70 * v.b], [0.20, 0.32]]);
      return body || tail || dorsal || ventral;
    },
    whale: (x, y, v) => {
      const body = inEllipse(x, y, -0.16, 0.16, 0.66 * v.w, 0.46 * v.b);
      const tailStock = inTrapezoid(y, x, 0.26, 0.72, 0.24, 0.11, 0.22);
      const flukes = inEllipse(x, y, 0.72, -0.06, 0.16, 0.36 * v.b, 0.35);
      const spout = inCircle(x, y, -0.30, -0.58, 0.16) || inCircle(x, y, -0.10, -0.62, 0.14) || inBox(x, y, -0.20, -0.40, 0.09, 0.22);
      return body || tailStock || flukes || spout;
    },
    shell: (x, y, v) => {
      const fan = inCircle(x, y, 0, 0.12, 0.78 * v.w) && (y <= 0.36 || Math.abs(x) <= 0.64 * (1 - (y - 0.12) * 0.7));
      const hinge = inTrapezoid(x, y, 0.42, 0.80, 0.48, 0.28 * v.b);
      return (fan && y >= -0.76) || hinge;
    },
    teapot: (x, y, v) => {
      const pot = inEllipse(x, y, 0.02, 0.12, 0.56 * v.w, 0.48 * v.b);
      const lid = inEllipse(x, y, 0.02, -0.38, 0.34, 0.12) || inCircle(x, y, 0.02, -0.54, 0.12);
      const spout = inSegment(x, y, -0.44, 0.16, -0.82, -0.24, 0.13);
      const handle = inRing(x, y, 0.52 * v.w, 0.08, 0.30, 0.13) && x >= 0.38 * v.w;
      const base = inBox(x, y, 0.02, 0.62, 0.38, 0.10);
      return pot || lid || spout || handle || base;
    },
    cupcake: (x, y, v) => {
      const wrapper = inTrapezoid(x, y, 0.12, 0.82, 0.64 * v.w, 0.44 * v.b);
      const frost1 = inEllipse(x, y, 0, 0.02, 0.70 * v.w, 0.24);
      const frost2 = inEllipse(x, y, 0, -0.26, 0.52 * v.w, 0.22);
      const frost3 = inEllipse(x, y, 0, -0.50, 0.32 * v.w, 0.20);
      const cherry = inCircle(x, y, 0, -0.72, 0.15);
      return wrapper || frost1 || frost2 || frost3 || cherry;
    },
    icecream: (x, y, v) => {
      const cone = inTrapezoid(x, y, 0.02, 0.88, 0.48 * v.w, 0.05);
      const scoopMain = inCircle(x, y, 0, -0.32, 0.48 * v.w);
      const scoopSide = inCircle(Math.abs(x), y, 0.36 * v.w, -0.06, 0.24 * v.b);
      const top = inCircle(x, y, 0, -0.74, 0.16);
      return cone || scoopMain || scoopSide || top;
    },
    apple: (x, y, v) => {
      const lobe = inEllipse(Math.abs(x), y, 0.24 * v.w, 0.12, 0.48 * v.w, 0.56 * v.b, -0.12);
      const stem = inSegment(x, y, 0, -0.34, 0.08, -0.78, 0.08);
      const leaf = inEllipse(x, y, 0.28, -0.62, 0.22, 0.11, -0.45);
      return lobe || stem || leaf;
    },
    mushroom: (x, y, v) => {
      const cap = inEllipse(x, y, 0, -0.14, 0.82 * v.w, 0.56 * v.b) && y <= 0.16;
      const stem = inTrapezoid(x, y, 0.10, 0.84, 0.28 * v.w, 0.38 * v.b);
      return cap || stem;
    },
    umbrella: (x, y, v) => {
      const canopy = inCircle(x, y, 0, 0.06, 0.84 * v.w) && y <= 0.06;
      const tip = inBox(x, y, 0, -0.82, 0.07, 0.10);
      const stick = inBox(x, y, 0, 0.36, 0.08, 0.38);
      const hook = inRing(x, y, -0.16, 0.70, 0.24, 0.09) && y >= 0.66;
      return canopy || tip || stick || hook;
    },
    house: (x, y, v) => {
      const roof = inPoly(x, y, [[-0.86 * v.w, -0.04], [0, -0.84 * v.b], [0.86 * v.w, -0.04]]);
      const chimney = inBox(x, y, 0.44 * v.w, -0.54, 0.13, 0.26);
      const walls = inBox(x, y, 0, 0.38, 0.64 * v.w, 0.44);
      return roof || chimney || walls;
    },
    lotus: (x, y, v) => {
      const ax = Math.abs(x);
      const centerPetal = inEllipse(x, y, 0, -0.14, 0.28 * v.w, 0.66 * v.b);
      const midPetal = inEllipse(ax, y, 0.28 * v.w, -0.04, 0.26 * v.w, 0.56 * v.b, 0.46);
      const outPetal = inEllipse(ax, y, 0.50 * v.w, 0.18, 0.28 * v.w, 0.46 * v.b, 0.92);
      const base = inEllipse(x, y, 0, 0.58, 0.62 * v.w, 0.18);
      return centerPetal || midPetal || outPetal || base;
    },
    tree: (x, y, v) => {
      if (v.pine) {
        const t1 = inPoly(x, y, [[-0.48 * v.w, -0.26], [0, -0.86], [0.48 * v.w, -0.26]]);
        const t2 = inPoly(x, y, [[-0.68 * v.w, 0.14], [0, -0.52], [0.68 * v.w, 0.14]]);
        const t3 = inPoly(x, y, [[-0.84 * v.w, 0.52], [0, -0.16], [0.84 * v.w, 0.52]]);
        const trunk = inBox(x, y, 0, 0.68, 0.18, 0.20);
        return t1 || t2 || t3 || trunk;
      }
      const c1 = inCircle(x, y, 0, -0.38, 0.46 * v.w);
      const c2 = inCircle(Math.abs(x), y, 0.36 * v.w, -0.06, 0.38 * v.b);
      const trunk = inTrapezoid(x, y, 0.18, 0.86, 0.16, 0.28);
      return c1 || c2 || trunk;
    },
    cactus: (x, y, v) => {
      const pot = inTrapezoid(x, y, 0.42, 0.86, 0.46 * v.w, 0.34);
      const rim = inBox(x, y, 0, 0.40, 0.52 * v.w, 0.08);
      const stem = inRoundBox(x, y, 0, -0.18, 0.22 * v.w, 0.62, 0.20);
      const leftArm = inSegment(x, y, -0.20, 0.02, -0.56 * v.b, 0.02, 0.13) || inSegment(x, y, -0.56 * v.b, 0.02, -0.56 * v.b, -0.42, 0.13);
      const rightArm = inSegment(x, y, 0.20, -0.14, 0.56 * v.b, -0.14, 0.13) || inSegment(x, y, 0.56 * v.b, -0.14, 0.56 * v.b, -0.54, 0.13);
      return pot || rim || stem || leftArm || rightArm;
    },
    butterfly: (x, y, v) => {
      const ax = Math.abs(x);
      const body = inEllipse(x, y, 0, 0.04, 0.11, 0.68);
      const head = inCircle(x, y, 0, -0.68, 0.14);
      const topWing = inEllipse(ax, y, 0.44 * v.w, -0.26, 0.44 * v.w, 0.38 * v.b, -0.36);
      const botWing = inEllipse(ax, y, 0.36 * v.w, 0.34, 0.34 * v.w, 0.34 * v.b, 0.38);
      return body || head || topWing || botWing;
    },
    cat: (x, y, v) => {
      const head = inCircle(x, y, 0, -0.34, 0.36 * v.w);
      const ears = inPoly(Math.abs(x), y, [[0.10, -0.58], [0.36 * v.w, -0.88], [0.38 * v.w, -0.44]]);
      const body = inEllipse(x, y, 0, 0.32, 0.44 * v.w, 0.48 * v.b);
      const tail = inSegment(x, y, 0.34 * v.w, 0.62, 0.74 * v.w, 0.22, 0.12) || inCircle(x, y, 0.74 * v.w, 0.12, 0.13);
      return head || ears || body || tail;
    },
    owl: (x, y, v) => {
      const body = inEllipse(x, y, 0, 0.10, 0.58 * v.w, 0.68 * v.b);
      const tufts = inPoly(Math.abs(x), y, [[0.18, -0.44], [0.54 * v.w, -0.84], [0.48 * v.w, -0.30]]);
      const feet = inCircle(Math.abs(x), y, 0.24, 0.78, 0.13);
      const perch = inBox(x, y, 0, 0.82, 0.72 * v.w, 0.07);
      return body || tufts || feet || perch;
    },
    elephant: (x, y, v) => {
      const body = inRoundBox(x, y, 0.14, 0.16, 0.54 * v.w, 0.42 * v.b, 0.24);
      const head = inCircle(x, y, -0.38, -0.14, 0.34 * v.b);
      const ear = inEllipse(x, y, -0.14, -0.16, 0.24, 0.34, 0.15);
      const trunk = inSegment(x, y, -0.64, -0.06, -0.74, 0.48, 0.13) || inCircle(x, y, -0.62, 0.50, 0.13);
      const legs = inBox(x, y, -0.16, 0.64, 0.15, 0.24) || inBox(x, y, 0.44, 0.64, 0.15, 0.24);
      return body || head || ear || trunk || legs;
    },
    swan: (x, y, v) => {
      const body = inEllipse(x, y, 0.12, 0.36, 0.62 * v.w, 0.36 * v.b);
      const wing = inPoly(x, y, [[-0.24, 0.24], [0.68 * v.w, -0.06], [0.58 * v.w, 0.46]]);
      const neck = inSegment(x, y, -0.32, 0.26, -0.44, -0.48, 0.13) || inSegment(x, y, -0.44, -0.48, -0.20, -0.68, 0.13);
      const head = inCircle(x, y, -0.16, -0.62, 0.15) || inPoly(x, y, [[-0.04, -0.66], [0.18, -0.58], [-0.04, -0.52]]);
      return body || wing || neck || head;
    },
    tajmahal: (x, y, v) => {
      const ax = Math.abs(x);
      const plinth = inBox(x, y, 0, 0.72, 0.88 * v.w, 0.14);
      const mainHall = inBox(x, y, 0, 0.34, 0.52 * v.w, 0.28);
      const dome = inEllipse(x, y, 0, -0.18, 0.36 * v.w, 0.42 * v.b) || inPoly(x, y, [[-0.18, -0.48], [0, -0.86], [0.18, -0.48]]);
      const sideDome = inCircle(ax, y, 0.42 * v.w, 0.02, 0.15);
      const minaret = inBox(ax, y, 0.76 * v.w, 0.18, 0.09, 0.48) || inCircle(ax, y, 0.76 * v.w, -0.34, 0.12);
      return plinth || mainHall || dome || sideDome || minaret;
    },
    diya: (x, y, v) => {
      const bowl = inEllipse(x, y, 0, 0.36, 0.80 * v.w, 0.38 * v.b) && y >= 0.08;
      const lip = inEllipse(x, y, 0, 0.14, 0.78 * v.w, 0.14);
      const base = inTrapezoid(x, y, 0.66, 0.84, 0.34, 0.48);
      const flame = inEllipse(x, y, 0, -0.34, 0.26 * v.w, 0.42 * v.b) || inPoly(x, y, [[-0.22 * v.w, -0.42], [0, -0.88], [0.22 * v.w, -0.42]]);
      return bowl || lip || base || flame;
    },
    guitar: (x, y, v) => {
      const lower = inEllipse(x, y, 0, 0.46, 0.56 * v.w, 0.38 * v.b);
      const upper = inEllipse(x, y, 0, 0.02, 0.40 * v.w, 0.28 * v.b);
      const neck = inBox(x, y, 0, -0.46, 0.11, 0.34);
      const headstock = inRoundBox(x, y, 0, -0.76, 0.18, 0.14, 0.05);
      return lower || upper || neck || headstock;
    },
    musicnote: (x, y, v) => {
      const head1 = inEllipse(x, y, -0.38, 0.56, 0.26 * v.w, 0.20, -0.3);
      const head2 = inEllipse(x, y, 0.28, 0.44, 0.26 * v.w, 0.20, -0.3);
      const stem1 = inBox(x, y, -0.18, -0.06, 0.09, 0.60);
      const stem2 = inBox(x, y, 0.48, -0.18, 0.09, 0.60);
      const beam = inPoly(x, y, [[-0.26, -0.62], [0.56, -0.78], [0.56, -0.52], [-0.26, -0.36]]);
      return head1 || head2 || stem1 || stem2 || beam;
    },
    rocket: (x, y, v) => {
      const nose = inPoly(x, y, [[-0.32 * v.w, -0.28], [0, -0.88], [0.32 * v.w, -0.28]]);
      const fuselage = inEllipse(x, y, 0, 0.06, 0.34 * v.w, 0.56 * v.b);
      const fins = inPoly(Math.abs(x), y, [[0.24 * v.w, 0.14], [0.68 * v.w, 0.56], [0.62 * v.w, 0.78], [0.20 * v.w, 0.52]]);
      const exhaust = inPoly(x, y, [[-0.20, 0.56], [0.20, 0.56], [0, 0.88]]);
      return nose || fuselage || fins || exhaust;
    },
    moon: (x, y, v) => {
      const outer = inCircle(x, y, 0.06, 0, 0.80 * v.w);
      const cutout = inCircle(x, y, 0.42 * v.w, -0.14, 0.60 * v.b);
      const miniStar = inStar(x, y, 0.36, -0.18, 4, 0.24, 0.10, 0);
      return (outer && !cutout) || miniStar;
    },
    saturn: (x, y, v) => {
      const globe = inCircle(x, y, 0, 0, 0.46 * v.b);
      const ring = inEllipse(x, y, 0, 0, 0.90 * v.w, 0.24, -0.38);
      return globe || ring;
    },
    knight: (x, y, v) => {
      const base = inTrapezoid(x, y, 0.54, 0.86, 0.44, 0.64 * v.w);
      const neck = inPoly(x, y, [[-0.38, 0.58], [-0.46 * v.w, -0.24], [0.06, -0.82], [0.46 * v.w, -0.44], [0.38, 0.58]]);
      const snout = inRoundBox(x, y, -0.36 * v.w, -0.38, 0.32, 0.18, 0.08);
      return base || neck || snout;
    },
    balloon: (x, y, v) => {
      const env = inCircle(x, y, 0, -0.24, 0.62 * v.w) || inTrapezoid(x, y, -0.14, 0.38, 0.58 * v.w, 0.20);
      const basket = inRoundBox(x, y, 0, 0.68, 0.24 * v.b, 0.18, 0.05) || inBox(x, y, 0, 0.48, 0.16, 0.12);
      return env || basket;
    }
  };

  // Curated 150 distinct silhouette levels across the 10 chapters!
  // Notice Level 10 = Trophy (exact match to left image of 12.jpeg)
  // Notice Level 27 = Anchor (exact match to right image of 12.jpeg)
  const RAW_ITEMS = [
    // Ch 1: Royal Treasures (1..15)
    ['Golden Heart', 'heart', { w: 1.0, b: 1.0 }, ['#E35B5B', '#F7A188', '#FFD966']],
    ['Five-Point Star', 'star', { w: 1.0, b: 1.0, pts: 5 }, ['#E8A838', '#FCE08B', '#FFF5CC']],
    ['Royal Shield', 'shield', { w: 0.95, b: 1.0 }, ['#3F6BA8', '#7FA8DC', '#F2C94C']],
    ['Imperial Crown', 'crown', { w: 1.0, b: 1.0 }, ['#D99B26', '#F7D154', '#E04F5F']],
    ['Brilliant Gem', 'diamond', { w: 1.0, b: 1.0 }, ['#3DB5D8', '#9BE5F7', '#FFFFFF']],
    ['Palace Key', 'key', { w: 1.0, b: 1.0 }, ['#C98A2C', '#F2C96B', '#FFF0B8']],
    ['Sand Hourglass', 'hourglass', { w: 0.95, b: 0.95 }, ['#8C583A', '#73C7E3', '#F2D091']],
    ['Golden Bell', 'bell', { w: 0.96, b: 1.0 }, ['#DE9E28', '#F9D670', '#B86B1E']],
    ['Warm Lantern', 'lantern', { w: 0.95, b: 1.0 }, ['#C75233', '#FFCF66', '#4A342A']],
    ['Champion Trophy', 'trophy', { w: 1.0, b: 1.0 }, ['#D99B26', '#FBE078', '#B57419']], // LEVEL 10!
    ['Crowned Heart', 'heart', { w: 0.95, b: 1.0, crown: true }, ['#D6455D', '#F79BB0', '#F5C842']],
    ['North Compass Star', 'star', { w: 1.02, b: 0.78, pts: 4 }, ['#2F6B9A', '#7CC2F2', '#F2C14E']],
    ['Knight Crest', 'shield', { w: 1.08, b: 0.92 }, ['#8E3B46', '#D97782', '#F2CC68']],
    ['Emerald Cut', 'diamond', { w: 0.86, b: 1.08 }, ['#2A9D68', '#7CE0AF', '#E6FFF2']],
    ['Grand Chalice', 'trophy', { w: 0.86, b: 0.92 }, ['#B87333', '#F2B872', '#6EC5E9']],

    // Ch 2: Ocean Voyage (16..30)
    ['Breezy Sailboat', 'sailboat', { w: 1.0, b: 1.0 }, ['#2B7BB9', '#F7F3E8', '#E05A47']],
    ['Coral Fish', 'fish', { w: 1.0, b: 1.0 }, ['#F07838', '#FFD166', '#2B6E9E']],
    ['Pearl Scallop', 'shell', { w: 1.0, b: 1.0 }, ['#E88D72', '#F9C9B6', '#FFFDF7']],
    ['Harbor Beacon', 'lighthouse', { w: 1.0, b: 1.0 }, ['#D64937', '#F7F4EB', '#FFE066']],
    ['Blue Whale', 'whale', { w: 1.0, b: 1.0 }, ['#3478A8', '#89C4EB', '#EBF7FF']],
    ['Sea Star', 'star', { w: 1.0, b: 1.12, pts: 5 }, ['#E86A4A', '#F9A886', '#FFF0D9']],
    ['Coastal Clipper', 'sailboat', { w: 1.08, b: 0.88 }, ['#1F5C8B', '#FFE8B3', '#D94E41']],
    ['Sunfish', 'fish', { w: 0.88, b: 1.15 }, ['#E6A12E', '#FCE28B', '#3E8EDE']],
    ['Conch Treasure', 'shell', { w: 0.88, b: 1.12 }, ['#D9728F', '#F7B7C9', '#FFF5F8']],
    ['Stormy Cape Tower', 'lighthouse', { w: 1.12, b: 1.08 }, ['#3B6998', '#F2EFE9', '#FFD15C']],
    ['Baby Beluga', 'whale', { w: 0.90, b: 0.92 }, ['#5698C4', '#B8E0F7', '#FFFFFF']],
    ['Royal Anchor', 'anchor', { w: 1.0, b: 1.0 }, ['#35688E', '#6EA8CF', '#D9A441']], // LEVEL 27!
    ['Sunburst Urchin', 'star', { w: 0.96, b: 1.05, pts: 8 }, ['#9B4F96', '#D896D3', '#FFE89E']],
    ['Captain Bell', 'bell', { w: 1.06, b: 0.92 }, ['#C98E2B', '#F4CA64', '#2A5C84']],
    ['Deep Iron Anchor', 'anchor', { w: 1.10, b: 0.92 }, ['#2C4D69', '#5A89AD', '#E8B84B']],

    // Ch 3: Cozy Cafe (31..45)
    ['Chai Kettle', 'teapot', { w: 1.0, b: 1.0 }, ['#C85A3B', '#F29F79', '#FFF3E0']],
    ['Berry Cupcake', 'cupcake', { w: 1.0, b: 1.0 }, ['#E86F92', '#FAD0DC', '#B87A4B']],
    ['Mango Gelato', 'icecream', { w: 1.0, b: 1.0 }, ['#F4A636', '#FFE082', '#C98A4B']],
    ['Orchard Apple', 'apple', { w: 1.0, b: 1.0 }, ['#D94141', '#F78879', '#5CA84E']],
    ['Forest Truffle', 'mushroom', { w: 1.0, b: 1.0 }, ['#D44B3E', '#F5EDE0', '#FFE8D6']],
    ['Cozy Cottage', 'house', { w: 1.0, b: 1.0 }, ['#C75840', '#F2DFC4', '#5A8F5E']],
    ['Rainy Parasol', 'umbrella', { w: 1.0, b: 1.0 }, ['#3E84B8', '#85C1EA', '#D9933D']],
    ['Porcelain Teapot', 'teapot', { w: 0.90, b: 1.12 }, ['#3D7EA6', '#9AD0EC', '#FFFFFF']],
    ['Mint Frosting', 'cupcake', { w: 1.08, b: 0.92 }, ['#4BAE8A', '#A8E8CE', '#9E633C']],
    ['Double Scoop', 'icecream', { w: 1.10, b: 1.12 }, ['#D95B82', '#F9B8CC', '#C48447']],
    ['Golden Pear Apple', 'apple', { w: 0.92, b: 1.10 }, ['#DFB234', '#F9E181', '#4E9A47']],
    ['Toadstool', 'mushroom', { w: 1.10, b: 0.88 }, ['#B84A69', '#F4E9DC', '#FFD4E2']],
    ['Alpine Cabin', 'house', { w: 0.88, b: 1.12 }, ['#8F5638', '#EAD5B7', '#3E7A56']],
    ['Sun Parasol', 'umbrella', { w: 1.08, b: 0.90 }, ['#E68A3E', '#FFD199', '#8A5229']],
    ['Cafe Timer', 'hourglass', { w: 0.88, b: 1.08 }, ['#6B442E', '#D9A066', '#FFF3DF']],

    // Ch 4: Garden Bloom (46..60)
    ['Pink Lotus', 'lotus', { w: 1.0, b: 1.0 }, ['#E36588', '#F9B3C6', '#56A366']],
    ['Banyan Oak', 'tree', { w: 1.0, b: 1.0, pine: false }, ['#4B9454', '#8CD18A', '#855737']],
    ['Cedar Pine', 'tree', { w: 1.0, b: 1.0, pine: true }, ['#2F7A52', '#6BC28E', '#784E32']],
    ['Desert Saguaro', 'cactus', { w: 1.0, b: 1.0 }, ['#4E9E58', '#8BD48E', '#C96A44']],
    ['Monarch Butterfly', 'butterfly', { w: 1.0, b: 1.0 }, ['#E87A2E', '#FFD15C', '#382B24']],
    ['Water Lily', 'lotus', { w: 1.12, b: 0.88 }, ['#9E63B8', '#DAB3EB', '#4B9664']],
    ['Cherry Blossom Tree', 'tree', { w: 1.08, b: 1.06, pine: false }, ['#E37496', '#FAD0DE', '#7A4E38']],
    ['Snowy Fir', 'tree', { w: 0.90, b: 1.08, pine: true }, ['#358275', '#8FD9CC', '#6E4932']],
    ['Terracotta Cactus', 'cactus', { w: 0.92, b: 1.10 }, ['#3B8C5E', '#7AC99B', '#D47348']],
    ['Morpho Butterfly', 'butterfly', { w: 1.08, b: 1.05 }, ['#2980C9', '#7CC6FA', '#2B2523']],
    ['Daisy Star', 'star', { w: 0.98, b: 1.15, pts: 7 }, ['#F2B830', '#FFE899', '#FFFFFF']],
    ['Sweet Nectar Heart', 'heart', { w: 1.05, b: 0.95 }, ['#58A85C', '#A3E09E', '#F2D15B']],
    ['Morel Cap', 'mushroom', { w: 0.90, b: 1.12 }, ['#C77A3B', '#F0DFC8', '#FFE8B8']],
    ['Garden Gazebo Lamp', 'lantern', { w: 1.06, b: 0.92 }, ['#4A8762', '#FFE17D', '#2F4D3B']],
    ['Golden Sunflower', 'star', { w: 1.02, b: 1.22, pts: 9 }, ['#E69C24', '#FAD665', '#6B4423']],

    // Ch 5: Cute Companions (61..75)
    ['Cozy Kitty', 'cat', { w: 1.0, b: 1.0 }, ['#E38B48', '#FAD0A7', '#FFF8F0']],
    ['Wise Owl', 'owl', { w: 1.0, b: 1.0 }, ['#8C5A3C', '#D9B18E', '#F5C84B']],
    ['Royal Elephant', 'elephant', { w: 1.0, b: 1.0 }, ['#6E8499', '#A8BED1', '#E86A58']],
    ['Lake Swan', 'swan', { w: 1.0, b: 1.0 }, ['#5293B8', '#FFFFFF', '#F08C38']],
    ['Calico Cat', 'cat', { w: 1.08, b: 0.94 }, ['#C96B4B', '#F5DEC4', '#4A3B34']],
    ['Snowy Owl', 'owl', { w: 1.08, b: 0.95 }, ['#6C8299', '#EEF5FA', '#F2B838']],
    ['Baby Jumbo', 'elephant', { w: 0.92, b: 1.08 }, ['#7D92B3', '#BCCCE6', '#F29B9B']],
    ['Golden Cygnet', 'swan', { w: 1.08, b: 1.05 }, ['#D99A38', '#FFF4D6', '#D9583B']],
    ['Swallowtail', 'butterfly', { w: 0.94, b: 1.10 }, ['#D6527A', '#F7A8C1', '#FFD966']],
    ['Koi Carp', 'fish', { w: 1.08, b: 0.90 }, ['#E04F3E', '#FFF8F0', '#F2A93B']],
    ['Gentle Orca', 'whale', { w: 1.06, b: 0.94 }, ['#2F4863', '#DCEAF7', '#7BB3DE']],
    ['Playful Pony', 'knight', { w: 1.0, b: 1.0 }, ['#A8683C', '#E6B88A', '#F5E4CC']],
    ['Tabby Kitten', 'cat', { w: 0.90, b: 0.92 }, ['#8C7365', '#DECBBF', '#F29494']],
    ['Barn Owl', 'owl', { w: 0.92, b: 1.08 }, ['#A66E3E', '#F2DFC4', '#E69F35']],
    ['Festival Elephant', 'elephant', { w: 1.06, b: 1.04 }, ['#5B7691', '#E85D4A', '#FAD155']],

    // Ch 6: Heritage Wonders (76..90)
    ['Taj Dome', 'tajmahal', { w: 1.0, b: 1.0 }, ['#4E96A8', '#FAF6EE', '#E8B84B']],
    ['Utsav Diya', 'diya', { w: 1.0, b: 1.0 }, ['#B84E2F', '#FF9F2E', '#FFF08A']],
    ['Jaipur Balloon', 'balloon', { w: 1.0, b: 1.0 }, ['#D9534F', '#FAD165', '#4B8BBE']],
    ['Temple Bell', 'bell', { w: 1.02, b: 1.08 }, ['#C98624', '#F7CF68', '#D94B38']],
    ['Sacred Lotus', 'lotus', { w: 1.06, b: 1.08 }, ['#D94E73', '#FAD4DF', '#F2B838']],
    ['Haveli Lantern', 'lantern', { w: 1.04, b: 1.08 }, ['#A8384B', '#FFD466', '#459E8C']],
    ['Marble Palace', 'tajmahal', { w: 1.08, b: 0.94 }, ['#6678A8', '#FFFDF8', '#E6A83E']],
    ['Deepavali Lamp', 'diya', { w: 1.10, b: 1.06 }, ['#9E3D28', '#FFB838', '#FFF7B8']],
    ['Pushkar Sky Balloon', 'balloon', { w: 1.08, b: 1.05 }, ['#E67A35', '#52A38C', '#FFE380']],
    ['Maharaja Crown', 'crown', { w: 1.08, b: 1.08 }, ['#C98A24', '#FFE073', '#2E9E75']],
    ['Fortress Shield', 'shield', { w: 1.04, b: 1.04 }, ['#A63A32', '#E8956B', '#FAD15A']],
    ['Heritage Key', 'key', { w: 1.08, b: 1.12 }, ['#AD7226', '#EBC06D', '#D94E4E']],
    ['Royal Peacock Swan', 'swan', { w: 1.04, b: 1.10 }, ['#1E7A7A', '#56C7A8', '#F2C14E']],
    ['Kohinoor Facet', 'diamond', { w: 1.06, b: 1.04 }, ['#4B8CD9', '#B8E0FF', '#FFFFFF']],
    ['Rangoli Star', 'star', { w: 1.04, b: 1.16, pts: 6 }, ['#D6456B', '#FCA652', '#FFE875']],

    // Ch 7: Music & Craft (91..105)
    ['Acoustic Guitar', 'guitar', { w: 1.0, b: 1.0 }, ['#B86635', '#E8A86E', '#3D2B22']],
    ['Melody Eighth Notes', 'musicnote', { w: 1.0, b: 1.0 }, ['#6E4A9E', '#B594E6', '#F5C445']],
    ['Chime Bell', 'bell', { w: 0.90, b: 1.10 }, ['#3B82A6', '#92D1EB', '#FAD665']],
    ['Folk Ukulele', 'guitar', { w: 0.88, b: 0.92 }, ['#C77840', '#F2C28D', '#4F8F78']],
    ['Jazz Swing Note', 'musicnote', { w: 1.08, b: 1.06 }, ['#2F6FA3', '#82C0EB', '#F29F3D']],
    ['Artisan Teapot', 'teapot', { w: 1.08, b: 1.04 }, ['#7D529E', '#C9A8E8', '#FFE49E']],
    ['Origami Star', 'star', { w: 1.05, b: 0.86, pts: 6 }, ['#E05A5A', '#FAACAC', '#FFF5E4']],
    ['Stage Spotlight Lamp', 'lantern', { w: 0.90, b: 1.12 }, ['#3D4E6B', '#FFE078', '#E06A4E']],
    ['Concert Harp Swan', 'swan', { w: 0.92, b: 1.12 }, ['#C48B2C', '#FAE29C', '#7A4988']],
    ['Classical Cello', 'guitar', { w: 1.10, b: 1.08 }, ['#94452B', '#D9855B', '#2E201B']],
    ['Tempo Hourglass', 'hourglass', { w: 1.06, b: 0.92 }, ['#56457A', '#B5A1E0', '#FAD165']],
    ['Festival Trophy', 'trophy', { w: 0.94, b: 1.08 }, ['#C97D2E', '#FAD47A', '#8C4B9E']],
    ['Lyric Heart', 'heart', { w: 0.96, b: 1.06 }, ['#9E4784', '#E89BCE', '#FFE082']],
    ['Studio House', 'house', { w: 1.06, b: 0.94 }, ['#547AA8', '#E8EEF5', '#E68A3E']],
    ['Encore Crown', 'crown', { w: 0.96, b: 1.10 }, ['#7C499E', '#C89BF0', '#FAD155']],

    // Ch 8: Sky & Cosmos (106..120)
    ['Lunar Crescent', 'moon', { w: 1.0, b: 1.0 }, ['#E8B838', '#FFF0A8', '#3B5998']],
    ['Orbit Rocket', 'rocket', { w: 1.0, b: 1.0 }, ['#D9483B', '#F2F5FA', '#FFB838']],
    ['Ringed Saturn', 'saturn', { w: 1.0, b: 1.0 }, ['#D9924C', '#F5CFA0', '#6BA4D9']],
    ['Nova Star', 'star', { w: 1.06, b: 0.72, pts: 4 }, ['#4594E6', '#A8D8FF', '#FFFFFF']],
    ['Sky Montgolfier', 'balloon', { w: 0.94, b: 1.08 }, ['#3B82B8', '#8FD1F5', '#F2B84B']],
    ['Harvest Moon', 'moon', { w: 1.08, b: 0.94 }, ['#E68A2E', '#FFD485', '#483D78']],
    ['Deep Space Cruiser', 'rocket', { w: 1.10, b: 1.06 }, ['#2E6BA8', '#EEF4FA', '#F29438']],
    ['Ice Giant Planet', 'saturn', { w: 1.06, b: 0.94 }, ['#2F8EB8', '#96E0FA', '#FAD97F']],
    ['Solar Burst', 'star', { w: 1.04, b: 1.08, pts: 8 }, ['#EB7B26', '#FFD666', '#FFF8D6']],
    ['Starlight Beacon', 'lighthouse', { w: 0.92, b: 1.08 }, ['#48528C', '#E6EBFA', '#FFE375']],
    ['Nebula Butterfly', 'butterfly', { w: 1.04, b: 0.96 }, ['#6D48A8', '#C69CF5', '#68D8F7']],
    ['Comet Diamond', 'diamond', { w: 0.92, b: 1.12 }, ['#3B78C9', '#99CCFF', '#FFF6CC']],
    ['Cloud Parasol', 'umbrella', { w: 0.96, b: 1.08 }, ['#5A8AC4', '#B5D6FA', '#FFD166']],
    ['Cosmic Hourglass', 'hourglass', { w: 1.04, b: 1.04 }, ['#38487A', '#7CC2F5', '#F7C957']],
    ['Apollo Lander Rocket', 'rocket', { w: 0.92, b: 1.10 }, ['#C96A2B', '#F5F2EB', '#4DA6D9']],

    // Ch 9: Play & Arena (121..135)
    ['Grand Chess Knight', 'knight', { w: 1.06, b: 1.04 }, ['#4A3B32', '#B89576', '#F2C96B']],
    ['League Cup', 'trophy', { w: 1.06, b: 0.96 }, ['#D99624', '#FCE07E', '#3D78B8']],
    ['Champion Shield', 'shield', { w: 1.0, b: 1.08 }, ['#2A7B6F', '#7BD4C4', '#FAD15A']],
    ['Regatta Yacht', 'sailboat', { w: 0.94, b: 1.10 }, ['#D64545', '#FAF8F5', '#2F74B5']],
    ['Victory Crown', 'crown', { w: 1.04, b: 0.94 }, ['#D49B28', '#FFE380', '#3A80BA']],
    ['Arena Torch Flame', 'diya', { w: 0.88, b: 1.12 }, ['#C95A2B', '#FFAD33', '#FFF29C']],
    ['Ivory Stallion', 'knight', { w: 0.94, b: 1.08 }, ['#6B7D94', '#EDE8DF', '#D99B38']],
    ['Harbor Marathon Anchor', 'anchor', { w: 0.94, b: 1.06 }, ['#2B5D8C', '#78B5E6', '#F0B840']],
    ['All-Star Badge', 'star', { w: 1.08, b: 0.95, pts: 5 }, ['#C93E4E', '#FA96A2', '#FFE073']],
    ['Final Lap Bell', 'bell', { w: 0.98, b: 1.04 }, ['#D68C24', '#FAD26B', '#C94545']],
    ['Sprint Rocket', 'rocket', { w: 1.04, b: 0.94 }, ['#2E8B78', '#EEF7F5', '#FFA834']],
    ['Summit Pine', 'tree', { w: 1.06, b: 1.04, pine: true }, ['#2B7356', '#74C9A2', '#825538']],
    ['Ace Diamond', 'diamond', { w: 0.96, b: 0.96 }, ['#D43B48', '#FA9BA3', '#FFF5F5']],
    ['Ace Heart', 'heart', { w: 1.02, b: 1.02 }, ['#C93448', '#F78D9B', '#FFF5F5']],
    ['Gold Medallion Cup', 'trophy', { w: 1.08, b: 1.08 }, ['#E09F24', '#FFF099', '#C9483B']],

    // Ch 10: Grand Masters (136..150)
    ['Imperial Taj', 'tajmahal', { w: 1.06, b: 1.08 }, ['#3B829E', '#FFFDF7', '#F2B838']],
    ['Celestial Anchor', 'anchor', { w: 1.06, b: 1.06 }, ['#4B569E', '#9BA8F5', '#FAD15A']],
    ['Golden Lotus Mandala', 'lotus', { w: 1.08, b: 1.08 }, ['#D98E26', '#FFE380', '#E05273']],
    ['Airavata Elephant', 'elephant', { w: 1.08, b: 1.06 }, ['#5E7599', '#EDF2FA', '#F2B438']],
    ['Cosmic Saturn', 'saturn', { w: 1.08, b: 1.06 }, ['#6D4BA8', '#C6A6FA', '#FFD466']],
    ['Phoenix Butterfly', 'butterfly', { w: 1.10, b: 1.08 }, ['#D9482B', '#FFAD38', '#FFF28C']],
    ['Grandmaster Knight', 'knight', { w: 1.08, b: 1.08 }, ['#2E2926', '#D9A84E', '#FFF0B8']],
    ['Eternal Flame Diya', 'diya', { w: 1.06, b: 1.08 }, ['#AD3B28', '#FFA826', '#FFF7B8']],
    ['Symphony Virtuoso', 'guitar', { w: 1.06, b: 1.06 }, ['#8C3B2B', '#E89B68', '#FAD15A']],
    ['Ocean Leviathan', 'whale', { w: 1.08, b: 1.06 }, ['#1F598C', '#78C2F5', '#FFE082']],
    ['Astral Crescent', 'moon', { w: 1.06, b: 1.04 }, ['#D99B26', '#FFEE99', '#5E4FA8']],
    ['Sovereign Key', 'key', { w: 1.08, b: 1.08 }, ['#C98624', '#FFE380', '#3B82A6']],
    ['Emperor Crown', 'crown', { w: 1.10, b: 1.08 }, ['#D99621', '#FFE885', '#D93B52']],
    ['Infinity Star', 'star', { w: 1.08, b: 1.10, pts: 10 }, ['#3B6EC9', '#94C5FF', '#FFE375']],
    ['Legend Trophy 150', 'trophy', { w: 1.10, b: 1.10 }, ['#E6A11F', '#FFF3A1', '#D94141']]
  ];

  const LEVELS_META = RAW_ITEMS.map((item, idx) => {
    const level = idx + 1;
    const chapterIdx = Math.floor(idx / 15);
    return {
      level,
      name: item[0],
      archetype: item[1],
      params: item[2],
      palette: item[3],
      chapter: CHAPTERS[chapterIdx]
    };
  });

  function getLevelMeta(level) {
    const idx = ((Math.max(1, Math.floor(level)) - 1) % LEVELS_META.length);
    return LEVELS_META[idx];
  }

  function samplePoint(meta, nx, ny) {
    const fn = ARCHETYPES[meta.archetype] || ARCHETYPES.heart;
    return fn(nx, ny, meta.params || { w: 1, b: 1 });
  }

  /**
   * Produces a clean boolean grid[y][x] of size gridW x gridH
   * with 5-point supersampling per cell + largest-connected-component cleanup
   * so silhouettes look unmistakably crisp like 12.jpeg!
   */
  function getShapeMask(levelOrMeta, gridW, gridH) {
    const meta = typeof levelOrMeta === 'number' ? getLevelMeta(levelOrMeta) : levelOrMeta;
    const raw = Array.from({ length: gridH }, () => new Uint8Array(gridW));
    const offsets = [[0, 0], [-0.22, -0.22], [0.22, -0.22], [-0.22, 0.22], [0.22, 0.22]];

    for (let y = 0; y < gridH; y++) {
      for (let x = 0; x < gridW; x++) {
        let hits = 0;
        for (let k = 0; k < offsets.length; k++) {
          const nx = ((x + 0.5 + offsets[k][0]) / gridW) * 2 - 1;
          const ny = ((y + 0.5 + offsets[k][1]) / gridH) * 2 - 1;
          if (samplePoint(meta, nx, ny)) hits++;
        }
        if (hits >= 3) raw[y][x] = 1;
      }
    }

    // Keep only connected components of size >= 4 (connect small gaps or prune 1-2px dust)
    const visited = Array.from({ length: gridH }, () => new Uint8Array(gridW));
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (let y = 0; y < gridH; y++) {
      for (let x = 0; x < gridW; x++) {
        if (!raw[y][x] || visited[y][x]) continue;
        const comp = [[x, y]];
        visited[y][x] = 1;
        for (let i = 0; i < comp.length; i++) {
          const [cx, cy] = comp[i];
          for (const [dx, dy] of dirs) {
            const nx = cx + dx, ny = cy + dy;
            if (nx >= 0 && nx < gridW && ny >= 0 && ny < gridH && raw[ny][nx] && !visited[ny][nx]) {
              visited[ny][nx] = 1;
              comp.push([nx, ny]);
            }
          }
        }
        if (comp.length < 4) {
          for (const [cx, cy] of comp) raw[cy][cx] = 0;
        }
      }
    }

    return raw;
  }

  /**
   * Renders rich colorful illustration of the silhouette onto a 2D canvas
   * for the Win Reveal bloom & Collection Album cards!
   */
  function drawShapeArtwork(ctx, levelOrMeta, width, height, options) {
    const meta = typeof levelOrMeta === 'number' ? getLevelMeta(levelOrMeta) : levelOrMeta;
    const opts = options || {};
    const [cMain, cLight, cAccent] = meta.palette;
    const res = opts.resolution || 56;
    const pad = Math.min(width, height) * (opts.padRatio !== undefined ? opts.padRatio : 0.055);
    const drawW = width - pad * 2;
    const drawH = height - pad * 2;
    const cellW = drawW / res;
    const cellH = drawH / res;

    ctx.save();

    // Soft warm glow backdrop circle
    if (opts.backdrop !== false) {
      const grad = ctx.createRadialGradient(width / 2, height / 2, drawW * 0.06, width / 2, height / 2, drawW * 0.56);
      grad.addColorStop(0, cLight + '55');
      grad.addColorStop(1, cLight + '00');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, drawW * 0.56, 0, Math.PI * 2);
      ctx.fill();
    }

    // Build smooth crisp illustration strictly aligned to coveredMask (if provided on board) so arrows cover 100% of the image!
    const cov = opts.coveredMask || null;
    const covH = cov ? cov.length : 0;
    const covW = cov && cov[0] ? cov[0].length : 0;

    const grid = Array.from({ length: res }, () => new Uint8Array(res));
    for (let y = 0; y < res; y++) {
      const ny = ((y + 0.5) / res) * 2 - 1;
      for (let x = 0; x < res; x++) {
        const nx = ((x + 0.5) / res) * 2 - 1;
        if (cov) {
          const gx = Math.min(covW - 1, Math.floor((x / res) * covW));
          const gy = Math.min(covH - 1, Math.floor((y / res) * covH));
          if (cov[gy][gx]) {
            grid[y][x] = 1;
          }
        } else if (samplePoint(meta, nx, ny)) {
          grid[y][x] = 1;
        }
      }
    }

    // Soft drop glow / shadow only when not masked to active puzzle cells
    if (!cov) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      for (let y = 0; y < res; y++) {
        for (let x = 0; x < res; x++) {
          if (!grid[y][x]) continue;
          ctx.fillRect(pad + x * cellW + 3, pad + y * cellH + 4, cellW + 0.6, cellH + 0.6);
        }
      }
    }

    // Colored shaded body with 3-tone studio illustration bands + rim outline
    for (let y = 0; y < res; y++) {
      const ny = ((y + 0.5) / res) * 2 - 1;
      for (let x = 0; x < res; x++) {
        if (!grid[y][x]) continue;
        const nx = ((x + 0.5) / res) * 2 - 1;
        const isEdge = (x === 0 || y === 0 || x === res - 1 || y === res - 1 ||
          !grid[y - 1][x] || !grid[y + 1][x] || !grid[y][x - 1] || !grid[y][x + 1]);
        const isTopLeftHighlight = !isEdge && (x > 1 && y > 1 && (!grid[y - 2]?.[x] || !grid[y]?.[x - 2]));

        // Decorative accent stripe / center motif
        const radial = Math.sqrt(nx * nx + ny * ny);
        const isAccentZone = (!isEdge && (Math.abs(ny + 0.48) < 0.07 || (radial < 0.20 && meta.archetype !== 'moon')));

        if (isEdge) {
          ctx.fillStyle = '#4E3522';
        } else if (isAccentZone) {
          ctx.fillStyle = cAccent;
        } else if (isTopLeftHighlight || (nx + ny < -0.35)) {
          ctx.fillStyle = cLight;
        } else {
          ctx.fillStyle = cMain;
        }

        ctx.fillRect(pad + x * cellW - 0.3, pad + y * cellH - 0.3, cellW + 0.8, cellH + 0.8);
      }
    }

    // Sparkle stars on full reveal
    if (opts.sparkles) {
      const sp = [[-0.68, -0.66, 7], [0.72, -0.58, 6], [-0.74, 0.52, 5], [0.68, 0.62, 7]];
      ctx.fillStyle = '#F4B942';
      for (const [sx, sy, sr] of sp) {
        const px = width / 2 + sx * (drawW * 0.46);
        const py = height / 2 + sy * (drawH * 0.46);
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const r = i % 2 === 0 ? sr : sr * 0.32;
          const a = (i * Math.PI) / 4;
          const vx = px + Math.cos(a) * r, vy = py + Math.sin(a) * r;
          if (i === 0) ctx.moveTo(vx, vy); else ctx.lineTo(vx, vy);
        }
        ctx.closePath();
        ctx.fill();
      }
    }

    ctx.restore();
  }

  return {
    CHAPTERS,
    LEVELS_META,
    ARCHETYPES,
    getLevelMeta,
    getShapeMask,
    drawShapeArtwork
  };
});
