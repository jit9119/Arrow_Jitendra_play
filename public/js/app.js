(function () {
  'use strict';

  const LEVEL_CLEAR_GEMS = 5;

  // --- 6 Luxury UI + Board Themes (Default Free + 5 Paid Gem Themes; #6 is Ultimate LEGENDARY!) ---
  const PREMIUM_THEMES = [
    {
      id: 'cosmic',
      name: 'Cosmic Space',
      rarity: 'FREE',
      price: 0,
      themeColor: '#060916',
      boardBg: '#060813',
      coverFill: 'rgba(6, 8, 19, 0.92)',
      starFill: 'rgba(255, 255, 255, 0.30)',
      gridStroke: 'rgba(148, 163, 184, 0.15)',
      accent: '#A855F7',
      swatchTop: '#231656',
      swatchBot: '#060813',
      isLight: false
    },
    {
      id: 'paper',
      name: 'Royal Parchment',
      rarity: 'RARE',
      price: 40,
      themeColor: '#efe7d6',
      boardBg: '#FCF8F0',
      coverFill: 'rgba(252, 248, 240, 0.95)',
      starFill: 'rgba(180, 130, 60, 0.16)',
      gridStroke: 'rgba(30, 41, 59, 0.11)',
      accent: '#D97706',
      swatchTop: '#FFFDF9',
      swatchBot: '#E5D8BD',
      isLight: true
    },
    {
      id: 'emerald',
      name: 'Emerald Matrix',
      rarity: 'EPIC',
      price: 70,
      themeColor: '#04130e',
      boardBg: '#04140F',
      coverFill: 'rgba(4, 20, 15, 0.93)',
      starFill: 'rgba(110, 231, 183, 0.28)',
      gridStroke: 'rgba(52, 211, 153, 0.16)',
      accent: '#10B981',
      swatchTop: '#0E4E3A',
      swatchBot: '#04140F',
      isLight: false
    },
    {
      id: 'crimson',
      name: 'Crimson Velvet',
      rarity: 'ROYAL',
      price: 110,
      themeColor: '#16060d',
      boardBg: '#16050C',
      coverFill: 'rgba(22, 5, 12, 0.93)',
      starFill: 'rgba(253, 164, 175, 0.28)',
      gridStroke: 'rgba(251, 113, 133, 0.16)',
      accent: '#F43F5E',
      swatchTop: '#5E1331',
      swatchBot: '#16050C',
      isLight: false
    },
    {
      id: 'solar',
      name: 'Solar Imperium',
      rarity: 'MYTHIC',
      price: 150,
      themeColor: '#140e04',
      boardBg: '#140E04',
      coverFill: 'rgba(20, 14, 4, 0.93)',
      starFill: 'rgba(253, 230, 138, 0.34)',
      gridStroke: 'rgba(251, 191, 36, 0.18)',
      accent: '#F59E0B',
      swatchTop: '#593B0E',
      swatchBot: '#140E04',
      isLight: false
    },
    {
      id: 'legend',
      name: 'Sovereign Legend',
      rarity: 'LEGEND',
      isLegend: true,
      price: 200,
      themeColor: '#080414',
      boardBg: '#0A0419',
      coverFill: 'rgba(10, 4, 25, 0.94)',
      starFill: 'rgba(253, 224, 71, 0.50)',
      gridStroke: 'rgba(253, 224, 71, 0.22)',
      accent: '#FDE047',
      swatchTop: '#4C1D95',
      swatchBot: '#090316',
      isLight: false
    }
  ];

  // --- 6 Arrow Skins matching WhatsApp Image 2026-10-25 at 13.29.35.jpeg ---
  const ARROW_SKINS = [
    {
      id: 'classic',
      name: 'Classic',
      price: 0,
      glow: '#F59E0B',
      tube: '#FDE68A',
      core: '#FFFFFF',
      lightGlow: '#B45309',
      lightTube: '#1E293B',
      lightCore: '#475569',
      tipStyle: 'chevron'
    },
    {
      id: 'golden',
      name: 'Golden Royalty',
      price: 80,
      glow: '#F59E0B',
      tube: '#FBBF24',
      core: '#FEF9C3',
      lightGlow: '#D97706',
      lightTube: '#B45309',
      lightCore: '#FDE68A',
      tipStyle: 'chevron'
    },
    {
      id: 'cyber',
      name: 'Neon Cyber',
      price: 120,
      glow: '#C026D3',
      tube: '#D946EF',
      core: '#FAE8FF',
      tipStyle: 'chevron'
    },
    {
      id: 'electric',
      name: 'Electric Lightning',
      price: 160,
      glow: '#06B6D4',
      tube: '#22D3EE',
      core: '#ECFEFF',
      lightGlow: '#0284C7',
      lightTube: '#0369A1',
      lightCore: '#BAE6FD',
      tipStyle: 'chevron'
    },
    {
      id: 'rainbow',
      name: 'Rainbow Cosmic',
      price: 220,
      glow: '#EC4899',
      tube: 'rainbow',
      core: '#FFFFFF',
      tipStyle: 'chevron'
    },
    {
      id: 'sovereign',
      name: 'Celestial Trident',
      price: 260,
      isMythic: true,
      glow: '#22D3EE',
      tube: '#FBBF24',
      core: '#FFFFFF',
      lightGlow: '#0284C7',
      lightTube: '#D97706',
      lightCore: '#FEF9C3',
      tipStyle: 'trident'
    }
  ];

  const RAINBOW_PALETTE = ['#FF477E', '#FF9F1C', '#FDE047', '#34D399', '#22D3EE', '#A855F7'];

  // --- 8 Trail Effects matching WhatsApp Image 2026-10-25 at 13.29.35.jpeg ---
  const TRAIL_EFFECTS = [
    { id: 'sparkles', name: 'Classic Sparkles', price: 0, colors: ['#FDE047', '#F59E0B', '#FFFBEB'] },
    { id: 'galaxy', name: 'Galaxy Star Trail', price: 90, colors: ['#FBBF24', '#A855F7', '#60A5FA'] },
    { id: 'fire', name: 'Blazing Fire & Flame', price: 130, colors: ['#FF4500', '#FF8C00', '#FDE047'] },
    { id: 'diamond', name: 'Diamond Sparkles', price: 160, colors: ['#22D3EE', '#67E8F9', '#E0F2FE'] },
    { id: 'snow', name: 'Frozen Snowflakes', price: 190, colors: ['#38BDF8', '#BAE6FD', '#FFFFFF'] },
    { id: 'sakura', name: 'Cherry Blossom', price: 220, colors: ['#FF5DA2', '#F9A8D4', '#FFE4E6'] },
    { id: 'thunder', name: 'Thunder Sparks', price: 260, colors: ['#38BDF8', '#818CF8', '#FFFFFF'] },
    { id: 'rainbow_trail', name: 'Rainbow Cosmic', price: 320, colors: RAINBOW_PALETTE }
  ];

  // 6 Neon Frame Border Themes matching 1223444.jpeg
  const NEON_FRAMES = [
    { border: '#A855F7', soft: 'rgba(168, 85, 247, 0.42)', pill: 'rgba(168, 85, 247, 0.28)' },
    { border: '#F59E0B', soft: 'rgba(245, 158, 11, 0.42)', pill: 'rgba(245, 158, 11, 0.28)' },
    { border: '#EC4899', soft: 'rgba(236, 72, 153, 0.42)', pill: 'rgba(236, 72, 153, 0.28)' },
    { border: '#06B6D4', soft: 'rgba(6, 182, 212, 0.42)', pill: 'rgba(6, 182, 212, 0.28)' },
    { border: '#10B981', soft: 'rgba(16, 185, 129, 0.42)', pill: 'rgba(16, 185, 129, 0.28)' },
    { border: '#EF4444', soft: 'rgba(239, 68, 68, 0.42)', pill: 'rgba(239, 68, 68, 0.28)' }
  ];

  // Exact 4 Gem & Cosmetic Bundle Store Packs
  const GEM_PACKS = [
    {
      id: 'starter',
      title: 'Starter Pack',
      bundleText: '25 Gems Instant Pack',
      gems: 25,
      priceInr: 19,
      priceLabel: '₹19',
      tag: 'STARTER',
      icon: '💎',
      bonusSkins: [],
      bonusTrails: []
    },
    {
      id: 'pouch',
      title: 'Cosmic Pouch + Celestial Trident',
      bundleText: 'Includes Mythic Celestial Trident Skin!',
      gems: 80,
      priceInr: 69,
      priceLabel: '₹69',
      tag: 'POPULAR',
      icon: '🔱',
      bonusSkins: ['sovereign'],
      bonusTrails: []
    },
    {
      id: 'satchel',
      title: 'Thunder Sparks + Rainbow Cosmic',
      bundleText: 'Thunder Sparks Trail + Rainbow Cosmic!',
      gems: 150,
      priceInr: 129,
      priceLabel: '₹129',
      tag: 'BEST VALUE',
      icon: '⚡',
      bonusSkins: ['rainbow'],
      bonusTrails: ['thunder', 'rainbow_trail']
    },
    {
      id: 'vault',
      title: 'Rainbow Cosmic + Frozen Snowflakes + Electric Lightning + Neon Cyber',
      bundleText: '4 Premium Skins & Trails Unlocked!',
      gems: 500,
      priceInr: 299,
      priceLabel: '₹299',
      tag: 'MEGA BUNDLE',
      icon: '👑',
      bonusSkins: ['rainbow', 'electric', 'cyber'],
      bonusTrails: ['snow', 'rainbow_trail']
    }
  ];

  const AVATARS = ['🦊', '🦚', '🐯', '🪷', '🦅', '🦋', '🐘', '🌙', '🚀', '🎨', '👑', '🏆'];

  const ACHIEVEMENTS = [
    { id: 'first_win', title: 'First Escape', desc: 'Complete Level 1', pts: 150, check: (s) => s.clearedLevels.length >= 1 },
    { id: 'flawless_3', title: 'Calm Precision', desc: 'Solve 3 levels with 0 mistakes', pts: 250, check: (s) => s.flawlessCount >= 3 },
    { id: 'combo_5', title: 'Flow State x5', desc: 'Reach a x5 arrow slide combo', pts: 200, check: (s) => s.bestCombo >= 5 },
    { id: 'theme_stylist', title: 'Theme Collector', desc: 'Unlock a Premium Theme with Gems', pts: 250, check: (s) => s.ownedThemes.length >= 2 },
    { id: 'skin_collector', title: 'Arrow Stylist', desc: 'Unlock an Arrow Skin with Gems', pts: 250, check: (s) => s.ownedArrowSkins.length >= 2 },
    { id: 'trail_collector', title: 'Starlight Trail', desc: 'Unlock a Trail Effect with Gems', pts: 250, check: (s) => s.ownedTrails.length >= 2 },
    { id: 'speedster', title: 'Swift Light', desc: 'Beat any level in under 40 seconds', pts: 300, check: (s) => s.fastestSec > 0 && s.fastestSec <= 40 },
    { id: 'collector_10', title: 'Cosmic Curator', desc: 'Unlock 10 artworks in the Album', pts: 500, check: (s) => s.clearedLevels.length >= 10 }
  ];

  /**
   * Direct Gem Level Unlock Cost Curve:
   * - Level 1: 0 Gems (unlocked from start)
   * - Levels 2..10: `lv * 3` Gems -> Level 10 = 30 Gems
   * - Levels 11..150: Smooth curve from 30 Gems (Lv 10) up to 1800 Gems (Level 150 = 1800 Gems)
   */
  function getLevelUnlockCost(levelNum) {
    const lv = Math.max(1, Math.min(150, Math.floor(Number(levelNum) || 1)));
    if (lv <= 1) return 0;
    if (lv <= 10) return lv * 3;
    return Math.round(30 + ((lv - 10) * 1770) / 140);
  }

  const SAVE_KEY = 'arrow_puzzle_arena_v8';
  const LEGACY_SAVE_V7 = 'snake_arrows_neon_v7';
  const LEGACY_SAVE_V6 = 'snake_arrows_neon_v6';
  const LEGACY_SAVE_V5 = 'snake_arrows_neon_v5';
  const LEGACY_SAVE_V4 = 'snake_arrows_neon_v4';
  const LEGACY_SAVE_V3 = 'snake_arrows_neon_v3';

  function loadSave() {
    const def = {
      playerId: 'plr-' + Math.random().toString(36).slice(2, 10),
      playerName: 'Player',
      playerNameSaved: false,
      accountEmail: '',
      authPhone: '',
      authProvider: '',
      authVerified: false,
      authToken: '',
      pictureUrl: '',
      avatar: '🦊',
      city: 'Jaipur, IN',
      currentLevel: 1,
      highestUnlocked: 1,
      unlockedLevels: [1],
      singleLevelUnlockV16: true,
      clearedLevels: [],
      ownedThemes: ['cosmic'],
      activeTheme: 'cosmic',
      ownedArrowSkins: ['classic'],
      arrowSkin: 'classic',
      ownedTrails: ['sparkles'],
      trailEffect: 'sparkles',
      score: 0,
      weeklyPoints: 0,
      gems: 0, // Start at 0 Gems; receive +5 Gems upon completing Level 1 (and +5 per level clear)!
      purchasedGemsTotal: 0,
      creditedOrderIds: [],
      notifiedRejectedIds: [],
      recentOrders: [],
      claimedRankRewards: [],
      dailyBestMs: {},
      hints: 3,
      flawlessCount: 0,
      bestCombo: 0,
      redTasksDone: 0,
      fastestSec: 0,
      claimedAch: [],
      fpsCap: 120,
      sound: true,
      haptics: false,
      hapticStrength: 'off',
      hapticsDefaultOffV9: true
    };
    try {
      let isMigrated = false;
      let migratedFromPreV7 = false;
      let raw = localStorage.getItem(SAVE_KEY);
      if (!raw) {
        const v7Raw = localStorage.getItem(LEGACY_SAVE_V7);
        const v6Raw = localStorage.getItem(LEGACY_SAVE_V6);
        if (v7Raw) {
          raw = v7Raw;
        } else if (v6Raw) {
          raw = v6Raw;
          migratedFromPreV7 = true;
        } else {
          raw = localStorage.getItem(LEGACY_SAVE_V5) || localStorage.getItem(LEGACY_SAVE_V4) || localStorage.getItem(LEGACY_SAVE_V3);
          if (raw) {
            isMigrated = true;
            migratedFromPreV7 = true;
          }
        }
      }
      if (raw) {
        const parsed = JSON.parse(raw);
        const merged = Object.assign(def, parsed);
        if (migratedFromPreV7 || ![30, 60, 120].includes(Number(merged.fpsCap))) {
          merged.fpsCap = 120;
        }
        // Enforce Tactile Haptics OFF by default on phone (players can manually toggle ON in Settings)
        if (!parsed.hapticsDefaultOffV9) {
          merged.hapticStrength = 'off';
          merged.haptics = false;
          merged.hapticsDefaultOffV9 = true;
        } else if (!['strong', 'medium', 'off'].includes(merged.hapticStrength)) {
          merged.hapticStrength = 'off';
        }
        merged.haptics = merged.hapticStrength !== 'off';
        if (!Array.isArray(merged.creditedOrderIds)) merged.creditedOrderIds = [];
        if (!Array.isArray(merged.notifiedRejectedIds)) merged.notifiedRejectedIds = [];
        if (!Array.isArray(merged.recentOrders)) merged.recentOrders = [];
        if (!Array.isArray(merged.claimedRankRewards)) merged.claimedRankRewards = [];
        if (!merged.dailyBestMs || typeof merged.dailyBestMs !== 'object') merged.dailyBestMs = {};
        if (typeof merged.weeklyPoints !== 'number') merged.weeklyPoints = Number(merged.score) || 0;
        if (typeof merged.accountEmail !== 'string') merged.accountEmail = '';
        if (merged.playerName && merged.playerName !== 'Player') {
          merged.playerNameSaved = true;
        } else {
          merged.playerNameSaved = Boolean(parsed.playerNameSaved);
        }
        if (Array.isArray(merged.ownedThemes)) {
          merged.ownedThemes = merged.ownedThemes.map((id) => (id === 'sakura_cyber' ? 'legend' : id));
        }
        if (merged.activeTheme === 'sakura_cyber') merged.activeTheme = 'legend';
        if (!Array.isArray(merged.ownedThemes) || !merged.ownedThemes.length) {
          merged.ownedThemes = ['cosmic'];
        }
        if (!PREMIUM_THEMES.some((t) => t.id === merged.activeTheme)) {
          merged.activeTheme = 'cosmic';
        }
        if (!Array.isArray(merged.ownedArrowSkins) || !merged.ownedArrowSkins.length) {
          merged.ownedArrowSkins = ['classic'];
        } else {
          merged.ownedArrowSkins = merged.ownedArrowSkins.map((id) => (id === 'heart' ? 'sovereign' : id));
        }
        if (merged.arrowSkin === 'heart' || !ARROW_SKINS.some((s) => s.id === merged.arrowSkin)) {
          merged.arrowSkin = merged.ownedArrowSkins.includes('sovereign') && merged.arrowSkin === 'heart'
            ? 'sovereign'
            : 'classic';
        }
        if (!Array.isArray(merged.ownedTrails) || !merged.ownedTrails.length) {
          merged.ownedTrails = ['sparkles'];
        }
        merged.highestUnlocked = Math.max(1, Math.min(150, Number(merged.highestUnlocked) || 1));

        // Ensure migrated saves without explicit Gem Store purchases start cleanly at 0 Gems (or 5 * clearedLevels)!
        if (isMigrated && typeof parsed.purchasedGemsTotal !== 'number') {
          const clearedCount = Array.isArray(merged.clearedLevels) ? merged.clearedLevels.length : 0;
          merged.gems = clearedCount * LEVEL_CLEAR_GEMS;
        }

        // Build individual unlockedLevels set (NEVER auto-fill 1..highestUnlocked!)
        let ulSet;
        if (!parsed.singleLevelUnlockV16) {
          // One-time repair for pre-v16 saves: keep Level 1, cleared progression, and the specific target level only!
          ulSet = new Set([1]);
          const curCand = Number(merged.currentLevel) || 1;
          if (curCand >= 1 && curCand <= 150) ulSet.add(curCand);
          if (merged.highestUnlocked >= 1 && merged.highestUnlocked <= 150) ulSet.add(merged.highestUnlocked);
          merged.singleLevelUnlockV16 = true;
        } else {
          ulSet = new Set([1, ...(Array.isArray(merged.unlockedLevels) ? merged.unlockedLevels.map(Number) : [1])]);
        }

        if (Array.isArray(merged.clearedLevels)) {
          for (const clv of merged.clearedLevels) {
            const n = Number(clv);
            if (n >= 1 && n <= 150) {
              ulSet.add(n);
              if (n + 1 <= 150) ulSet.add(n + 1);
            }
          }
        }
        merged.unlockedLevels = Array.from(ulSet).filter((n) => n >= 1 && n <= 150).sort((a, b) => a - b);
        merged.highestUnlocked = Math.max(1, ...merged.unlockedLevels);
        if (!ulSet.has(Number(merged.currentLevel))) {
          merged.currentLevel = merged.unlockedLevels[merged.unlockedLevels.length - 1] || 1;
        }
        return merged;
      }
    } catch (_) {}
    return def;
  }

  const state = loadSave();

  let accountSyncTimer = null;

  function isServerOnline() {
    return window.location.protocol.startsWith('http') && navigator.onLine !== false;
  }

  function getActiveAccountKey() {
    return state.playerId;
  }

  function getDisplayAccountLabel() {
    return `${state.avatar} ${state.playerName}`;
  }

  function persistSave() {
    state.singleLevelUnlockV16 = true;
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (_) {}
    scheduleCloudAccountSync();
  }

  function isLevelUnlocked(lv) {
    const n = Number(lv);
    return n === 1 ||
      (Array.isArray(state.unlockedLevels) && state.unlockedLevels.includes(n)) ||
      (Array.isArray(state.clearedLevels) && state.clearedLevels.includes(n));
  }

  function unlockLevelInState(lv) {
    const clamped = Math.max(1, Math.min(150, Math.floor(lv)));
    if (!Array.isArray(state.unlockedLevels)) state.unlockedLevels = [1];
    if (!state.unlockedLevels.includes(clamped)) {
      state.unlockedLevels.push(clamped);
      state.unlockedLevels.sort((a, b) => a - b);
    }
    state.highestUnlocked = Math.max(1, ...state.unlockedLevels);
  }

  function getFallbackPlayableLevel() {
    if (isLevelUnlocked(state.currentLevel)) return Number(state.currentLevel) || 1;
    if (Array.isArray(state.unlockedLevels) && state.unlockedLevels.length) {
      return state.unlockedLevels[state.unlockedLevels.length - 1];
    }
    return 1;
  }

  let activeScreen = 'home';
  let pendingUnlockLevel = null;

  let game = {
    level: 1,
    meta: null,
    campaign: null,
    coveredMask: null,
    gridW: 18,
    gridH: 18,
    arrows: [],
    totalArrowsStart: 1,
    undoStack: [],
    dropletsMax: 3,
    dropletsLeft: 3,
    mistakes: 0,
    hintsUsed: 0,
    undosUsed: 0,
    redBroken: false,
    hintArrowId: null,
    blockerFlashId: null,
    blockerFlashTimer: 0,
    combo: 0,
    maxComboThisLevel: 0,
    lastSlideAt: 0,
    startTimeMs: 0,
    elapsedSec: 0,
    completed: false,
    bgRevealAlpha: 0,
    winModalShown: false,
    gridMode: 0,
    zoom: 1,
    panX: 0,
    panY: 0
  };

  // Trail Particle Pool (capped at 88 particles for buttery 120 FPS ProMotion mobile trails!)
  const MAX_PARTICLES = 88;
  let trailParticles = [];

  // Canvases (desynchronized hint reduces mobile touch-to-glass display latency at 120Hz)
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true }) || canvas.getContext('2d', { alpha: false });
  const staticCanvas = document.createElement('canvas');
  const staticCtx = staticCanvas.getContext('2d', { alpha: false });
  const artCacheCanvas = document.createElement('canvas');
  const artCacheCtx = artCacheCanvas.getContext('2d');
  const fullArtCanvas = document.createElement('canvas');
  const fullArtCtx = fullArtCanvas.getContext('2d');

  let staticDirty = true;
  let artCacheDirty = true;
  let canvasCssSize = 310;
  let dpr = 1;

  // 120 FPS High-Refresh Frame Pacer
  let rafId = null;
  let lastFrameTime = 0;
  let lastDrawTime = 0;
  let fpsCounterFrames = 0;
  let fpsCounterWindowStart = performance.now();
  let measuredFps = 120;
  let toastTimeout = null;

  function currentTheme() {
    return PREMIUM_THEMES.find((t) => t.id === state.activeTheme) || PREMIUM_THEMES[0];
  }

  function applyThemeToDOM() {
    const th = currentTheme();
    document.body.dataset.theme = th.id;
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', th.themeColor);
    staticDirty = true;
    if (activeScreen === 'play') requestFrame();
  }

  function currentArrowSkin() {
    return ARROW_SKINS.find((s) => s.id === state.arrowSkin) || ARROW_SKINS[0];
  }

  function currentTrail() {
    return TRAIL_EFFECTS.find((t) => t.id === state.trailEffect) || TRAIL_EFFECTS[0];
  }

  function getArrowColors(arrow, skin) {
    const th = currentTheme();
    if (arrow.isRed) {
      return { glow: '#FB7185', tube: '#FF3B5C', core: '#FFE4E6' };
    }
    if (skin.tube === 'rainbow') {
      const c = RAINBOW_PALETTE[arrow.id % RAINBOW_PALETTE.length];
      return { glow: c, tube: c, core: th.isLight ? '#FFFBEB' : '#FFFFFF' };
    }
    if (th.isLight && skin.lightTube) {
      return { glow: skin.lightGlow, tube: skin.lightTube, core: skin.lightCore };
    }
    return { glow: skin.glow, tube: skin.tube, core: skin.core };
  }

  function showToast(msg) {
    const el = document.getElementById('toastBanner');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => el.classList.remove('show'), 2200);
  }

  function syncAllGemDisplays() {
    const g = state.gems;
    document.getElementById('homeGemCount').textContent = String(g);
    document.getElementById('gemsDisplay').textContent = `💎 ${g} +`;
    document.getElementById('btnModalSkinsGems').textContent = `💎 ${g} +`;
    const trailsGemBtn = document.getElementById('btnModalTrailsGems');
    if (trailsGemBtn) trailsGemBtn.textContent = `💎 ${g} +`;
    const themeGemBtn = document.getElementById('btnModalThemesGems');
    if (themeGemBtn) themeGemBtn.textContent = `💎 ${g} +`;
    const storeAcctLbl = document.getElementById('storeAccountLabel');
    if (storeAcctLbl) storeAcctLbl.textContent = getDisplayAccountLabel();
  }

  function applySettings() {
    applyThemeToDOM();
    const cap = [30, 60, 120].includes(Number(state.fpsCap)) ? Number(state.fpsCap) : 120;
    state.fpsCap = cap;

    const strength = ['strong', 'medium', 'off'].includes(state.hapticStrength)
      ? state.hapticStrength
      : 'off';
    state.hapticStrength = strength;
    state.haptics = strength !== 'off';

    AudioFX.soundEnabled = state.sound;
    AudioFX.hapticStrength = strength;
    AudioFX.hapticsEnabled = state.haptics;

    const btnFps = document.getElementById('btnToggleFps');
    if (cap === 120) {
      btnFps.textContent = '120 FPS Ultra';
      btnFps.classList.add('on');
    } else if (cap === 60) {
      btnFps.textContent = '60 FPS Smooth';
      btnFps.classList.add('on');
    } else {
      btnFps.textContent = '30 FPS Saver';
      btnFps.classList.remove('on');
    }

    const btnSound = document.getElementById('btnToggleSound');
    btnSound.textContent = state.sound ? 'ON' : 'OFF';
    btnSound.classList.toggle('on', state.sound);

    const btnHap = document.getElementById('btnToggleHaptics');
    btnHap.textContent = strength === 'strong' ? 'Strong' : (strength === 'medium' ? 'Medium' : 'OFF');
    btnHap.classList.toggle('on', strength !== 'off');

    document.getElementById('fpsBadge').textContent = `${cap} FPS`;
    syncAllGemDisplays();
    staticDirty = true;
    if (activeScreen === 'play') requestFrame();
  }

  function syncBottomNavVisibility(activeNavKey) {
    const paymentOpen =
      document.getElementById('modalGems').classList.contains('open') ||
      document.getElementById('modalCheckout').classList.contains('open') ||
      document.getElementById('modalAdminLogin').classList.contains('open') ||
      document.getElementById('modalAdminPanel').classList.contains('open');
    document.getElementById('phoneFrame').classList.toggle('payment-open', paymentOpen);

    if (activeNavKey) {
      document.querySelectorAll('#globalBottomNav .gnav-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.nav === activeNavKey);
      });
    }
  }

  function showScreen(screenName) {
    activeScreen = screenName;
    document.getElementById('homeScreen').classList.toggle('active', screenName === 'home');
    document.getElementById('playScreen').classList.toggle('active', screenName === 'play');

    if (screenName === 'home') {
      syncBottomNavVisibility('home');
      renderHomeScreen();
    } else if (screenName === 'play') {
      syncBottomNavVisibility('home');
      resizeBoard();
      updateHeaderAndHud();
      staticDirty = true;
      requestFrame();
    }
  }

  // --- Custom Shop Card Artwork Renderers (Luxury Themes + Legendary #6 + Skins + Trails) ---
  function drawThemeCardPreview(pctx, w, h, theme) {
    pctx.clearRect(0, 0, w, h);

    // Rich luxury backdrop gradient
    const bg = pctx.createLinearGradient(0, 0, w * 0.3, h);
    bg.addColorStop(0, theme.swatchTop);
    bg.addColorStop(1, theme.swatchBot);
    pctx.fillStyle = bg;
    pctx.fillRect(0, 0, w, h);

    // Inner glowing luxury puzzle board
    const pad = 7;
    const bw = w - pad * 2;
    const bh = h - pad * 2;
    pctx.fillStyle = theme.boardBg;
    pctx.fillRect(pad, pad, bw, bh);

    if (theme.isLegend) {
      // Imperial Royal Gold + Astral Amethyst Aura & Sacred Halo Ring
      const aura = pctx.createRadialGradient(w / 2, h / 2, 3, w / 2, h / 2, bw * 0.62);
      aura.addColorStop(0, 'rgba(253, 224, 71, 0.34)');
      aura.addColorStop(0.55, 'rgba(168, 85, 247, 0.25)');
      aura.addColorStop(1, 'rgba(10, 4, 25, 0)');
      pctx.fillStyle = aura;
      pctx.fillRect(pad, pad, bw, bh);

      pctx.strokeStyle = 'rgba(253, 224, 71, 0.42)';
      pctx.lineWidth = 1.1;
      pctx.beginPath();
      pctx.arc(w / 2, h / 2, Math.min(bw, bh) * 0.35, 0, Math.PI * 2);
      pctx.stroke();

      // Double 24K Gold Royal Frame + Corner Filigree
      pctx.strokeStyle = '#FDE047';
      pctx.lineWidth = 2.4;
      pctx.strokeRect(pad, pad, bw, bh);
      pctx.strokeStyle = 'rgba(245, 158, 11, 0.65)';
      pctx.lineWidth = 1.0;
      pctx.strokeRect(pad + 3, pad + 3, bw - 6, bh - 6);

      // 4 Golden Corner Jewels
      pctx.fillStyle = '#FDE047';
      [[pad + 3, pad + 3], [pad + bw - 3, pad + 3], [pad + 3, pad + bh - 3], [pad + bw - 3, pad + bh - 3]].forEach(([cx, cy]) => {
        pctx.beginPath();
        pctx.arc(cx, cy, 2.2, 0, Math.PI * 2);
        pctx.fill();
      });
    } else {
      // Luxury double-bevel neon border for all premium themes
      pctx.strokeStyle = theme.accent;
      pctx.lineWidth = 2.1;
      pctx.strokeRect(pad, pad, bw, bh);
      pctx.strokeStyle = theme.isLight ? 'rgba(180, 130, 60, 0.25)' : 'rgba(255, 255, 255, 0.14)';
      pctx.lineWidth = 0.8;
      pctx.strokeRect(pad + 2.5, pad + 2.5, bw - 5, bh - 5);
    }

    // Crisp subtle grid lines inside theme preview
    pctx.strokeStyle = theme.gridStroke;
    pctx.lineWidth = 0.7;
    for (let k = 1; k <= 3; k++) {
      const gx = pad + (bw * k) / 4;
      const gy = pad + (bh * k) / 4;
      pctx.beginPath();
      pctx.moveTo(gx, pad);
      pctx.lineTo(gx, pad + bh);
      pctx.moveTo(pad, gy);
      pctx.lineTo(pad + bw, gy);
      pctx.stroke();
    }

    // Draw 3 interlocking bent snake arrows inside the theme preview
    const skin = currentArrowSkin();
    const mainCol = theme.isLegend
      ? '#FDE047'
      : (theme.isLight ? (skin.lightTube || '#1E293B') : (skin.tube === 'rainbow' ? '#22D3EE' : skin.tube));
    const secondCol = theme.isLegend ? '#E879F9' : (theme.isLight ? '#D97706' : theme.accent);
    const thirdCol = theme.isLegend ? '#22D3EE' : (theme.isLight ? '#0284C7' : '#34D399');

    function drawMiniBentArrow(pts, col) {
      pctx.save();
      pctx.lineCap = 'round';
      pctx.lineJoin = 'round';
      if (!theme.isLight) {
        pctx.globalAlpha = theme.isLegend ? 0.45 : 0.32;
        pctx.strokeStyle = col;
        pctx.lineWidth = 6.4;
        pctx.beginPath();
        pts.forEach(([px, py], idx) => (idx === 0 ? pctx.moveTo(w * px, h * py) : pctx.lineTo(w * px, h * py)));
        pctx.stroke();
      }
      pctx.globalAlpha = 1;
      pctx.strokeStyle = col;
      pctx.lineWidth = 3.2;
      pctx.beginPath();
      pts.forEach(([px, py], idx) => (idx === 0 ? pctx.moveTo(w * px, h * py) : pctx.lineTo(w * px, h * py)));
      pctx.stroke();

      const [xA, yA] = pts[pts.length - 2];
      const [xB, yB] = pts[pts.length - 1];
      const ang = Math.atan2((yB - yA) * h, (xB - xA) * w);
      pctx.translate(w * xB, h * yB);
      pctx.rotate(ang);
      pctx.beginPath();
      pctx.moveTo(-5.5, -4.4);
      pctx.lineTo(1.2, 0);
      pctx.lineTo(-5.5, 4.4);
      pctx.stroke();
      pctx.restore();
    }

    drawMiniBentArrow([[0.22, 0.74], [0.46, 0.74], [0.46, 0.44], [0.76, 0.44]], mainCol);
    drawMiniBentArrow([[0.74, 0.25], [0.34, 0.25], [0.34, 0.54]], secondCol);
    drawMiniBentArrow([[0.58, 0.80], [0.76, 0.80], [0.76, 0.62]], thirdCol);
  }

  function drawFourPointStar(pctx, cx, cy, outerR, innerR, color) {
    pctx.save();
    pctx.fillStyle = color;
    pctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const a = (i * Math.PI) / 4;
      const vx = cx + Math.cos(a) * r;
      const vy = cy + Math.sin(a) * r;
      if (i === 0) pctx.moveTo(vx, vy);
      else pctx.lineTo(vx, vy);
    }
    pctx.closePath();
    pctx.fill();
    pctx.restore();
  }

  function drawArrowSkinCardPreview(pctx, w, h, skin) {
    pctx.clearRect(0, 0, w, h);

    if (skin.tipStyle === 'trident') {
      // Mythic dual-nebula cosmic aura (Royal Gold + Astral Cyan + Deep Violet)
      const g1 = pctx.createRadialGradient(w * 0.58, h * 0.34, 3, w * 0.54, h * 0.42, w * 0.58);
      g1.addColorStop(0, 'rgba(34, 211, 238, 0.52)');
      g1.addColorStop(0.48, 'rgba(245, 158, 11, 0.28)');
      g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pctx.fillStyle = g1;
      pctx.fillRect(0, 0, w, h);

      const x0 = w * 0.24, y0 = h * 0.86;
      const x1 = w * 0.65, y1 = h * 0.31;

      // Sacred celestial halo ring behind the Trident head
      pctx.save();
      pctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
      pctx.lineWidth = 1.3;
      pctx.beginPath();
      pctx.arc(x1 + 2, y1 - 2, 20, 0, Math.PI * 2);
      pctx.stroke();

      pctx.strokeStyle = 'rgba(56, 189, 248, 0.32)';
      pctx.lineWidth = 0.9;
      pctx.beginPath();
      pctx.arc(x1 + 2, y1 - 2, 24, 0, Math.PI * 2);
      pctx.stroke();
      pctx.restore();

      pctx.save();
      pctx.lineCap = 'round';
      pctx.lineJoin = 'round';

      // Outer plasma cyan-gold aura along shaft
      pctx.strokeStyle = '#22D3EE';
      pctx.globalAlpha = 0.42;
      pctx.lineWidth = 12;
      pctx.beginPath();
      pctx.moveTo(x0, y0);
      pctx.lineTo(x1, y1);
      pctx.stroke();

      // Royal Gold-to-Cyan metallic shaft
      const shaftGrad = pctx.createLinearGradient(x0, y0, x1, y1);
      shaftGrad.addColorStop(0, '#F59E0B');
      shaftGrad.addColorStop(0.55, '#FDE047');
      shaftGrad.addColorStop(1, '#38BDF8');
      pctx.globalAlpha = 1;
      pctx.strokeStyle = shaftGrad;
      pctx.lineWidth = 5.4;
      pctx.beginPath();
      pctx.moveTo(x0, y0);
      pctx.lineTo(x1, y1);
      pctx.stroke();

      // White-hot inner core filament
      pctx.strokeStyle = '#FFFFFF';
      pctx.lineWidth = 1.8;
      pctx.beginPath();
      pctx.moveTo(x0, y0);
      pctx.lineTo(x1, y1);
      pctx.stroke();

      // Glowing energy rune rings along the shaft
      [0.28, 0.56, 0.80].forEach((t) => {
        const rx = x0 + (x1 - x0) * t;
        const ry = y0 + (y1 - y0) * t;
        pctx.fillStyle = '#67E8F9';
        pctx.beginPath();
        pctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
        pctx.fill();
        pctx.fillStyle = '#FFFFFF';
        pctx.beginPath();
        pctx.arc(rx, ry, 1.2, 0, Math.PI * 2);
        pctx.fill();
      });

      // Swept Valkyrie golden tail wings at base
      const ang = Math.atan2(y1 - y0, x1 - x0);
      pctx.save();
      pctx.translate(x0, y0);
      pctx.rotate(ang + Math.PI / 2);
      pctx.fillStyle = '#FBBF24';
      pctx.beginPath();
      pctx.moveTo(0, -3);
      pctx.lineTo(-9, 6);
      pctx.lineTo(-3, 2);
      pctx.lineTo(0, 7);
      pctx.lineTo(3, 2);
      pctx.lineTo(9, 6);
      pctx.closePath();
      pctx.fill();
      pctx.restore();

      // 3-Pronged Royal Celestial Trident Spearhead
      pctx.translate(x1, y1);
      pctx.rotate(ang + Math.PI / 2);

      // Left & Right Curved Crescent Trident Side-Prongs
      [-1, 1].forEach((side) => {
        pctx.fillStyle = '#FBBF24';
        pctx.strokeStyle = '#FEF08A';
        pctx.lineWidth = 1.0;
        pctx.beginPath();
        pctx.moveTo(side * 2, 4);
        pctx.quadraticCurveTo(side * 15, 2, side * 14, -14);
        pctx.lineTo(side * 9.5, -8.5);
        pctx.quadraticCurveTo(side * 10, -0.5, side * 2, 0.5);
        pctx.closePath();
        pctx.fill();
        pctx.stroke();
      });

      // Central Imperial 2-Tone Faceted Diamond Spear Blade
      pctx.fillStyle = '#FFFFFF';
      pctx.beginPath();
      pctx.moveTo(0, -22);
      pctx.lineTo(-6.5, -2);
      pctx.lineTo(0, 4);
      pctx.closePath();
      pctx.fill();

      pctx.fillStyle = '#38BDF8';
      pctx.beginPath();
      pctx.moveTo(0, -22);
      pctx.lineTo(6.5, -2);
      pctx.lineTo(0, 4);
      pctx.closePath();
      pctx.fill();

      // Golden Crown Collar + Glowing Cyan Power Gem
      pctx.fillStyle = '#F59E0B';
      pctx.beginPath();
      pctx.moveTo(-7.5, 2);
      pctx.lineTo(0, -2);
      pctx.lineTo(7.5, 2);
      pctx.lineTo(0, 6.5);
      pctx.closePath();
      pctx.fill();

      pctx.fillStyle = '#22D3EE';
      pctx.strokeStyle = '#FFFFFF';
      pctx.lineWidth = 1.1;
      pctx.beginPath();
      pctx.moveTo(0, -1.5);
      pctx.lineTo(3.4, 2.2);
      pctx.lineTo(0, 5.8);
      pctx.lineTo(-3.4, 2.2);
      pctx.closePath();
      pctx.fill();
      pctx.stroke();

      pctx.restore();

      // Twinkling Mythic Starlight Glints
      drawFourPointStar(pctx, w * 0.30, h * 0.26, 5.5, 1.6, '#FDE047');
      drawFourPointStar(pctx, w * 0.83, h * 0.44, 5.0, 1.5, '#67E8F9');
      drawFourPointStar(pctx, w * 0.76, h * 0.14, 4.2, 1.3, '#FFFFFF');
      return;
    }

    const g = pctx.createRadialGradient(w * 0.52, h * 0.44, 4, w * 0.52, h * 0.44, w * 0.52);
    g.addColorStop(0, skin.glow + '55');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    pctx.fillStyle = g;
    pctx.fillRect(0, 0, w, h);

    const x0 = w * 0.26, y0 = h * 0.85;
    const x1 = w * 0.66, y1 = h * 0.27;

    pctx.save();
    pctx.lineCap = 'round';

    let shaftStroke = skin.tube;
    if (skin.id === 'rainbow') {
      const lg = pctx.createLinearGradient(x0, y0, x1, y1);
      RAINBOW_PALETTE.forEach((c, idx) => lg.addColorStop(idx / (RAINBOW_PALETTE.length - 1), c));
      shaftStroke = lg;
    }

    pctx.strokeStyle = skin.glow;
    pctx.globalAlpha = 0.45;
    pctx.lineWidth = 10;
    pctx.beginPath();
    pctx.moveTo(x0, y0);
    pctx.lineTo(x1, y1);
    pctx.stroke();

    pctx.globalAlpha = 1;
    pctx.strokeStyle = shaftStroke;
    pctx.lineWidth = 5;
    pctx.beginPath();
    pctx.moveTo(x0, y0);
    pctx.lineTo(x1, y1);
    pctx.stroke();

    pctx.lineWidth = 2.5;
    pctx.beginPath();
    pctx.moveTo(x0 - 4, y0 - 2);
    pctx.lineTo(x0 + 3, y0 - 4);
    pctx.lineTo(x0 + 5, y0 + 3);
    pctx.stroke();

    const ang = Math.atan2(y1 - y0, x1 - x0);
    pctx.translate(x1, y1);
    pctx.rotate(ang + Math.PI / 2);

    pctx.fillStyle = skin.core;
    pctx.beginPath();
    pctx.moveTo(0, -16);
    pctx.lineTo(-11, 8);
    pctx.lineTo(0, 3);
    pctx.closePath();
    pctx.fill();

    pctx.fillStyle = skin.id === 'rainbow' ? '#22D3EE' : skin.tube;
    pctx.beginPath();
    pctx.moveTo(0, -16);
    pctx.lineTo(11, 8);
    pctx.lineTo(0, 3);
    pctx.closePath();
    pctx.fill();

    pctx.restore();
  }

  function drawTrailCardPreview(pctx, w, h, trail) {
    pctx.clearRect(0, 0, w, h);
    const id = trail.id;

    const grad = pctx.createRadialGradient(w * 0.42, h * 0.62, 4, w * 0.5, h * 0.5, w * 0.55);
    grad.addColorStop(0, trail.colors[0] + '55');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    pctx.fillStyle = grad;
    pctx.fillRect(0, 0, w, h);

    if (id === 'rainbow_trail') {
      for (let i = 0; i < RAINBOW_PALETTE.length; i++) {
        pctx.strokeStyle = RAINBOW_PALETTE[i];
        pctx.lineWidth = 3.2;
        pctx.lineCap = 'round';
        pctx.beginPath();
        const off = (i - 2.5) * 3.1;
        pctx.moveTo(w * 0.16, h * 0.86 + off);
        pctx.quadraticCurveTo(w * 0.45, h * 0.45 + off, w * 0.85, h * 0.22 + off);
        pctx.stroke();
      }
    } else if (id === 'thunder') {
      pctx.strokeStyle = '#38BDF8';
      pctx.lineWidth = 5;
      pctx.globalAlpha = 0.45;
      const pts = [[0.22, 0.84], [0.42, 0.58], [0.34, 0.52], [0.62, 0.34], [0.55, 0.28], [0.78, 0.12]];
      pctx.beginPath();
      pts.forEach(([px, py], idx) => idx === 0 ? pctx.moveTo(w * px, h * py) : pctx.lineTo(w * px, h * py));
      pctx.stroke();

      pctx.globalAlpha = 1;
      pctx.strokeStyle = '#FFFFFF';
      pctx.lineWidth = 2.2;
      pctx.stroke();
    } else if (id === 'fire') {
      const flames = [[0.34, 0.72, 16, '#FF4500'], [0.48, 0.56, 14, '#FF8C00'], [0.62, 0.38, 11, '#FDE047'], [0.30, 0.76, 9, '#FEF08A']];
      flames.forEach(([fx, fy, r, col]) => {
        pctx.fillStyle = col;
        pctx.beginPath();
        pctx.arc(w * fx, h * fy, r, 0, Math.PI * 2);
        pctx.fill();
      });
    } else if (id === 'galaxy') {
      const stars = [[0.28, 0.76, 6, '#60A5FA'], [0.48, 0.58, 9, '#FBBF24'], [0.60, 0.38, 9, '#FDE047'], [0.68, 0.20, 7, '#A855F7']];
      stars.forEach(([sx, sy, r, col]) => {
        pctx.fillStyle = col;
        pctx.beginPath();
        for (let k = 0; k < 10; k++) {
          const rad = k % 2 === 0 ? r : r * 0.44;
          const a = (k * Math.PI) / 5 - Math.PI / 2;
          const vx = w * sx + Math.cos(a) * rad;
          const vy = h * sy + Math.sin(a) * rad;
          if (k === 0) pctx.moveTo(vx, vy); else pctx.lineTo(vx, vy);
        }
        pctx.closePath();
        pctx.fill();
      });
    } else if (id === 'diamond') {
      const gems = [[0.26, 0.78, 8], [0.46, 0.62, 7], [0.58, 0.44, 8], [0.72, 0.26, 6]];
      gems.forEach(([gx, gy, r]) => {
        pctx.fillStyle = '#67E8F9';
        pctx.strokeStyle = '#FFFFFF';
        pctx.lineWidth = 1.2;
        pctx.beginPath();
        pctx.moveTo(w * gx, h * gy - r);
        pctx.lineTo(w * gx + r * 0.85, h * gy);
        pctx.lineTo(w * gx, h * gy + r);
        pctx.lineTo(w * gx - r * 0.85, h * gy);
        pctx.closePath();
        pctx.fill();
        pctx.stroke();
      });
    } else if (id === 'snow') {
      const flakes = [[0.26, 0.78, 8], [0.48, 0.55, 9], [0.68, 0.30, 7]];
      pctx.strokeStyle = '#E0F2FE';
      pctx.lineWidth = 1.8;
      flakes.forEach(([fx, fy, r]) => {
        for (let k = 0; k < 3; k++) {
          const a = (k * Math.PI) / 3;
          pctx.beginPath();
          pctx.moveTo(w * fx - Math.cos(a) * r, h * fy - Math.sin(a) * r);
          pctx.lineTo(w * fx + Math.cos(a) * r, h * fy + Math.sin(a) * r);
          pctx.stroke();
        }
      });
    } else if (id === 'sakura') {
      const petals = [[0.28, 0.76, 7, 0.4], [0.50, 0.56, 8, -0.5], [0.66, 0.34, 6, 0.8], [0.42, 0.40, 5, 0.1]];
      petals.forEach(([px, py, r, rot]) => {
        pctx.save();
        pctx.translate(w * px, h * py);
        pctx.rotate(rot);
        pctx.fillStyle = '#F9A8D4';
        pctx.beginPath();
        pctx.ellipse(0, 0, r, r * 0.58, 0, 0, Math.PI * 2);
        pctx.fill();
        pctx.restore();
      });
    } else {
      const dots = [[0.24, 0.80, 5], [0.36, 0.68, 3.5], [0.48, 0.56, 4.5], [0.60, 0.42, 3.5], [0.72, 0.26, 3], [0.54, 0.68, 2.5]];
      dots.forEach(([dx, dy, r], i) => {
        pctx.fillStyle = i % 2 === 0 ? '#FDE047' : '#FFFBEB';
        pctx.beginPath();
        pctx.arc(w * dx, h * dy, r, 0, Math.PI * 2);
        pctx.fill();
      });
    }
  }

  function renderThemesShopInto(containerId) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = '';

    PREMIUM_THEMES.forEach((th) => {
      const isOwned = state.ownedThemes.includes(th.id);
      const isEquipped = state.activeTheme === th.id;

      const wrap = document.createElement('div');
      wrap.className = 'theme-card-item shop-item-card' +
        (isEquipped ? ' equipped' : '') +
        (th.isLegend ? ' legend-card' : '');

      const box = document.createElement('div');
      box.className = 'theme-card-box item-preview-box';
      box.style.position = 'relative';
      if (th.isLegend) {
        const crown = document.createElement('div');
        crown.className = 'legend-crown-tag';
        crown.textContent = '👑 LEGEND';
        box.appendChild(crown);
      } else if (th.rarity) {
        const rTag = document.createElement('div');
        rTag.style.cssText = 'position:absolute;top:4px;left:5px;font-size:0.50rem;font-weight:800;padding:1px 5px;border-radius:6px;background:rgba(0,0,0,0.55);color:#e2e8f0;';
        rTag.textContent = th.rarity;
        box.appendChild(rTag);
      }
      const cv = document.createElement('canvas');
      cv.width = 192;
      cv.height = 176;
      cv.style.width = '100%';
      cv.style.height = '100%';
      const tctx = cv.getContext('2d');
      tctx.scale(2, 2);
      drawThemeCardPreview(tctx, 96, 88, th);
      box.appendChild(cv);

      const lbl = document.createElement('div');
      lbl.className = 'item-name-lbl';
      lbl.textContent = th.name;

      const tag = document.createElement('div');
      tag.className = 'item-price-tag' + (isEquipped ? ' active-eq' : (!isOwned ? ' locked' : ''));
      tag.textContent = isEquipped ? '✓ Active' : (isOwned ? 'Apply' : `💎 ${th.price}`);

      wrap.appendChild(box);
      wrap.appendChild(lbl);
      wrap.appendChild(tag);

      wrap.addEventListener('click', () => {
        AudioFX.unlock();
        if (isOwned) {
          state.activeTheme = th.id;
          persistSave();
          applyThemeToDOM();
          renderAllShopGrids();
          renderHomeHeroPreview();
          if (activeScreen === 'play') requestFrame();
          showToast(`Theme applied: ${th.name}!`);
        } else {
          if (state.gems < th.price) {
            showToast(`Need ${th.price - state.gems} more 💎 — Opening Gem Store!`);
            renderGemStore();
            openModal('modalGems');
            return;
          }
          state.gems -= th.price;
          state.ownedThemes.push(th.id);
          state.activeTheme = th.id;
          checkNewAchievements();
          persistSave();
          applyThemeToDOM();
          AudioFX.playWinReveal();
          syncAllGemDisplays();
          renderAllShopGrids();
          renderHomeHeroPreview();
          if (activeScreen === 'play') requestFrame();
          showToast(`Unlocked & Applied ${th.name}!`);
        }
      });

      grid.appendChild(wrap);
    });
  }

  function renderArrowSkinsShopInto(containerId) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = '';

    ARROW_SKINS.forEach((sk) => {
      const isOwned = state.ownedArrowSkins.includes(sk.id);
      const isEquipped = state.arrowSkin === sk.id;

      const wrap = document.createElement('div');
      wrap.className = 'arrow-skin-item' +
        (isEquipped ? ' equipped' : '') +
        (sk.isMythic ? ' mythic' : '');

      const box = document.createElement('div');
      box.className = 'arrow-skin-box';
      if (sk.rankOnly) {
        const badge = document.createElement('div');
        badge.className = 'mythic-ribbon';
        badge.textContent = sk.rankBadge || '🏆 ARENA';
        box.appendChild(badge);
      } else if (sk.isMythic) {
        const badge = document.createElement('div');
        badge.className = 'mythic-ribbon';
        badge.textContent = '★ MYTHIC';
        box.appendChild(badge);
      }
      const cv = document.createElement('canvas');
      cv.width = 184;
      cv.height = 192;
      cv.style.width = '82px';
      cv.style.height = '86px';
      const pctx = cv.getContext('2d');
      pctx.scale(2, 2);
      drawArrowSkinCardPreview(pctx, 92, 96, sk);
      box.appendChild(cv);

      const lbl = document.createElement('div');
      lbl.className = 'item-name-lbl';
      lbl.textContent = sk.name;

      const tag = document.createElement('div');
      tag.className = 'item-price-tag' + (isEquipped ? ' active-eq' : (!isOwned ? ' locked' : ''));
      tag.textContent = isEquipped
        ? '✓ Equipped'
        : (isOwned ? 'Equip' : (sk.rankOnly ? (sk.rankBadge || '🏆 Top Rank') : `💎 ${sk.price}`));

      wrap.appendChild(box);
      wrap.appendChild(lbl);
      wrap.appendChild(tag);

      wrap.addEventListener('click', () => {
        AudioFX.unlock();
        AudioFX.playTap();
        if (isOwned) {
          state.arrowSkin = sk.id;
          persistSave();
          staticDirty = true;
          renderAllShopGrids();
          renderHomeHeroPreview();
          if (activeScreen === 'play') requestFrame();
          showToast(`Equipped ${sk.name}!`);
        } else {
          if (state.gems < sk.price) {
            showToast(`Need ${sk.price - state.gems} more 💎 — Opening Gem Store!`);
            renderGemStore();
            openModal('modalGems');
            return;
          }
          state.gems -= sk.price;
          state.ownedArrowSkins.push(sk.id);
          state.arrowSkin = sk.id;
          checkNewAchievements();
          persistSave();
          AudioFX.playWinReveal();
          syncAllGemDisplays();
          staticDirty = true;
          renderAllShopGrids();
          renderHomeHeroPreview();
          if (activeScreen === 'play') requestFrame();
          showToast(`Unlocked & Equipped ${sk.name}!`);
        }
      });

      grid.appendChild(wrap);
    });
  }

  function renderTrailsShopInto(containerId) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = '';

    TRAIL_EFFECTS.forEach((tr) => {
      const isOwned = state.ownedTrails.includes(tr.id);
      const isEquipped = state.trailEffect === tr.id;

      const wrap = document.createElement('div');
      wrap.className = 'trail-card-item' + (isEquipped ? ' equipped' : '');

      const box = document.createElement('div');
      box.className = 'trail-card-box';
      const cv = document.createElement('canvas');
      cv.width = 84;
      cv.height = 84;
      cv.style.width = '72px';
      cv.style.height = '72px';
      drawTrailCardPreview(cv.getContext('2d'), 84, 84, tr);
      box.appendChild(cv);

      const lbl = document.createElement('div');
      lbl.className = 'item-name-lbl';
      lbl.textContent = tr.name;

      const tag = document.createElement('div');
      tag.className = 'item-price-tag' + (isEquipped ? ' active-eq' : (!isOwned ? ' locked' : ''));
      tag.textContent = isEquipped ? '✓ Equipped' : (isOwned ? 'Equip' : `💎 ${tr.price}`);

      wrap.appendChild(box);
      wrap.appendChild(lbl);
      wrap.appendChild(tag);

      wrap.addEventListener('click', () => {
        AudioFX.unlock();
        if (isOwned) {
          state.trailEffect = tr.id;
          persistSave();
          renderAllShopGrids();
          showToast(`Equipped ${tr.name}!`);
        } else {
          if (state.gems < tr.price) {
            showToast(`Need ${tr.price - state.gems} more 💎 — Opening Gem Store!`);
            renderGemStore();
            openModal('modalGems');
            return;
          }
          state.gems -= tr.price;
          state.ownedTrails.push(tr.id);
          state.trailEffect = tr.id;
          checkNewAchievements();
          persistSave();
          AudioFX.playWinReveal();
          syncAllGemDisplays();
          renderAllShopGrids();
          showToast(`Unlocked & Equipped ${tr.name}!`);
        }
      });

      grid.appendChild(wrap);
    });
  }

  function renderAllShopGrids() {
    const playThemeCountEl = document.getElementById('playThemesUnlockedCount');
    if (playThemeCountEl) {
      playThemeCountEl.textContent = `${state.ownedThemes.length}/${PREMIUM_THEMES.length} Themes Unlocked`;
    }
    const skinsUnlockedStr = `${state.ownedArrowSkins.length}/${ARROW_SKINS.length} Unlocked`;
    const trailsUnlockedStr = `${state.ownedTrails.length}/${TRAIL_EFFECTS.length} Unlocked`;

    const homeSkinsCnt = document.getElementById('homeArrowSkinsCount');
    if (homeSkinsCnt) homeSkinsCnt.textContent = skinsUnlockedStr;
    const homeTrailsCnt = document.getElementById('homeTrailCount');
    if (homeTrailsCnt) homeTrailsCnt.textContent = trailsUnlockedStr;
    const skinsModalCnt = document.getElementById('skinsModalUnlockedCount');
    if (skinsModalCnt) skinsModalCnt.textContent = skinsUnlockedStr;
    const trailsModalCnt = document.getElementById('trailsModalUnlockedCount');
    if (trailsModalCnt) trailsModalCnt.textContent = trailsUnlockedStr;

    renderThemesShopInto('modalThemesGrid');
    if (document.getElementById('homeArrowSkinsGrid')) renderArrowSkinsShopInto('homeArrowSkinsGrid');
    renderArrowSkinsShopInto('modalArrowSkinsGrid');
    if (document.getElementById('homeTrailsGrid')) renderTrailsShopInto('homeTrailsGrid');
    renderTrailsShopInto('modalTrailsGrid');
    renderHomeLoadoutCard();
  }

  function renderHomeHeroPreview() {
    const playLv = getFallbackPlayableLevel();
    const data = ArrowGenerator.generateCampaignLevel(playLv);
    const frameTheme = NEON_FRAMES[(playLv - 1) % NEON_FRAMES.length];
    const th = currentTheme();

    const heroCard = document.getElementById('heroNeonCard');
    heroCard.style.borderColor = th.isLegend ? '#FDE047' : frameTheme.border;
    heroCard.style.boxShadow = th.isLegend
      ? '0 14px 34px rgba(0, 0, 0, 0.55), 0 0 28px rgba(253, 224, 71, 0.28), inset 0 0 24px rgba(253, 224, 71, 0.14)'
      : `0 14px 32px rgba(0, 0, 0, 0.5), 0 0 24px ${frameTheme.soft}, inset 0 0 24px ${frameTheme.soft}`;

    const chapBanner = document.getElementById('heroChapterBanner');
    if (chapBanner && data.meta && data.meta.chapter) {
      chapBanner.textContent = `✨ Chapter ${data.meta.chapter.id} • ${data.meta.chapter.title || data.meta.chapter.en || th.name}`;
    }

    const solvedCnt = Array.isArray(state.clearedLevels) ? state.clearedLevels.length : 0;
    const progFill = document.getElementById('homeWorldProgressFill');
    if (progFill) {
      const pct = Math.max(4, Math.min(100, Math.round((solvedCnt / 150) * 100)));
      progFill.style.width = `${pct}%`;
    }
    const solvedLbl = document.getElementById('homeSolvedCountLabel');
    if (solvedLbl) solvedLbl.textContent = `🌟 ${solvedCnt} / 150 Solved`;
    const comboLbl = document.getElementById('homeComboRecordLabel');
    if (comboLbl) comboLbl.textContent = `🔥 Best Combo x${state.bestCombo || 0}`;

    const pill = document.getElementById('heroLevelPill');
    pill.textContent = th.isLegend ? `👑 Level ${playLv}` : `Level ${playLv}`;
    pill.style.background = frameTheme.pill;
    pill.style.borderColor = th.isLegend ? '#FDE047' : frameTheme.border;

    document.getElementById('heroShapeTitle').textContent = data.meta.name;
    document.getElementById('heroTaskText').textContent =
      `Clear Reward: +${LEVEL_CLEAR_GEMS} 💎 • Goal: ${data.campaign.task.en}`;
    document.getElementById('btnHeroPlay').textContent = `▶ PLAY LEVEL ${playLv}`;

    // Draw rich glowing miniature sanctuary preview inside heroPreviewCanvas
    const hc = document.getElementById('heroPreviewCanvas');
    const hctx = hc.getContext('2d');
    const grad = hctx.createRadialGradient(hc.width * 0.5, hc.height * 0.42, 8, hc.width * 0.5, hc.height * 0.5, hc.width * 0.72);
    grad.addColorStop(0, th.swatchTop || th.boardBg);
    grad.addColorStop(1, th.boardBg);
    hctx.fillStyle = grad;
    hctx.fillRect(0, 0, hc.width, hc.height);

    // Subtle starlight motes inside preview box
    hctx.save();
    hctx.fillStyle = th.isLegend ? 'rgba(253, 224, 71, 0.5)' : 'rgba(186, 230, 253, 0.35)';
    for (let s = 0; s < 14; s++) {
      const sx = ((s * 37 + playLv * 13) % (hc.width - 14)) + 7;
      const sy = ((s * 53 + playLv * 19) % (hc.height - 14)) + 7;
      hctx.beginPath();
      hctx.arc(sx, sy, (s % 2) + 0.9, 0, Math.PI * 2);
      hctx.fill();
    }
    hctx.restore();

    const cell = (hc.width - 14) / Math.max(data.gridW, data.gridH);
    const metrics = {
      cell,
      ox: (hc.width - cell * data.gridW) / 2,
      oy: (hc.height - cell * data.gridH) / 2
    };
    const skin = currentArrowSkin();
    for (const a of data.arrows) {
      const cols = getArrowColors(a, skin);
      drawSnakeArrow(hctx, a, metrics, cols, skin.tipStyle, 1, false);
    }
  }

  function renderHomeLoadoutCard() {
    const skin = currentArrowSkin();
    const trail = currentTrail();
    const th = currentTheme();

    const sIcon = document.getElementById('homeEquippedSkinIcon');
    const sName = document.getElementById('homeEquippedSkinName');
    if (sIcon) sIcon.textContent = skin.icon || '🏹';
    if (sName) sName.textContent = skin.name || 'Neon Cyan';

    const trIcon = document.getElementById('homeEquippedTrailIcon');
    const trName = document.getElementById('homeEquippedTrailName');
    if (trIcon) trIcon.textContent = trail.icon || '✨';
    if (trName) trName.textContent = trail.name || 'Cyan Sparks';

    const thIcon = document.getElementById('homeEquippedThemeIcon');
    const thName = document.getElementById('homeEquippedThemeName');
    if (thIcon) thIcon.textContent = th.isLegend ? '👑' : (th.icon || '🌌');
    if (thName) thName.textContent = th.name || 'Cosmic Neon';
  }

  function renderAvatarPickerInto(containerId, onSelect) {
    const wrap = document.getElementById(containerId);
    if (!wrap) return;
    wrap.innerHTML = '';
    AVATARS.forEach((av) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'avatar-pick-btn' + (state.avatar === av ? ' active' : '');
      btn.textContent = av;
      btn.addEventListener('click', () => {
        AudioFX.unlock();
        AudioFX.playTap();
        state.avatar = av;
        persistSave();
        if (typeof onSelect === 'function') onSelect(av);
        renderAvatarPickerInto(containerId, onSelect);
      });
      wrap.appendChild(btn);
    });
  }

  function renderHomeScreen() {
    syncAllGemDisplays();
    document.getElementById('homeAvatar').textContent = state.avatar;
    document.getElementById('homePlayerName').textContent = state.playerName;
    renderHomeHeroPreview();
    renderHomeLoadoutCard();
    renderAllShopGrids();
  }

  // --- ISO/IEC 18004 Scannable QR Code Renderer (Versions 1–6, Level L, Mask 0) ---
  function drawScannableQr(canvasEl, rawText) {
    if (!canvasEl) return;
    const qctx = canvasEl.getContext('2d');
    const W = canvasEl.width;
    const H = canvasEl.height;
    qctx.fillStyle = '#FFFFFF';
    qctx.fillRect(0, 0, W, H);

    const bytes = Array.from(new TextEncoder().encode(String(rawText || '').slice(0, 132)));
    const VERSIONS = [
      null,
      [21, 26, 7, 1, []],
      [25, 44, 10, 1, [6, 18]],
      [29, 70, 15, 1, [6, 22]],
      [33, 100, 20, 1, [6, 26]],
      [37, 134, 26, 1, [6, 30]],
      [41, 172, 18, 2, [6, 34]]
    ];
    let ver = 6;
    for (let v = 1; v <= 6; v++) {
      const dataCap = VERSIONS[v][1] - VERSIONS[v][2] * VERSIONS[v][3];
      if (bytes.length + 2 <= dataCap) {
        ver = v;
        break;
      }
    }
    const [size, totalCw, ecPerBlock, numBlocks, align] = VERSIONS[ver];
    const totalDataCw = totalCw - ecPerBlock * numBlocks;

    // Encode Byte-Mode bitstream
    const bits = [];
    const pushBits = (val, len) => {
      for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1);
    };
    pushBits(0b0100, 4);
    pushBits(bytes.length, 8);
    bytes.forEach((b) => pushBits(b, 8));
    const maxBits = totalDataCw * 8;
    for (let i = 0; i < 4 && bits.length < maxBits; i++) bits.push(0);
    while (bits.length % 8 !== 0) bits.push(0);

    const dataCw = [];
    for (let i = 0; i < bits.length; i += 8) {
      let byte = 0;
      for (let b = 0; b < 8; b++) byte = (byte << 1) | bits[i + b];
      dataCw.push(byte);
    }
    let padIdx = 0;
    while (dataCw.length < totalDataCw) {
      dataCw.push(padIdx % 2 === 0 ? 0xEC : 0x11);
      padIdx++;
    }

    // GF(256) Reed-Solomon Error Correction
    const gfExp = new Uint8Array(512);
    const gfLog = new Uint8Array(256);
    let x = 1;
    for (let i = 0; i < 255; i++) {
      gfExp[i] = x;
      gfLog[x] = i;
      x <<= 1;
      if (x & 0x100) x ^= 0x11D;
    }
    for (let i = 255; i < 512; i++) gfExp[i] = gfExp[i - 255];
    const gfMul = (a, b) => (a === 0 || b === 0 ? 0 : gfExp[gfLog[a] + gfLog[b]]);

    let gen = [1];
    for (let i = 0; i < ecPerBlock; i++) {
      const next = new Array(gen.length + 1).fill(0);
      for (let j = 0; j < gen.length; j++) {
        next[j] ^= gen[j];
        next[j + 1] ^= gfMul(gen[j], gfExp[i]);
      }
      gen = next;
    }

    const computeEc = (block) => {
      const msg = block.concat(new Array(ecPerBlock).fill(0));
      for (let i = 0; i < block.length; i++) {
        const coef = msg[i];
        if (coef !== 0) {
          for (let j = 0; j < gen.length; j++) msg[i + j] ^= gfMul(gen[j], coef);
        }
      }
      return msg.slice(block.length);
    };

    const blockLen = totalDataCw / numBlocks;
    const dataBlocks = [];
    const ecBlocks = [];
    for (let b = 0; b < numBlocks; b++) {
      const blk = dataCw.slice(b * blockLen, (b + 1) * blockLen);
      dataBlocks.push(blk);
      ecBlocks.push(computeEc(blk));
    }

    const finalCw = [];
    for (let i = 0; i < blockLen; i++) {
      for (let b = 0; b < numBlocks; b++) finalCw.push(dataBlocks[b][i]);
    }
    for (let i = 0; i < ecPerBlock; i++) {
      for (let b = 0; b < numBlocks; b++) finalCw.push(ecBlocks[b][i]);
    }

    const mat = Array.from({ length: size }, () => new Uint8Array(size));
    const res = Array.from({ length: size }, () => new Uint8Array(size));
    const setMod = (r, c, dark) => {
      if (r >= 0 && r < size && c >= 0 && c < size) {
        mat[r][c] = dark ? 1 : 0;
        res[r][c] = 1;
      }
    };

    const placeFinder = (r0, c0) => {
      for (let dr = -1; dr <= 7; dr++) {
        for (let dc = -1; dc <= 7; dc++) {
          const inOuter = dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6;
          const isBorder = dr === 0 || dr === 6 || dc === 0 || dc === 6;
          const isCore = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
          setMod(r0 + dr, c0 + dc, inOuter && (isBorder || isCore));
        }
      }
    };
    placeFinder(0, 0);
    placeFinder(0, size - 7);
    placeFinder(size - 7, 0);

    for (const ar of align) {
      for (const ac of align) {
        if ((ar < 9 && ac < 9) || (ar < 9 && ac > size - 10) || (ar > size - 10 && ac < 9)) continue;
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            const dark = Math.max(Math.abs(dr), Math.abs(dc)) !== 1;
            setMod(ar + dr, ac + dc, dark);
          }
        }
      }
    }

    for (let i = 8; i < size - 8; i++) {
      if (!res[6][i]) setMod(6, i, i % 2 === 0);
      if (!res[i][6]) setMod(i, 6, i % 2 === 0);
    }
    setMod(size - 8, 8, true);

    for (let i = 0; i < 9; i++) {
      if (!res[8][i]) res[8][i] = 1;
      if (!res[i][8]) res[i][8] = 1;
    }
    for (let i = 0; i < 8; i++) {
      res[8][size - 1 - i] = 1;
      res[size - 1 - i][8] = 1;
    }

    const streamBits = [];
    finalCw.forEach((cw) => {
      for (let b = 7; b >= 0; b--) streamBits.push((cw >>> b) & 1);
    });

    let bitPtr = 0;
    let upward = true;
    for (let col = size - 1; col >= 1; col -= 2) {
      if (col === 6) col--;
      for (let step = 0; step < size; step++) {
        const r = upward ? size - 1 - step : step;
        for (let dc = 0; dc < 2; dc++) {
          const c = col - dc;
          if (!res[r][c]) {
            const bit = bitPtr < streamBits.length ? streamBits[bitPtr++] : 0;
            mat[r][c] = ((r + c) % 2 === 0) ? (bit ^ 1) : bit;
          }
        }
      }
      upward = !upward;
    }

    // Format Info for Level L (01) + Mask 0 (000) => 0x77C4
    const fmt = 0x77C4;
    const tlCoords = [
      [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
      [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]
    ];
    for (let i = 0; i < 15; i++) {
      const bit = (fmt >>> (14 - i)) & 1;
      mat[tlCoords[i][0]][tlCoords[i][1]] = bit;
    }
    for (let i = 0; i < 7; i++) mat[size - 1 - i][8] = (fmt >>> (14 - i)) & 1;
    for (let i = 0; i < 8; i++) mat[8][size - 8 + i] = (fmt >>> (7 - i)) & 1;

    const quiet = 2;
    const modPx = Math.floor(Math.min(W, H) / (size + quiet * 2));
    const offset = Math.floor((W - modPx * size) / 2);
    qctx.fillStyle = '#0F172A';
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (mat[r][c]) {
          qctx.fillRect(offset + c * modPx, offset + r * modPx, modPx, modPx);
        }
      }
    }
  }

  // --- Cloud Account Wallet Sync + Razorpay & Direct UPI Payment Gateway ---
  const OFFLINE_ACCOUNTS_KEY = 'arrow_puzzle_arena_accounts_v8';
  const PERM_MERCHANT = (typeof window !== 'undefined' && window.PERMANENT_MERCHANT_DEFAULTS) || {};
  let paymentConfig = {
    merchantName: 'Arrow Puzzle',
    razorpayKeyId: '',
    hasRazorpayKeys: false,
    cashfreeAppId: '',
    hasCashfreeKeys: false,
    cashfreeEnv: 'PRODUCTION',
    cardPaymentLink: '',
    googleClientId: '',
    smtpEmail: '',
    hasSmtpKeys: false,
    smsProvider: '2factor',
    hasSmsKeys: false,
    razorpayEnabled: true,
    mode: 'manual_approval',
    upiId: PERM_MERCHANT.upiId || '9119166816@ybl',
    settlementUpiId: PERM_MERCHANT.upiId || '9119166816@ybl',
    paymentNote: '',
    bankReceiverInfo: '',
    customQrImage: PERM_MERCHANT.customQrImage || 'merchant-qr.jpg',
    upiEnabled: true,
    cardEnabled: true,
    packs: GEM_PACKS.map((p) => Object.assign({ active: true, amountInr: p.priceInr }, p)),
    hasAdminPin: true
  };
  let selectedCheckoutPack = GEM_PACKS[0];
  let activeCheckoutTab = 'upi';
  const ADMIN_SESSION_KEY = 'arena_owner_admin_token_v9';
  let adminSessionToken = '';
  try {
    adminSessionToken = sessionStorage.getItem(ADMIN_SESSION_KEY) || '';
  } catch (_) {}
  let activeAdminTab = 'pending';
  let adminDraftPlans = [];
  let adminDraftQrImage = '';
  let adminDraftChannels = { upiEnabled: true, cardEnabled: true, razorpayEnabled: true };
  let secretTapCount = 0;
  let secretTapResetTimer = null;

  function getActiveGemPacks() {
    const raw = Array.isArray(paymentConfig.packs) && paymentConfig.packs.length ? paymentConfig.packs : GEM_PACKS;
    const list = raw
      .filter((p) => p && p.active !== false)
      .map((p) => {
        const amt = Number(p.amountInr || p.priceInr || 19);
        return {
          id: p.id,
          tag: p.tag || 'GEM PLAN',
          icon: p.icon || '💎',
          title: p.title || `${p.gems} Gems`,
          bundleText: p.bundleText || '',
          gems: Number(p.gems) || 25,
          amountInr: amt,
          priceInr: amt,
          priceLabel: p.priceLabel || `₹${amt}`,
          bonusSkins: Array.isArray(p.bonusSkins) ? p.bonusSkins : [],
          bonusTrails: Array.isArray(p.bonusTrails) ? p.bonusTrails : []
        };
      });
    return list.length ? list : GEM_PACKS;
  }

  function buildAccountSyncPayload(overrideAccountKey, forceClientGems) {
    const accountKey = (overrideAccountKey || getActiveAccountKey()).trim().toLowerCase();
    return {
      accountKey,
      playerId: state.playerId,
      playerName: state.playerName,
      avatar: state.avatar,
      email: state.accountEmail || '',
      gems: state.gems,
      forceClientGems: Boolean(forceClientGems),
      purchasedGemsTotal: state.purchasedGemsTotal || 0,
      creditedOrderIds: state.creditedOrderIds || [],
      score: state.score,
      highestUnlocked: state.highestUnlocked,
      unlockedLevels: state.unlockedLevels,
      singleLevelUnlockV16: true,
      clearedLevels: state.clearedLevels,
      ownedThemes: state.ownedThemes,
      ownedArrowSkins: state.ownedArrowSkins,
      ownedTrails: state.ownedTrails
    };
  }

  async function syncAccountWithServer(overrideAccountKey, forceClientGems) {
    const payload = buildAccountSyncPayload(overrideAccountKey, forceClientGems);
    try {
      const offlineMap = JSON.parse(localStorage.getItem(OFFLINE_ACCOUNTS_KEY) || '{}');
      offlineMap[payload.accountKey] = Object.assign({}, offlineMap[payload.accountKey] || {}, payload);
      localStorage.setItem(OFFLINE_ACCOUNTS_KEY, JSON.stringify(offlineMap));
    } catch (_) {}

    if (!isServerOnline()) return null;
    try {
      const res = await fetch('/api/account/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (!forceClientGems && data && data.account && typeof data.account.gems === 'number') {
        if (data.account.gems > state.gems) {
          state.gems = data.account.gems;
          localStorage.setItem(SAVE_KEY, JSON.stringify(state));
          syncAllGemDisplays();
        }
      }
      return data;
    } catch (_) {
      return null;
    }
  }

  function scheduleCloudAccountSync() {
    clearTimeout(accountSyncTimer);
    accountSyncTimer = setTimeout(() => {
      syncAccountWithServer(undefined, true);
    }, 650);
  }

  async function restoreAccountByKey(rawKey) {
    const key = String(rawKey || '').trim().toLowerCase();
    if (!key || key.length < 3) {
      showToast('Enter your Email, Mobile Number, or Account ID first!');
      return;
    }
    let foundAcct = null;
    let foundOrders = [];

    if (window.location.protocol.startsWith('http')) {
      try {
        const res = await fetch(`/api/account/lookup?accountKey=${encodeURIComponent(key)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.found && data.account) {
            foundAcct = data.account;
            foundOrders = Array.isArray(data.orders) ? data.orders : [];
          }
        }
      } catch (_) {}
    }

    if (!foundAcct) {
      try {
        const offlineMap = JSON.parse(localStorage.getItem(OFFLINE_ACCOUNTS_KEY) || '{}');
        if (offlineMap[key]) foundAcct = offlineMap[key];
      } catch (_) {}
    }

    if (!foundAcct) {
      showToast('No saved wallet found for that account yet — click Link & Sync to bind it!');
      return;
    }

    state.accountEmail = key;
    if (foundAcct.playerName) state.playerName = foundAcct.playerName;
    if (foundAcct.avatar) state.avatar = foundAcct.avatar;
    state.gems = Math.max(state.gems, Number(foundAcct.gems) || 0);
    state.purchasedGemsTotal = Math.max(state.purchasedGemsTotal || 0, Number(foundAcct.purchasedGemsTotal) || 0);
    state.score = Math.max(state.score, Number(foundAcct.score) || 0);

    const mergeArr = (a, b) => Array.from(new Set([...(a || []), ...(b || [])]));
    state.unlockedLevels = mergeArr(state.unlockedLevels, foundAcct.unlockedLevels).sort((x, y) => x - y);
    state.clearedLevels = mergeArr(state.clearedLevels, foundAcct.clearedLevels).sort((x, y) => x - y);
    state.highestUnlocked = Math.max(state.highestUnlocked, Number(foundAcct.highestUnlocked) || 1, ...state.unlockedLevels);
    state.ownedThemes = mergeArr(state.ownedThemes, foundAcct.ownedThemes);
    state.ownedArrowSkins = mergeArr(state.ownedArrowSkins, foundAcct.ownedArrowSkins);
    state.ownedTrails = mergeArr(state.ownedTrails, foundAcct.ownedTrails);
    state.creditedOrderIds = mergeArr(state.creditedOrderIds, foundAcct.creditedOrderIds);
    if (foundOrders.length) state.recentOrders = foundOrders.slice(0, 8);

    persistSave();
    AudioFX.playWinReveal();
    syncAllGemDisplays();
    renderHomeScreen();
    renderAccountModal();
    showToast(`Restored Wallet (${state.gems} 💎) for ${key}!`);
  }

  function renderAccountModal() {
    const nameInp = document.getElementById('inputAcctName');
    if (nameInp) nameInp.value = state.playerName || 'Player';
    const keyLbl = document.getElementById('acctCurrentKeyLabel');
    if (keyLbl) keyLbl.textContent = `${state.avatar} ${state.playerName} • 💎 ${state.gems}`;
    const avBtn = document.getElementById('btnAcctCycleAvatar');
    if (avBtn) avBtn.textContent = state.avatar || '🦊';
    renderAvatarPickerInto('profileAvatarGrid', (av) => {
      if (avBtn) avBtn.textContent = av;
      if (keyLbl) keyLbl.textContent = `${av} ${state.playerName} • 💎 ${state.gems}`;
      renderHomeScreen();
    });
  }

  async function refreshPaymentConfig() {
    if (!isServerOnline()) return paymentConfig;
    try {
      const res = await fetch('/api/payment/config');
      if (res.ok) {
        const cfg = await res.json();
        paymentConfig = Object.assign(paymentConfig, cfg);
      }
    } catch (_) {}
    updateGatewayBadges();
    return paymentConfig;
  }

  function updateGatewayBadges() {
    // Store header clean — no Instant Checkout badge
  }

  function loadRazorpaySdk() {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const existing = document.querySelector('script[data-rzp-sdk]');
      if (existing) {
        existing.addEventListener('load', () => resolve(Boolean(window.Razorpay)));
        existing.addEventListener('error', () => resolve(false));
        return;
      }
      const s = document.createElement('script');
      s.src = 'https://checkout.razorpay.com/v1/checkout.js';
      s.async = true;
      s.dataset.rzpSdk = '1';
      s.onload = () => resolve(Boolean(window.Razorpay));
      s.onerror = () => resolve(false);
      document.head.appendChild(s);
    });
  }

  function loadCashfreeSdk() {
    return new Promise((resolve) => {
      if (window.Cashfree) return resolve(true);
      const existing = document.querySelector('script[data-cf-sdk]');
      if (existing) {
        existing.addEventListener('load', () => resolve(Boolean(window.Cashfree)));
        existing.addEventListener('error', () => resolve(false));
        return;
      }
      const s = document.createElement('script');
      s.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      s.async = true;
      s.dataset.cfSdk = '1';
      s.onload = () => resolve(Boolean(window.Cashfree));
      s.onerror = () => resolve(false);
      document.head.appendChild(s);
    });
  }

  function renderOrderHistoryRowsInto(containerEl, ordersList) {
    if (!containerEl) return;
    containerEl.innerHTML = '';
    const safeList = Array.isArray(ordersList) ? ordersList : [];
    const pendingTotal = safeList.filter((o) => o && o.status === 'pending_approval').length;
    const headingEl = document.getElementById('recentOrdersHeadingText');
    if (headingEl) {
      headingEl.textContent = pendingTotal > 0
        ? `📋 My Gem Orders (${pendingTotal} Wait for Approval)`
        : '📋 My Gem Orders & Status';
    }

    safeList.slice(0, 25).forEach((ord) => {
      const row = document.createElement('div');
      row.className = 'receipt-row';
      row.style.flexDirection = 'column';
      row.style.alignItems = 'stretch';
      row.style.gap = '4px';

      const st = ord.status || 'paid';
      const codeStr = ord.inquiryCode || ('#' + String(ord.orderId || '').slice(-6).toUpperCase());
      let badgeHtml = `<span class="order-status-pill paid">✅ Approved</span>`;
      if (st === 'pending_approval') {
        badgeHtml = `<span class="order-status-pill pending">⏳ Wait for Approval</span>`;
      } else if (st === 'rejected') {
        badgeHtml = `<span class="order-status-pill rejected">❌ Rejected</span>`;
      }

      const amt = ord.amountInr || ord.priceInr || 0;
      const refText = ord.paymentRef || ord.upiUtr || ord.method || '';
      const reasonHtml = st === 'rejected' && ord.rejectReason
        ? `<div style="font-size:0.66rem;color:#fb7185;">Reason: ${ord.rejectReason}</div>`
        : '';

      row.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
          <div>
            <strong>+${ord.gems} 💎</strong> • <span style="color:var(--text-muted);">₹${amt}</span>
            <span style="font-size:0.63rem;color:var(--cyan-primary);margin-left:4px;font-family:ui-monospace,monospace;">${codeStr}</span>
          </div>
          ${badgeHtml}
        </div>
        ${refText ? `<div style="font-size:0.65rem;color:var(--text-muted);font-family:ui-monospace,monospace;">${refText}</div>` : ''}
        ${reasonHtml}
      `;
      containerEl.appendChild(row);
    });
  }

  function refreshCheckoutPendingBanner() {
    const box = document.getElementById('checkoutPendingBox');
    if (!box) return;
    const pendingList = (state.recentOrders || []).filter((o) => o && o.status === 'pending_approval');
    if (pendingList.length === 0) {
      box.style.display = 'none';
      return;
    }
    const latestOrd = pendingList[0];
    const codeStr = latestOrd.inquiryCode || ('#' + String(latestOrd.orderId || '').slice(-6).toUpperCase());
    box.style.display = 'block';
    document.getElementById('checkoutPendingTitle').textContent =
      pendingList.length > 1
        ? `⏳ Wait for Approval (${pendingList.length} Orders Pending • 2–10 Mins)`
        : `⏳ Wait for Approval (+${latestOrd.gems} 💎 • ${codeStr} • 2–10 Mins)`;
    document.getElementById('checkoutPendingDesc').textContent =
      pendingList.length > 1
        ? `Approval Time: 2–10 Minutes. Latest ${codeStr} (+${latestOrd.gems} 💎) & ${pendingList.length - 1} other inquiry(s) are waiting for Admin approval. You can also place another Gem order below!`
        : `Approval Time: 2–10 Minutes • ${latestOrd.paymentRef || 'Gem inquiry submitted'} — Gems credit automatically once Admin approves!`;
  }

  function hideCheckoutWaitApprovalScreen() {
    const waitView = document.getElementById('checkoutWaitApprovalView');
    const mainWrap = document.getElementById('checkoutFormMainWrap');
    if (waitView) waitView.style.display = 'none';
    if (mainWrap) mainWrap.style.display = 'block';
  }

  function showCheckoutWaitApprovalScreen(orderObj) {
    const waitView = document.getElementById('checkoutWaitApprovalView');
    const mainWrap = document.getElementById('checkoutFormMainWrap');
    if (!waitView || !mainWrap || !orderObj) return;

    const codeStr = orderObj.inquiryCode || ('#' + String(orderObj.orderId || '').slice(-6).toUpperCase());
    const amt = orderObj.amountInr || orderObj.priceInr || 0;
    const pendingCount = (state.recentOrders || []).filter((o) => o && o.status === 'pending_approval').length || 1;
    const methodLabel = orderObj.paymentMethod === 'card' ? 'Card Order' : 'UPI Order';

    const headlineEl = document.getElementById('waitApprovalHeadline');
    if (headlineEl) {
      headlineEl.textContent = `${methodLabel} — Wait for Approval (+${orderObj.gems} 💎 • ₹${amt})`;
    }

    const timeEl = document.getElementById('waitApprovalTimeBadge');
    if (timeEl) {
      timeEl.textContent = '⏱️ Approval Time: 2–10 Minutes';
    }

    const detailsEl = document.getElementById('waitApprovalDetails');
    if (detailsEl) {
      detailsEl.textContent = pendingCount > 1
        ? `Inquiry ${codeStr} for ${orderObj.accountKey || getActiveAccountKey()} is sent to Admin! You currently have ${pendingCount} Gem order inquiries in Wait for Approval — Gems credit automatically as soon as Admin approves.`
        : `Inquiry ${codeStr} for ${orderObj.accountKey || getActiveAccountKey()} is sent to Admin! Please Wait for Approval — Gems & bundle items credit automatically as soon as Admin approves.`;
    }

    const refBadgeEl = document.getElementById('waitApprovalRefBadge');
    if (refBadgeEl) {
      refBadgeEl.textContent = `${codeStr} • ${orderObj.paymentRef || orderObj.upiUtr || 'Submitted'} • ⏳ WAIT FOR APPROVAL`;
    }

    mainWrap.style.display = 'none';
    waitView.style.display = 'block';
  }

  function computeCustomGemPriceInr(gems) {
    const qty = Math.max(1, Math.min(100000, Math.floor(Number(gems) || 100)));
    return Math.max(10, Math.round(qty * 0.75));
  }

  function syncCustomGemChoiceUI() {
    const inp = document.getElementById('inputCustomGemQty');
    const previewEl = document.getElementById('customGemPricePreview');
    const buyBtn = document.getElementById('btnBuyCustomGems');
    if (!inp || !buyBtn) return;

    const rawVal = Math.floor(Number(inp.value) || 0);
    const qty = rawVal > 0 ? Math.min(100000, rawVal) : 100;
    const priceInr = computeCustomGemPriceInr(qty);

    if (previewEl) previewEl.textContent = `${qty} 💎 = ₹${priceInr}`;
    buyBtn.textContent = `Buy ${qty} 💎 • ₹${priceInr}`;
  }

  function openCustomGemCheckout() {
    const inp = document.getElementById('inputCustomGemQty');
    const qty = Math.floor(Number(inp && inp.value) || 0);
    if (qty < 10 || qty > 100000) {
      AudioFX.playBlocked();
      showToast('Enter a Custom Gem amount between 10 and 100,000!');
      return;
    }
    const priceInr = computeCustomGemPriceInr(qty);
    openCheckoutModal({
      id: 'custom_gems',
      isCustom: true,
      customGems: qty,
      tag: 'CUSTOM CHOICE',
      icon: '💎',
      title: `Custom Gem Choice (${qty} Gems)`,
      bundleText: 'Custom Player Gem Pack',
      gems: qty,
      amountInr: priceInr,
      priceInr,
      priceLabel: `₹${priceInr}`,
      bonusSkins: [],
      bonusTrails: []
    });
  }

  function renderGemPackCardsNow() {
    const grid = document.getElementById('gemPackGrid');
    if (!grid) return;
    grid.innerHTML = '';
    getActiveGemPacks().forEach((pk) => {
      const card = document.createElement('div');
      card.className = 'gem-pack-card';
      card.innerHTML = `
        <div style="font-size:0.60rem;font-weight:900;color:var(--gold-primary);letter-spacing:0.5px;">${pk.tag}</div>
        <div style="font-size:1.52rem;">${pk.icon}</div>
        <div style="font-size:0.77rem;font-weight:800;line-height:1.25;">${pk.title}</div>
        <div style="font-size:0.64rem;color:var(--cyan-primary);font-weight:700;line-height:1.2;">${pk.bundleText || ''}</div>
        <div style="font-size:0.95rem;font-weight:900;color:var(--gold-primary);">+${pk.gems} 💎</div>
        <button class="primary-btn gold" style="padding:7px 10px;font-size:0.76rem;margin-top:2px;">
          Buy • ${pk.priceLabel}
        </button>
      `;
      card.querySelector('button').addEventListener('click', () => {
        AudioFX.unlock();
        AudioFX.playTap();
        openCheckoutModal(pk);
      });
      grid.appendChild(card);
    });
  }

  function renderGemStore() {
    syncAllGemDisplays();
    renderGemPackCardsNow();
    syncCustomGemChoiceUI();
    refreshPaymentConfig().then(() => {
      renderGemPackCardsNow();
    });
    pollMyPaymentOrders(false);

    const recSec = document.getElementById('recentOrdersSection');
    const recList = document.getElementById('recentOrdersList');
    if (Array.isArray(state.recentOrders) && state.recentOrders.length > 0) {
      recSec.style.display = 'block';
      renderOrderHistoryRowsInto(recList, state.recentOrders);
    } else {
      recSec.style.display = 'none';
    }
  }

  async function openCheckoutModal(pack) {
    hideCheckoutWaitApprovalScreen();
    await refreshPaymentConfig();
    const freshMatch = pack && pack.id === 'custom_gems'
      ? pack
      : (getActiveGemPacks().find((p) => p.id === pack.id) || pack);
    selectedCheckoutPack = freshMatch;

    document.getElementById('checkoutPackName').textContent = freshMatch.title;
    document.getElementById('checkoutPackGems').textContent =
      `+${freshMatch.gems} 💎` + (freshMatch.bonusSkins?.length || freshMatch.bonusTrails?.length ? ' • +Bundled Unlocks' : '');
    document.getElementById('checkoutPackPrice').textContent = freshMatch.priceLabel;
    document.getElementById('inputCheckoutAccount').value = state.accountEmail || state.playerId;
    document.getElementById('inputUpiUtr').value = '';
    document.getElementById('inputCardCvv').value = '';
    document.getElementById('inputCardAuthRef').value = '';

    const noteEl = document.getElementById('checkoutMerchantNote');
    if (noteEl) {
      if (paymentConfig.paymentNote) {
        noteEl.textContent = `ℹ️ ${paymentConfig.paymentNote}`;
        noteEl.style.display = 'block';
      } else {
        noteEl.style.display = 'none';
      }
    }

    const bankEl = document.getElementById('checkoutBankInfoBox');
    if (bankEl) {
      if (paymentConfig.bankReceiverInfo) {
        bankEl.textContent = `🏦 ${paymentConfig.bankReceiverInfo}`;
        bankEl.style.display = 'block';
      } else {
        bankEl.style.display = 'none';
      }
    }

    const upiAllowed = paymentConfig.upiEnabled !== false;
    const cardAllowed = paymentConfig.cardEnabled !== false;
    const rzpAllowed = Boolean(paymentConfig.hasRazorpayKeys);

    const upiTabBtn = document.getElementById('tabBtnUpi');
    const cardTabBtn = document.getElementById('tabBtnCard');
    const rzpTabBtn = document.getElementById('tabBtnRazorpay');
    if (upiTabBtn) upiTabBtn.style.display = upiAllowed ? '' : 'none';
    if (cardTabBtn) cardTabBtn.style.display = cardAllowed ? '' : 'none';
    if (rzpTabBtn) rzpTabBtn.style.display = rzpAllowed ? '' : 'none';

    refreshCheckoutPendingBanner();
    let defaultTab = activeCheckoutTab;
    if (defaultTab === 'upi' && !upiAllowed) defaultTab = cardAllowed ? 'card' : 'razorpay';
    if (defaultTab === 'card' && !cardAllowed) defaultTab = upiAllowed ? 'upi' : 'razorpay';
    if (defaultTab === 'razorpay' && !rzpAllowed) defaultTab = upiAllowed ? 'upi' : 'card';
    setCheckoutMethodTab(defaultTab);
    openModal('modalCheckout');
  }

  function buildDirectUpiUri(pack, accountKey) {
    const vpa = (paymentConfig.upiId || 'merchant@upi').trim();
    const pn = (paymentConfig.merchantName || 'Arrow Puzzle').trim();
    const note = `${pack.gems} Gems for ${accountKey}`.slice(0, 42);
    return `upi://pay?pa=${encodeURIComponent(vpa)}&pn=${encodeURIComponent(pn)}&am=${pack.priceInr}&cu=INR&tn=${encodeURIComponent(note)}`;
  }

  function refreshDirectUpiQr() {
    const pack = selectedCheckoutPack || getActiveGemPacks()[0];
    const acct = (document.getElementById('inputCheckoutAccount').value || '').trim() || getActiveAccountKey();
    const upiUri = buildDirectUpiUri(pack, acct);

    const lbl = document.getElementById('directUpiToLabel');
    const copyStrip = document.getElementById('checkoutUpiCopyStrip');
    const upiIdTxt = document.getElementById('checkoutUpiIdText');
    if (paymentConfig.upiId) {
      lbl.textContent = `Pay ${pack.priceLabel} to ${paymentConfig.merchantName || 'Merchant'}, then enter UTR below`;
      if (copyStrip && upiIdTxt) {
        upiIdTxt.textContent = paymentConfig.upiId;
        copyStrip.style.display = 'inline-flex';
      }
    } else {
      lbl.textContent = 'Scan QR or Open UPI App to complete payment, then submit 12-digit UTR below';
      if (copyStrip) copyStrip.style.display = 'none';
    }

    const linkBtn = document.getElementById('btnOpenUpiAppLink');
    linkBtn.href = upiUri;
    linkBtn.textContent = `📱 Pay ${pack.priceLabel} in GPay / PhonePe / Paytm`;
    linkBtn.style.display = paymentConfig.upiId ? '' : 'none';

    const customImg = document.getElementById('upiCustomQrImg');
    const qrCanvas = document.getElementById('upiQrCanvas');
    if (paymentConfig.customQrImage && customImg) {
      customImg.src = paymentConfig.customQrImage;
      customImg.style.display = 'block';
      if (qrCanvas) qrCanvas.style.display = 'none';
    } else {
      if (customImg) customImg.style.display = 'none';
      if (qrCanvas) {
        qrCanvas.style.display = 'block';
        drawScannableQr(qrCanvas, upiUri);
      }
    }
  }

  function detectCardBrand(digits) {
    if (/^4/.test(digits)) return 'VISA';
    if (/^(5[1-5]|2[2-7])/.test(digits)) return 'MASTERCARD';
    if (/^(60|65|81|82|508)/.test(digits)) return 'RUPAY';
    if (/^3[47]/.test(digits)) return 'AMEX';
    if (/^6(?:011|4[4-9])/.test(digits)) return 'DISCOVER';
    return '💳 CARD';
  }

  function isValidLuhn(digits) {
    if (!/^\d{13,19}$/.test(digits)) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let d = digits.charCodeAt(i) - 48;
      if (shouldDouble) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      sum += d;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }

  function isValidExpiryMmYy(rawExp) {
    const m = /^(\d{2})\/(\d{2})$/.exec(String(rawExp || '').trim());
    if (!m) return false;
    const month = Number(m[1]);
    const year = 2000 + Number(m[2]);
    if (month < 1 || month > 12) return false;
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth() + 1;
    return year > curYear || (year === curYear && month >= curMonth);
  }

  function setCheckoutMethodTab(tab) {
    const upiAllowed = paymentConfig.upiEnabled !== false;
    const cardAllowed = paymentConfig.cardEnabled !== false;
    const hasLiveGateway = Boolean(paymentConfig.hasRazorpayKeys || paymentConfig.hasCashfreeKeys);

    if (tab === 'upi' && !upiAllowed) tab = cardAllowed ? 'card' : 'razorpay';
    if (tab === 'card' && !cardAllowed) tab = upiAllowed ? 'upi' : 'razorpay';
    if (tab === 'razorpay' && !hasLiveGateway) tab = upiAllowed ? 'upi' : 'card';
    activeCheckoutTab = ['upi', 'card', 'razorpay'].includes(tab) ? tab : 'upi';

    document.querySelectorAll('#checkoutMethodTabs .seg-tab').forEach((b) => {
      b.classList.toggle('active', b.dataset.paytab === activeCheckoutTab);
    });
    document.getElementById('checkoutPaneUpi').style.display = activeCheckoutTab === 'upi' ? 'block' : 'none';
    document.getElementById('checkoutPaneCard').style.display = activeCheckoutTab === 'card' ? 'block' : 'none';
    document.getElementById('checkoutPaneRazorpay').style.display = activeCheckoutTab === 'razorpay' ? 'block' : 'none';

    const pack = selectedCheckoutPack || getActiveGemPacks()[0];
    const settlementUpi = (paymentConfig.upiId || paymentConfig.settlementUpiId || '9119166816@ybl').trim();
    const acct = ((document.getElementById('inputCheckoutAccount')?.value || '').trim() || getActiveAccountKey());

    const receiverText = document.getElementById('cardReceiverUpiText');
    if (receiverText) receiverText.textContent = settlementUpi;

    const hostedCardBtn = document.getElementById('btnOpenHostedCardPage');
    if (hostedCardBtn) {
      const cardUrl = (paymentConfig.cardPaymentLink || '').trim();
      if (cardUrl) {
        hostedCardBtn.style.display = 'flex';
        hostedCardBtn.href = cardUrl;
        hostedCardBtn.textContent = `💳 Step 1: Pay ${pack.priceLabel} via 3D-Secure Card Link (${settlementUpi})`;
      } else {
        hostedCardBtn.style.display = 'none';
      }
    }

    const rupayBtn = document.getElementById('btnPayRupayCardOnUpi');
    if (rupayBtn) {
      const upiCardUri = buildDirectUpiUri(pack, acct) + '&mode=02';
      rupayBtn.href = upiCardUri;
      rupayBtn.textContent = `💳 Pay ${pack.priceLabel} via RuPay Card / UPI -> ${settlementUpi}`;
    }

    const manualRefRow = document.getElementById('cardManualRefRow');
    const cardBtn = document.getElementById('btnPayWithCard');
    const cardHint = document.getElementById('cardModeHint');
    const cardShell = document.querySelector('#checkoutPaneCard .card-form-shell');
    const directTransferBox = document.getElementById('cardDirectTransferActions');

    if (hasLiveGateway) {
      if (manualRefRow) manualRefRow.style.display = 'none';
      if (cardShell) cardShell.style.display = 'none';
      if (directTransferBox) directTransferBox.style.display = 'none';
      cardBtn.textContent = `💳 Pay ${pack.priceLabel} by Card (3D-Secure OTP -> ${settlementUpi})`;
      cardHint.innerHTML = `🔒 3D-Secure Bank OTP Card Checkout settling to <strong>${settlementUpi}</strong>. Instant Gem credit after bank verification.`;
    } else {
      if (manualRefRow) manualRefRow.style.display = 'block';
      if (cardShell) cardShell.style.display = 'block';
      if (directTransferBox) directTransferBox.style.display = 'flex';
      cardBtn.textContent = `💳 Submit Card Order Request (${pack.priceLabel})`;
      cardHint.innerHTML = `⏳ <strong>Approval Time: 2–10 Minutes</strong> • Every Card order settles to <strong>${settlementUpi}</strong> and stays in <strong>Wait for Approval</strong> until Admin confirms.`;
    }

    const rzpBtn = document.getElementById('btnPayWithRazorpay');
    const rzpHint = document.getElementById('razorpayModeHint');
    rzpBtn.textContent = `⚡ Pay ${pack.priceLabel} via Express Gateway`;
    rzpHint.textContent = hasLiveGateway
      ? `Connected to ${paymentConfig.merchantName} (${settlementUpi}). Instant Card, UPI & NetBanking checkout.`
      : 'Use UPI / UTR or Card tab to complete your purchase.';

    if (activeCheckoutTab === 'upi') {
      refreshDirectUpiQr();
    }
  }

  function applyApprovedOrderLocally(ord) {
    const ordId = String(ord.orderId || '');
    if (!ordId || state.creditedOrderIds.includes(ordId)) return false;

    const gemsToAdd = Number(ord.gems) || 0;
    state.gems += gemsToAdd;
    state.purchasedGemsTotal = (state.purchasedGemsTotal || 0) + gemsToAdd;
    state.creditedOrderIds.push(ordId);

    if (Array.isArray(ord.bonusSkins)) {
      ord.bonusSkins.forEach((skId) => {
        if (!state.ownedArrowSkins.includes(skId)) state.ownedArrowSkins.push(skId);
      });
      if (ord.bonusSkins.length) state.arrowSkin = ord.bonusSkins[0];
    }
    if (Array.isArray(ord.bonusTrails)) {
      ord.bonusTrails.forEach((trId) => {
        if (!state.ownedTrails.includes(trId)) state.ownedTrails.push(trId);
      });
      if (ord.bonusTrails.length) state.trailEffect = ord.bonusTrails[0];
    }
    return true;
  }

  async function pollMyPaymentOrders(showManualFeedback) {
    if (!isServerOnline()) return;
    const accountKey = getActiveAccountKey();
    try {
      const url = `/api/payment/my-orders?accountKey=${encodeURIComponent(accountKey)}&playerId=${encodeURIComponent(state.playerId || '')}&_t=${Date.now()}`;
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (!data || !Array.isArray(data.orders)) return;

      let newlyApprovedGems = 0;
      let newlyRejectedMsg = '';

      data.orders.forEach((ord) => {
        if (ord.status === 'paid' && !state.creditedOrderIds.includes(ord.orderId)) {
          if (applyApprovedOrderLocally(ord)) {
            newlyApprovedGems += Number(ord.gems) || 0;
          }
        } else if (ord.status === 'rejected' && !state.notifiedRejectedIds.includes(ord.orderId)) {
          state.notifiedRejectedIds.push(ord.orderId);
          newlyRejectedMsg = ord.rejectReason || 'Invalid or unmatched UTR / reference';
        }
      });

      const serverIds = new Set(data.orders.map((o) => o && o.orderId));
      const preservedLocalPending = (state.recentOrders || []).filter(
        (o) => o && o.status === 'pending_approval' && !serverIds.has(o.orderId)
      );
      state.recentOrders = [...data.orders, ...preservedLocalPending].slice(0, 30);

      persistSave();
      refreshCheckoutPendingBanner();

      const recSec = document.getElementById('recentOrdersSection');
      const recList = document.getElementById('recentOrdersList');
      if (recSec && recList) {
        if (state.recentOrders.length > 0) {
          recSec.style.display = 'block';
          renderOrderHistoryRowsInto(recList, state.recentOrders);
        } else {
          recSec.style.display = 'none';
        }
      }

      if (newlyApprovedGems > 0) {
        AudioFX.playWinReveal();
        staticDirty = true;
        syncAllGemDisplays();
        renderAllShopGrids();
        updateContinueModalButtons();
        if (pendingUnlockLevel !== null && document.getElementById('modalUnlockLevel').classList.contains('open')) {
          refreshUnlockModalUI(pendingUnlockLevel);
        }
        closeModal('modalCheckout');
        showToast(`🎉 Payment Approved! +${newlyApprovedGems} 💎 Credited!`);
      } else if (newlyRejectedMsg) {
        AudioFX.playBlocked();
        showToast(`❌ Payment Rejected: ${newlyRejectedMsg}`);
      } else if (showManualFeedback) {
        const pendingCount = state.recentOrders.filter((o) => o && o.status === 'pending_approval').length;
        showToast(pendingCount > 0
          ? `⏳ Wait for Approval — ${pendingCount} Gem order(s) awaiting Admin verification!`
          : '✓ Order status is up to date!');
      }
    } catch (_) {}
  }

  function recordSubmittedPendingOrder(orderObj, accountKey) {
    const cleanTarget = accountKey.trim().toLowerCase();
    if (cleanTarget && cleanTarget !== (state.playerId || '').toLowerCase()) {
      state.accountEmail = cleanTarget;
      syncAllGemDisplays();
    }
    const existingFiltered = (state.recentOrders || []).filter((o) => o.orderId !== orderObj.orderId);
    state.recentOrders = [orderObj, ...existingFiltered].slice(0, 30);
    persistSave();
    refreshCheckoutPendingBanner();
    const recSec = document.getElementById('recentOrdersSection');
    const recList = document.getElementById('recentOrdersList');
    if (recSec && recList) {
      recSec.style.display = 'block';
      renderOrderHistoryRowsInto(recList, state.recentOrders);
    }
    try {
      localStorage.setItem('arrow_admin_ping_v1', `${Date.now()}_${orderObj.orderId || ''}`);
    } catch (_) {}
    if (adminSessionToken) {
      openAdminControlPanel(true);
    }
  }

  function finalizeCreditedOrder(pack, accountKey, methodLabel, refId) {
    const cleanTarget = accountKey.trim().toLowerCase();
    if (!state.accountEmail && cleanTarget !== state.playerId.toLowerCase()) {
      state.accountEmail = cleanTarget;
    }

    const ordId = refId || ('ord_' + Date.now());
    const orderObj = {
      orderId: ordId,
      packId: pack.id,
      gems: pack.gems,
      bonusSkins: pack.bonusSkins || [],
      bonusTrails: pack.bonusTrails || [],
      amountInr: pack.priceInr,
      priceInr: pack.priceInr,
      accountKey: cleanTarget,
      paymentRef: methodLabel.toUpperCase() + ': ' + ordId,
      status: 'paid'
    };

    applyApprovedOrderLocally(orderObj);
    const existingFiltered = (state.recentOrders || []).filter((o) => o.orderId !== ordId);
    state.recentOrders = [orderObj, ...existingFiltered].slice(0, 8);

    persistSave();
    AudioFX.playWinReveal();
    staticDirty = true;
    syncAllGemDisplays();
    renderAllShopGrids();
    renderGemStore();
    updateContinueModalButtons();
    if (pendingUnlockLevel !== null && document.getElementById('modalUnlockLevel').classList.contains('open')) {
      refreshUnlockModalUI(pendingUnlockLevel);
    }
    closeModal('modalCheckout');
    showToast(`🎉 Credited +${pack.gems} 💎 & Bundle Unlocks to ${cleanTarget}!`);
  }

  async function launchRazorpayCheckoutFlow(options) {
    const cardOnly = Boolean(options && options.cardOnly);
    const cardHolderPrefill = (options && options.cardHolder) || state.playerName;
    const pack = selectedCheckoutPack || GEM_PACKS[0];
    const rawAcct = (document.getElementById('inputCheckoutAccount').value || '').trim();
    const accountKey = (rawAcct || getActiveAccountKey()).toLowerCase();

    if (!paymentConfig.hasRazorpayKeys && !paymentConfig.hasCashfreeKeys) {
      setCheckoutMethodTab(cardOnly ? 'card' : 'upi');
      showToast('Please complete payment via UPI / UTR or Card below.');
      return;
    }

    const triggerBtn = document.getElementById(cardOnly ? 'btnPayWithCard' : 'btnPayWithRazorpay');
    triggerBtn.disabled = true;

    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packId: pack.id,
          customGems: pack.id === 'custom_gems' ? pack.gems : undefined,
          accountKey,
          playerName: cardHolderPrefill || state.playerName,
          preferredGateway: paymentConfig.hasRazorpayKeys ? 'razorpay' : 'cashfree'
        })
      });
      const orderResp = await res.json();
      if (!res.ok) {
        showToast(orderResp.error || 'Could not create payment order');
        triggerBtn.disabled = false;
        return;
      }

      const ord = orderResp && orderResp.order ? orderResp.order : null;

      // Option A: Cashfree 3D-Secure Card Gateway -> settles to 9119166816@ybl linked bank account
      if (ord && ord.gatewayMode === 'cashfree' && orderResp.cashfreePaymentSessionId) {
        const cfLoaded = await loadCashfreeSdk();
        if (!cfLoaded || !window.Cashfree) {
          showToast('Could not load Cashfree Card SDK — check internet connection.');
          triggerBtn.disabled = false;
          return;
        }
        const cfInstance = window.Cashfree({
          mode: (orderResp.cashfreeEnv || 'PRODUCTION').toLowerCase() === 'sandbox' ? 'sandbox' : 'production'
        });
        const cfResult = await cfInstance.checkout({
          paymentSessionId: orderResp.cashfreePaymentSessionId,
          redirectTarget: '_modal'
        });
        if (cfResult && cfResult.error) {
          showToast(cfResult.error.message || 'Card payment cancelled');
          triggerBtn.disabled = false;
          return;
        }
        const vRes = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: ord.orderId,
            orderToken: orderResp.orderToken || '',
            packId: pack.id,
            accountKey,
            playerName: state.playerName,
            method: 'cashfree_card',
            gatewayMode: 'cashfree'
          })
        });
        const vData = await vRes.json();
        if (vRes.ok && vData.ok) {
          finalizeCreditedOrder(pack, accountKey, 'card_3ds', ord.orderId);
        } else {
          showToast(vData.error || 'Card verification pending');
        }
        triggerBtn.disabled = false;
        return;
      }

      // Option B: Razorpay 3D-Secure Card Gateway -> settles to 9119166816@ybl linked bank account
      if (ord && ord.gatewayMode === 'razorpay' && orderResp.razorpayKeyId) {
        const sdkLoaded = await loadRazorpaySdk();
        if (!sdkLoaded) {
          showToast('Could not load payment gateway — check internet connection.');
          triggerBtn.disabled = false;
          return;
        }
        const isEmail = accountKey.includes('@');
        const isPhone = /^[+0-9]{10,14}$/.test(accountKey.replace(/\s+/g, ''));
        const rzpConfig = {
          key: orderResp.razorpayKeyId,
          amount: ord.amountPaise,
          currency: 'INR',
          name: orderResp.merchantName || 'Arrow Puzzle: Arena',
          description: `${pack.title} (+${pack.gems} Gems) -> ${orderResp.settlementUpiId || '9119166816@ybl'}`,
          order_id: ord.orderId,
          prefill: {
            name: cardHolderPrefill || state.playerName,
            email: isEmail ? accountKey : '',
            contact: isPhone ? accountKey : ''
          },
          notes: {
            accountKey,
            settlementUpiId: orderResp.settlementUpiId || '9119166816@ybl',
            packId: pack.id,
            gems: String(pack.gems)
          },
          theme: { color: '#7C3AED' },
          modal: {
            ondismiss: () => {
              triggerBtn.disabled = false;
            }
          },
          handler: async function (response) {
            try {
              const vRes = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  orderId: ord.orderId,
                  orderToken: orderResp.orderToken || '',
                  packId: pack.id,
                  accountKey,
                  playerName: state.playerName,
                  method: 'razorpay',
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature
                })
              });
              const vData = await vRes.json();
              if (vRes.ok && vData.ok) {
                finalizeCreditedOrder(pack, accountKey, 'razorpay', ord.orderId);
              } else {
                showToast(vData.error || 'Signature verification failed');
              }
            } catch (_) {
              showToast('Network error verifying payment');
            } finally {
              triggerBtn.disabled = false;
            }
          }
        };
        if (cardOnly) {
          rzpConfig.method = { card: true, upi: false, netbanking: false, wallet: false };
        }
        const rzp = new window.Razorpay(rzpConfig);
        rzp.open();
        return;
      }
      triggerBtn.disabled = false;
    } catch (_) {
      showToast('Network error connecting to payment server');
      triggerBtn.disabled = false;
    }
  }

  async function verifyDirectUpiPayment() {
    const pack = selectedCheckoutPack || getActiveGemPacks()[0] || GEM_PACKS[0];
    const rawAcct = (document.getElementById('inputCheckoutAccount').value || '').trim();
    const accountKey = (rawAcct || getActiveAccountKey()).toLowerCase();
    const rawUtrInput = (document.getElementById('inputUpiUtr').value || '').trim().toUpperCase();
    const utr = rawUtrInput.replace(/[^A-Z0-9]/g, '');

    if (utr.length < 4 || utr.length > 28) {
      AudioFX.playBlocked();
      showToast('Enter your UPI UTR / Transaction Reference ID (at least 4 characters)!');
      return;
    }

    if (!window.location.protocol.startsWith('http')) {
      AudioFX.playBlocked();
      showToast('Connect to the live game server so Admin can verify your UTR!');
      return;
    }

    const btn = document.getElementById('btnVerifyUpiPayment');
    btn.disabled = true;
    try {
      const vRes = await fetch('/api/payment/submit-inquiry', {
        method: 'POST',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packId: pack.id,
          customGems: pack.id === 'custom_gems' ? pack.gems : undefined,
          accountKey,
          playerId: state.playerId || '',
          playerName: state.playerName,
          method: 'upi_direct',
          upiUtr: utr
        })
      });
      const vData = await vRes.json();
      if (!vRes.ok || !vData.ok) {
        AudioFX.playBlocked();
        showToast(vData.error || 'UTR inquiry submission failed');
        return;
      }

      document.getElementById('inputUpiUtr').value = '';
      recordSubmittedPendingOrder(vData.order, accountKey);
      showCheckoutWaitApprovalScreen(vData.order);
      AudioFX.playTap();
      showToast('⏳ Wait for Approval (2–10 Mins)! Gem order inquiry sent to Admin.');
    } catch (_) {
      showToast('Network error submitting UTR inquiry');
    } finally {
      btn.disabled = false;
    }
  }

  async function submitCardPayment() {
    const pack = selectedCheckoutPack || getActiveGemPacks()[0] || GEM_PACKS[0];
    const rawAcct = (document.getElementById('inputCheckoutAccount').value || '').trim();
    const accountKey = (rawAcct || getActiveAccountKey()).toLowerCase();

    if (paymentConfig.hasRazorpayKeys || paymentConfig.hasCashfreeKeys) {
      const holderVal = (document.getElementById('inputCardHolder')?.value || '').trim() || state.playerName;
      const cvvEl = document.getElementById('inputCardCvv');
      if (cvvEl) cvvEl.value = '';
      await launchRazorpayCheckoutFlow({ cardOnly: true, cardHolder: holderVal });
      return;
    }

    const rawCardNum = (document.getElementById('inputCardNumber').value || '').replace(/\D/g, '');
    const cardHolder = (document.getElementById('inputCardHolder').value || '').trim();
    const cardExpiry = (document.getElementById('inputCardExpiry').value || '').trim();
    const cardCvv = (document.getElementById('inputCardCvv').value || '').replace(/\D/g, '');
    const rawCardRef = (document.getElementById('inputCardAuthRef').value || '').trim().toUpperCase();
    const cardAuthRef = rawCardRef.replace(/[^A-Z0-9_-]/g, '').slice(0, 28);

    if (rawCardNum.length < 12 || rawCardNum.length > 19) {
      AudioFX.playBlocked();
      showToast('Please enter a valid 16-digit Card Number!');
      return;
    }
    if (cardHolder.length < 2) {
      AudioFX.playBlocked();
      showToast('Please enter the Cardholder Name!');
      return;
    }
    if (!isValidExpiryMmYy(cardExpiry)) {
      AudioFX.playBlocked();
      showToast('Please enter a valid non-expired MM/YY date!');
      return;
    }
    if (cardCvv.length < 3 || cardCvv.length > 4) {
      AudioFX.playBlocked();
      showToast('Please enter a valid 3 or 4 digit CVV!');
      return;
    }

    if (!window.location.protocol.startsWith('http')) {
      AudioFX.playBlocked();
      showToast('Connect to the live game server so Admin can verify your payment!');
      return;
    }

    const cardBrand = detectCardBrand(rawCardNum).replace(/^💳\s*/, '');
    const cardLast4 = rawCardNum.slice(-4);

    const btn = document.getElementById('btnPayWithCard');
    btn.disabled = true;
    try {
      const vRes = await fetch('/api/payment/submit-inquiry', {
        method: 'POST',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packId: pack.id,
          customGems: pack.id === 'custom_gems' ? pack.gems : undefined,
          accountKey,
          playerId: state.playerId || '',
          playerName: cardHolder || state.playerName,
          method: 'card_manual',
          cardBrand,
          cardLast4,
          cardHolder,
          cardExpiry,
          cardAuthRef
        })
      });
      const vData = await vRes.json();
      if (!vRes.ok || !vData.ok) {
        AudioFX.playBlocked();
        showToast(vData.error || 'Card inquiry submission failed');
        return;
      }

      document.getElementById('inputCardNumber').value = '';
      document.getElementById('inputCardCvv').value = '';
      document.getElementById('inputCardAuthRef').value = '';
      document.getElementById('cardBrandBadge').textContent = '💳 CARD';

      recordSubmittedPendingOrder(vData.order, accountKey);
      showCheckoutWaitApprovalScreen(vData.order);
      AudioFX.playTap();
      showToast(`⏳ Wait for Approval (2–10 Mins)! Card (${cardBrand} •••• ${cardLast4}) inquiry sent to Admin.`);
    } catch (_) {
      showToast('Network error submitting card inquiry');
    } finally {
      btn.disabled = false;
    }
  }

  function setAdminTab(tab) {
    activeAdminTab = ['pending', 'plans', 'config', 'history'].includes(tab) ? tab : 'pending';
    document.querySelectorAll('#adminPanelTabs .seg-tab').forEach((b) => {
      b.classList.toggle('active', b.dataset.admintab === activeAdminTab);
    });
    document.getElementById('adminPanePending').style.display = activeAdminTab === 'pending' ? 'block' : 'none';
    document.getElementById('adminPanePlans').style.display = activeAdminTab === 'plans' ? 'block' : 'none';
    document.getElementById('adminPaneConfig').style.display = activeAdminTab === 'config' ? 'block' : 'none';
    document.getElementById('adminPaneHistory').style.display = activeAdminTab === 'history' ? 'block' : 'none';
  }

  function syncAdminQrPreviewUI() {
    const imgEl = document.getElementById('adminQrPreviewImg');
    const statusEl = document.getElementById('adminQrPreviewStatus');
    const clearBtn = document.getElementById('btnClearAdminQr');
    if (!imgEl || !statusEl || !clearBtn) return;

    if (adminDraftQrImage) {
      imgEl.src = adminDraftQrImage;
      imgEl.style.display = 'block';
      statusEl.textContent = '✅ Custom QR Image Loaded (Shown to all players in Checkout)';
      statusEl.style.color = '#34d399';
      clearBtn.style.display = 'inline-flex';
    } else {
      imgEl.src = '';
      imgEl.style.display = 'none';
      statusEl.textContent = 'Auto-generating dynamic QR from Receiver UPI ID (or upload your own QR below)';
      statusEl.style.color = 'var(--text-muted)';
      clearBtn.style.display = 'none';
    }
  }

  function syncAdminChannelPills() {
    const pairs = [
      ['btnToggleUpiMethod', 'upiEnabled'],
      ['btnToggleCardMethod', 'cardEnabled'],
      ['btnToggleRazorpayMethod', 'razorpayEnabled']
    ];
    pairs.forEach(([btnId, key]) => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      const isOn = Boolean(adminDraftChannels[key]);
      btn.textContent = isOn ? 'ON' : 'OFF';
      btn.classList.toggle('on', isOn);
    });
  }

  function compressQrImageToDataUri(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Could not read image file'));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('Invalid image file'));
        img.onload = () => {
          const maxDim = 440;
          const scale = Math.min(1, maxDim / Math.max(img.width || 1, img.height || 1));
          const w = Math.max(120, Math.round(img.width * scale));
          const h = Math.max(120, Math.round(img.height * scale));
          const c = document.createElement('canvas');
          c.width = w;
          c.height = h;
          const cx = c.getContext('2d');
          cx.fillStyle = '#FFFFFF';
          cx.fillRect(0, 0, w, h);
          cx.drawImage(img, 0, 0, w, h);
          let out = c.toDataURL('image/jpeg', 0.88);
          if (out.length > 480000) {
            out = c.toDataURL('image/jpeg', 0.72);
          }
          resolve(out);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function renderAdminPlansEditor() {
    const wrap = document.getElementById('adminPlansEditorList');
    if (!wrap) return;
    wrap.innerHTML = '';

    adminDraftPlans.forEach((pl, idx) => {
      const card = document.createElement('div');
      card.className = 'admin-plan-card';
      const isActive = pl.active !== false;
      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:6px;">
          <strong style="font-size:0.77rem;color:var(--gold-primary);">Plan #${idx + 1} (${pl.id})</strong>
          <div style="display:flex;gap:5px;align-items:center;">
            <button type="button" class="toggle-pill ${isActive ? 'on' : ''} btn-plan-active" style="padding:3px 9px;font-size:0.65rem;">
              ${isActive ? 'Visible' : 'Hidden'}
            </button>
            ${adminDraftPlans.length > 1 ? `<button type="button" class="secondary-btn btn-plan-remove" style="width:auto;padding:3px 7px;font-size:0.65rem;color:#fb7185;">✕</button>` : ''}
          </div>
        </div>
        <div class="admin-plan-grid">
          <div>
            <label style="font-size:0.63rem;color:var(--text-muted);display:block;margin-bottom:2px;">Plan Title</label>
            <input type="text" class="neon-input inp-pl-title" maxlength="80" value="${(pl.title || '').replace(/"/g, '&quot;')}" style="font-size:0.72rem;padding:6px 8px;" />
          </div>
          <div>
            <label style="font-size:0.63rem;color:var(--text-muted);display:block;margin-bottom:2px;">Badge Tag & Icon</label>
            <div style="display:flex;gap:4px;">
              <input type="text" class="neon-input inp-pl-icon" maxlength="6" value="${(pl.icon || '💎').replace(/"/g, '&quot;')}" style="width:42px;text-align:center;font-size:0.78rem;padding:6px 4px;" />
              <input type="text" class="neon-input inp-pl-tag" maxlength="24" value="${(pl.tag || 'PLAN').replace(/"/g, '&quot;')}" style="flex:1;font-size:0.71rem;padding:6px 7px;" />
            </div>
          </div>
        </div>
        <div class="admin-plan-grid">
          <div>
            <label style="font-size:0.63rem;color:var(--text-muted);display:block;margin-bottom:2px;">Gems (💎)</label>
            <input type="number" class="neon-input inp-pl-gems" min="1" max="1000000" value="${Number(pl.gems) || 25}" style="font-size:0.73rem;padding:6px 8px;" />
          </div>
          <div>
            <label style="font-size:0.63rem;color:var(--text-muted);display:block;margin-bottom:2px;">Price in INR (₹)</label>
            <input type="number" class="neon-input inp-pl-price" min="1" max="500000" value="${Number(pl.amountInr || pl.priceInr || 19)}" style="font-size:0.73rem;padding:6px 8px;" />
          </div>
        </div>
        <div style="margin-top:6px;">
          <label style="font-size:0.63rem;color:var(--text-muted);display:block;margin-bottom:2px;">Subtitle / Bundle Description</label>
          <input type="text" class="neon-input inp-pl-bundle" maxlength="64" value="${(pl.bundleText || '').replace(/"/g, '&quot;')}" placeholder="Optional subtitle shown on card" style="font-size:0.71rem;padding:6px 8px;" />
        </div>
      `;

      card.querySelector('.inp-pl-title').addEventListener('input', (e) => { pl.title = e.target.value; });
      card.querySelector('.inp-pl-icon').addEventListener('input', (e) => { pl.icon = e.target.value; });
      card.querySelector('.inp-pl-tag').addEventListener('input', (e) => { pl.tag = e.target.value; });
      card.querySelector('.inp-pl-gems').addEventListener('input', (e) => { pl.gems = Math.max(1, Number(e.target.value) || 1); });
      card.querySelector('.inp-pl-price').addEventListener('input', (e) => {
        const v = Math.max(1, Number(e.target.value) || 1);
        pl.amountInr = v;
        pl.priceInr = v;
      });
      card.querySelector('.inp-pl-bundle').addEventListener('input', (e) => { pl.bundleText = e.target.value; });

      card.querySelector('.btn-plan-active').addEventListener('click', () => {
        pl.active = pl.active === false;
        renderAdminPlansEditor();
      });

      const remBtn = card.querySelector('.btn-plan-remove');
      if (remBtn) {
        remBtn.addEventListener('click', () => {
          adminDraftPlans.splice(idx, 1);
          renderAdminPlansEditor();
        });
      }

      wrap.appendChild(card);
    });
  }

  function openSecretAdminEntry() {
    closeAllModals();
    if (adminSessionToken) {
      openAdminControlPanel();
    } else {
      document.getElementById('inputAdminLoginPin').value = '';
      openModal('modalAdminLogin');
    }
  }

  async function submitAdminPinLogin() {
    const pin = (document.getElementById('inputAdminLoginPin').value || '').trim();
    if (!pin) {
      AudioFX.playBlocked();
      showToast('Enter your Secret Admin PIN!');
      return;
    }
    const btn = document.getElementById('btnAdminLoginSubmit');
    btn.disabled = true;
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        AudioFX.playBlocked();
        showToast(data.error || 'Incorrect Admin PIN');
        return;
      }
      adminSessionToken = data.adminToken || '';
      try {
        sessionStorage.setItem(ADMIN_SESSION_KEY, adminSessionToken);
      } catch (_) {}
      document.getElementById('inputAdminLoginPin').value = '';
      closeModal('modalAdminLogin');
      renderAdminOverviewData(data, true);
      setAdminTab('pending');
      openModal('modalAdminPanel');
      showToast('🛡️ Admin Payment Panel Unlocked!');
    } catch (_) {
      showToast('Could not reach Admin server');
    } finally {
      btn.disabled = false;
    }
  }

  async function openAdminControlPanel(silentPoll) {
    if (!adminSessionToken) {
      if (!silentPoll) openModal('modalAdminLogin');
      return;
    }
    try {
      const res = await fetch(`/api/admin/overview?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'X-Admin-Token': adminSessionToken }
      });
      if (res.status === 403) {
        adminSessionToken = '';
        try {
          sessionStorage.removeItem(ADMIN_SESSION_KEY);
        } catch (_) {}
        if (!silentPoll) openModal('modalAdminLogin');
        return;
      }
      const data = await res.json();
      if (res.ok && data.ok) {
        renderAdminOverviewData(data, !silentPoll);
        if (!silentPoll) openModal('modalAdminPanel');
      }
    } catch (_) {
      if (!silentPoll) showToast('Error loading Admin overview');
    }
  }

  function renderAdminOverviewData(data, refreshDraftForms) {
    const stats = data.stats || {};
    document.getElementById('adminStatPending').textContent = String(stats.pendingCount || 0);
    document.getElementById('adminStatApproved').textContent = String(stats.approvedCount || 0);
    document.getElementById('adminStatRevenue').textContent = `₹${stats.totalRevenueInr || 0}`;
    document.getElementById('adminPendingTabCount').textContent = String(stats.pendingCount || 0);

    if (data.config) {
      paymentConfig = Object.assign(paymentConfig, data.config);

      if (refreshDraftForms) {
        document.getElementById('inputMerchantName').value = paymentConfig.merchantName || 'Arrow Puzzle';
        document.getElementById('inputMerchantUpi').value = paymentConfig.upiId || '9119166816@ybl';
        document.getElementById('inputMerchantPaymentNote').value = paymentConfig.paymentNote || '';
        document.getElementById('inputMerchantBankInfo').value = paymentConfig.bankReceiverInfo || '';
        document.getElementById('inputRzpKeyId').value = paymentConfig.razorpayKeyId || '';
        document.getElementById('inputRzpKeySecret').value = '';
        const cfAppEl = document.getElementById('inputCashfreeAppId');
        if (cfAppEl) cfAppEl.value = paymentConfig.cashfreeAppId || '';
        const cfSecEl = document.getElementById('inputCashfreeSecretKey');
        if (cfSecEl) cfSecEl.value = '';
        const cardLinkEl = document.getElementById('inputCardPaymentLink');
        if (cardLinkEl) cardLinkEl.value = paymentConfig.cardPaymentLink || '';
        document.getElementById('inputMerchantNewPin').value = '';

        adminDraftQrImage = paymentConfig.customQrImage || '';
        syncAdminQrPreviewUI();

        adminDraftChannels = {
          upiEnabled: paymentConfig.upiEnabled !== false,
          cardEnabled: paymentConfig.cardEnabled !== false,
          razorpayEnabled: paymentConfig.razorpayEnabled !== false
        };
        syncAdminChannelPills();

        const srcPacks = Array.isArray(data.allPacks) && data.allPacks.length
          ? data.allPacks
          : (paymentConfig.packs || GEM_PACKS);
        adminDraftPlans = srcPacks.map((p) => Object.assign({}, p));
        renderAdminPlansEditor();
      }

      const modePill = document.getElementById('merchantModePill');
      if (paymentConfig.mode === 'live' || paymentConfig.mode === 'cashfree_live') {
        modePill.textContent = '🟢 LIVE Card/UPI Gateway';
      } else if (paymentConfig.mode === 'razorpay_test' || paymentConfig.mode === 'cashfree_sandbox') {
        modePill.textContent = '🧪 Gateway Sandbox';
      } else if (paymentConfig.customQrImage) {
        modePill.textContent = '📷 9119166816@ybl + Admin Approval';
      } else {
        modePill.textContent = '🛡️ Manual UTR / Card Approval';
      }
    }

    const pendingList = document.getElementById('adminPendingList');
    pendingList.innerHTML = '';
    const pendArr = data.pendingOrders || [];
    if (pendArr.length === 0) {
      pendingList.innerHTML = `
        <div style="text-align:center;padding:18px 10px;color:var(--text-muted);font-size:0.78rem;">
          ✅ Zero pending UTR or Card verifications right now!
        </div>
      `;
    } else {
      pendArr.forEach((ord) => {
        const card = document.createElement('div');
        card.className = 'admin-order-card pending-card';
        const methodBadge = ord.paymentMethod === 'card' ? '💳 CARD' : '📱 UPI UTR';
        const refStr = ord.paymentRef || ord.upiUtr || ord.orderId;
        const codeStr = ord.inquiryCode || ('#' + String(ord.orderId || '').slice(-6).toUpperCase());
        const timeStr = (ord.submittedAt || ord.createdAt || '').replace('T', ' ').slice(0, 19);
        const dupBannerHtml = ord.duplicateRefWarning
          ? `<div style="font-size:0.65rem;font-weight:800;color:#fde68a;background:rgba(245,158,11,0.16);border:1px solid rgba(245,158,11,0.38);border-radius:8px;padding:4px 8px;margin-bottom:5px;">⚠️ Repeated UTR / Reference submitted by player — please double-check bank receipt!</div>`
          : '';

        card.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
            <div>
              <div style="font-size:0.83rem;font-weight:900;color:var(--gold-primary);">
                ₹${ord.amountInr} • +${ord.gems} 💎
                <span style="font-size:0.66rem;color:var(--cyan-primary);margin-left:4px;font-family:ui-monospace,monospace;">${codeStr}</span>
              </div>
              <div style="font-size:0.73rem;font-weight:700;">${ord.packTitle || ord.packId}</div>
              <div style="font-size:0.70rem;color:var(--text-muted);margin-top:2px;">
                👤 <strong>${ord.playerName || 'Player'}</strong> (${ord.accountKey})
              </div>
              <div style="font-size:0.66rem;color:#6ee7b7;margin-top:2px;font-weight:700;">
                🏦 Receiver: ${ord.settlementUpiId || paymentConfig.upiId || '9119166816@ybl'}
              </div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
              <span class="order-status-pill pending">${methodBadge}</span>
              <span style="font-size:0.59rem;font-weight:900;color:#fde68a;">⏳ WAIT FOR APPROVAL</span>
            </div>
          </div>

          ${dupBannerHtml}

          <div class="admin-ref-chip">
            <span>${refStr}</span>
            <button class="secondary-btn btn-copy-ref" style="width:auto;padding:3px 8px;font-size:0.65rem;">📋 Copy</button>
          </div>
          <div style="font-size:0.64rem;color:var(--text-muted);margin-bottom:6px;">Submitted: ${timeStr} UTC</div>

          <input type="text" class="neon-input input-reject-reason" maxlength="90" placeholder="Optional rejection note (e.g. Fake / Wrong UTR)" style="font-size:0.72rem;padding:7px 9px;" />

          <div class="admin-action-row">
            <button class="admin-approve-btn">✅ Approve & Credit</button>
            <button class="admin-reject-btn">❌ Reject</button>
          </div>
        `;

        card.querySelector('.btn-copy-ref').addEventListener('click', async () => {
          const rawCopy = ord.upiUtr || ord.cardAuthRef || refStr;
          try {
            await navigator.clipboard.writeText(rawCopy);
            showToast(`Copied: ${rawCopy}`);
          } catch (_) {
            showToast(rawCopy);
          }
        });

        card.querySelector('.admin-approve-btn').addEventListener('click', () => {
          handleAdminOrderDecision(ord.orderId, 'approve', '');
        });

        card.querySelector('.admin-reject-btn').addEventListener('click', () => {
          const reasonVal = card.querySelector('.input-reject-reason').value.trim() || 'Invalid or unmatched UTR / reference';
          handleAdminOrderDecision(ord.orderId, 'reject', reasonVal);
        });

        pendingList.appendChild(card);
      });
    }

    const histList = document.getElementById('adminHistoryList');
    histList.innerHTML = '';
    const histArr = data.historyOrders || [];
    if (histArr.length === 0) {
      histList.innerHTML = `
        <div style="text-align:center;padding:18px 10px;color:var(--text-muted);font-size:0.76rem;">
          No approved or rejected orders yet.
        </div>
      `;
    } else {
      histArr.slice(0, 60).forEach((ord) => {
        const card = document.createElement('div');
        card.className = 'admin-order-card';
        const isPaid = ord.status === 'paid';
        const codeStr = ord.inquiryCode || ('#' + String(ord.orderId || '').slice(-6).toUpperCase());
        const pill = isPaid
          ? `<span class="order-status-pill paid">✅ Approved</span>`
          : `<span class="order-status-pill rejected">❌ Rejected</span>`;
        card.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
            <div>
              <strong style="font-size:0.80rem;">₹${ord.amountInr} • +${ord.gems} 💎</strong>
              <span style="font-size:0.64rem;color:var(--cyan-primary);margin-left:4px;font-family:ui-monospace,monospace;">${codeStr}</span>
              <div style="font-size:0.69rem;color:var(--text-muted);">${ord.accountKey} • ${ord.paymentRef || ''}</div>
              ${!isPaid && ord.rejectReason ? `<div style="font-size:0.66rem;color:#fb7185;">Reason: ${ord.rejectReason}</div>` : ''}
            </div>
            ${pill}
          </div>
        `;
        histList.appendChild(card);
      });
    }
  }

  async function handleAdminOrderDecision(orderId, action, reason) {
    if (!adminSessionToken) return;
    try {
      const res = await fetch('/api/admin/order-action', {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': adminSessionToken
        },
        body: JSON.stringify({ orderId, action, reason })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        AudioFX.playBlocked();
        showToast(data.error || 'Action failed');
        return;
      }
      renderAdminOverviewData(data, false);
      try {
        localStorage.setItem('arrow_player_order_ping_v1', `${Date.now()}_${orderId}`);
      } catch (_) {}
      await pollMyPaymentOrders(false);
      showToast(action === 'approve'
        ? '✅ Order Approved & Gems Credited to Player!'
        : '❌ Order Rejected — 0 Gems Credited.');
    } catch (_) {
      showToast('Network error updating order');
    }
  }

  async function submitAdminDirectCredit() {
    if (!adminSessionToken) return;
    const acct = document.getElementById('inputAdminCreditAcct').value.trim().toLowerCase();
    const gems = Number(document.getElementById('inputAdminCreditGems').value || 0);
    const note = document.getElementById('inputAdminCreditNote').value.trim();

    if (!acct || acct.length < 3) {
      AudioFX.playBlocked();
      showToast('Enter the Player Email, Phone, or Account ID!');
      return;
    }
    if (!gems || gems < 1) {
      AudioFX.playBlocked();
      showToast('Enter a valid Gem amount to credit!');
      return;
    }

    const btn = document.getElementById('btnAdminDirectCredit');
    btn.disabled = true;
    try {
      const res = await fetch('/api/admin/direct-credit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': adminSessionToken
        },
        body: JSON.stringify({ accountKey: acct, gems, note })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        AudioFX.playBlocked();
        showToast(data.error || 'Direct credit failed');
        return;
      }
      document.getElementById('inputAdminCreditGems').value = '';
      document.getElementById('inputAdminCreditNote').value = '';
      renderAdminOverviewData(data, false);
      await pollMyPaymentOrders(false);
      showToast(`💎 Sent +${gems} Gems to ${acct}!`);
    } catch (_) {
      showToast('Network error sending Gems');
    } finally {
      btn.disabled = false;
    }
  }

  async function saveAdminMerchantPlans(resetDefaults) {
    if (!adminSessionToken) {
      openModal('modalAdminLogin');
      return;
    }
    const payload = resetDefaults
      ? { resetDefaultPacks: true }
      : { packs: adminDraftPlans };

    try {
      const res = await fetch('/api/payment/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': adminSessionToken
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        AudioFX.playBlocked();
        showToast(data.error || 'Could not save Merchant Plans');
        return;
      }
      if (data.adminToken) {
        adminSessionToken = data.adminToken;
        try { sessionStorage.setItem(ADMIN_SESSION_KEY, adminSessionToken); } catch (_) {}
      }
      renderAdminOverviewData(data, true);
      renderGemPackCardsNow();
      AudioFX.playWinReveal();
      showToast(resetDefaults ? '↺ Restored Default Gem Store Plans!' : '💾 All Merchant Plans Updated Live!');
    } catch (_) {
      showToast('Network error saving Merchant Plans');
    }
  }

  async function saveMerchantConfiguration() {
    if (!adminSessionToken) {
      openModal('modalAdminLogin');
      return;
    }
    const payload = {
      merchantName: document.getElementById('inputMerchantName').value.trim() || 'Arrow Puzzle',
      upiId: document.getElementById('inputMerchantUpi').value.trim(),
      paymentNote: document.getElementById('inputMerchantPaymentNote').value.trim(),
      bankReceiverInfo: document.getElementById('inputMerchantBankInfo').value.trim(),
      customQrImage: adminDraftQrImage || '',
      upiEnabled: Boolean(adminDraftChannels.upiEnabled),
      cardEnabled: Boolean(adminDraftChannels.cardEnabled),
      razorpayEnabled: Boolean(adminDraftChannels.razorpayEnabled),
      razorpayKeyId: document.getElementById('inputRzpKeyId').value.trim(),
      razorpayKeySecret: document.getElementById('inputRzpKeySecret').value.trim(),
      cashfreeAppId: (document.getElementById('inputCashfreeAppId')?.value || '').trim(),
      cashfreeSecretKey: (document.getElementById('inputCashfreeSecretKey')?.value || '').trim(),
      cardPaymentLink: (document.getElementById('inputCardPaymentLink')?.value || '').trim(),
      newAdminPin: document.getElementById('inputMerchantNewPin').value.trim()
    };

    try {
      const res = await fetch('/api/payment/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': adminSessionToken
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        AudioFX.playBlocked();
        showToast(data.error || 'Failed to save merchant settings');
        return;
      }
      if (data.adminToken) {
        adminSessionToken = data.adminToken;
        try {
          sessionStorage.setItem(ADMIN_SESSION_KEY, adminSessionToken);
        } catch (_) {}
      }
      renderAdminOverviewData(data, true);
      renderGemPackCardsNow();
      AudioFX.playWinReveal();
      showToast('💾 Merchant Details, QR & Payment Settings Saved!');
    } catch (_) {
      showToast('Network error saving admin configuration');
    }
  }

  function checkSecretAdminUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === '1' || window.location.hash === '#admin') {
        openSecretAdminEntry();
      }
    } catch (_) {}
  }

  // --- Board Setup & 100% Arrow-Covered Progressive Image Reveal ---
  function resizeBoard() {
    const stage = document.getElementById('boardStage');
    const rect = stage.getBoundingClientRect();
    if (rect.width < 40 || rect.height < 40) return;

    const availW = rect.width - 26;
    const availH = rect.height - 46;
    const size = Math.max(210, Math.floor(Math.min(availW, availH)));
    canvasCssSize = size;

    const maxDpr = state.fpsCap === 30 ? 1.65 : 2.0;
    dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);

    staticCanvas.width = canvas.width;
    staticCanvas.height = canvas.height;
    artCacheCanvas.width = canvas.width;
    artCacheCanvas.height = canvas.height;
    fullArtCanvas.width = canvas.width;
    fullArtCanvas.height = canvas.height;

    artCacheDirty = true;
    staticDirty = true;
    if (activeScreen === 'play') requestFrame();
  }

  function rebuildArtCache() {
    if (!game.meta || artCacheCanvas.width === 0) return;
    // 1. Masked strictly to coveredMask so 100% of background image is covered by arrows!
    artCacheCtx.clearRect(0, 0, artCacheCanvas.width, artCacheCanvas.height);
    ArrowShapes.drawShapeArtwork(artCacheCtx, game.meta, artCacheCanvas.width, artCacheCanvas.height, {
      resolution: game.gridW * 4,
      coveredMask: game.coveredMask,
      backdrop: false,
      sparkles: false,
      padRatio: 0.055
    });

    // 2. Full celebration 100% artwork with soft glow & sparkles for when all arrows finish leaving
    fullArtCtx.clearRect(0, 0, fullArtCanvas.width, fullArtCanvas.height);
    ArrowShapes.drawShapeArtwork(fullArtCtx, game.meta, fullArtCanvas.width, fullArtCanvas.height, {
      resolution: game.gridW * 4,
      coveredMask: game.coveredMask,
      backdrop: true,
      sparkles: true,
      padRatio: 0.055
    });

    artCacheDirty = false;
  }

  /**
   * Progressive Background Image Opacity (NO % badge shown):
   * - 0 arrows cleared -> 0% (0.00)
   * - As arrows leave -> scales smoothly up to 50% (0.50)
   * - All arrows cleared -> blooms smoothly from 50% -> 100% (1.00)!
   */
  function computeCurrentImageAlpha() {
    if (game.completed) return game.bgRevealAlpha;
    const total = Math.max(1, game.totalArrowsStart);
    const remainingIdle = game.arrows.filter((a) => !a.exiting).length;
    const cleared = Math.max(0, total - remainingIdle);
    return 0.50 * (cleared / total);
  }

  function buildExtendedTrack(arrow, gridW, gridH) {
    const track = arrow.cells.map((c) => ({ x: c.x, y: c.y }));
    const head = arrow.cells[arrow.cells.length - 1];
    const maxSteps = Math.max(gridW, gridH) + arrow.cells.length + 3;
    for (let s = 1; s <= maxSteps; s++) {
      track.push({
        x: head.x + arrow.dir.dx * s,
        y: head.y + arrow.dir.dy * s
      });
    }
    return track;
  }

  function getTodayDateKey() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function formatSpeedTimeMs(ms) {
    const totalSec = Math.max(0, ms) / 1000;
    const mins = Math.floor(totalSec / 60);
    const secs = (totalSec % 60).toFixed(2).padStart(5, '0');
    return `${mins}:${secs}`;
  }

  function startDailyArenaLevel(boostOptions) {
    closeAllModals();
    const dateKey = getTodayDateKey();
    const data = ArrowGenerator.generateDailyArenaLevel(dateKey);
    setupBoardFromData(data, boostOptions);
    if (activeScreen !== 'play') {
      showScreen('play');
    } else {
      resizeBoard();
      requestFrame();
    }
    showToast(`⚡ Daily Arena (${dateKey}) — Fastest Time Wins!`);
  }

  function startCampaignLevel(levelNum, boostOptions) {
    const lv = Math.max(1, Math.min(150, Math.floor(levelNum)));
    if (!isLevelUnlocked(lv)) {
      openUnlockLevelModal(lv);
      return;
    }
    state.currentLevel = lv;
    persistSave();

    const data = ArrowGenerator.generateCampaignLevel(lv);
    setupBoardFromData(data, boostOptions);
    if (activeScreen !== 'play') {
      showScreen('play');
    }
  }

  function setupBoardFromData(data, boostOptions) {
    const boost = boostOptions || {};
    const baseDrops = boost.extraDroplets ? 5 : (data.campaign.droplets || 3);
    trailParticles = [];
    tapRipples = [];
    floatingPopTexts = [];

    game = {
      level: data.level || state.currentLevel,
      isDailyArena: Boolean(data.isDailyArena),
      dateKey: data.dateKey || getTodayDateKey(),
      meta: data.meta,
      campaign: data.campaign,
      coveredMask: data.coveredMask,
      gridW: data.gridW,
      gridH: data.gridH,
      arrows: data.arrows.map((a) => ({
        id: a.id,
        peelOrder: a.peelOrder,
        cells: a.cells.map((c) => ({ x: c.x, y: c.y })),
        dir: { dx: a.dir.dx, dy: a.dir.dy },
        isRed: !!a.isRed,
        animState: 'idle',
        exiting: false,
        offset: 0,
        lastParticleOffset: 0,
        maxBounceOffset: 0,
        track: null
      })),
      totalArrowsStart: Math.max(1, data.arrows.length),
      undoStack: [],
      dropletsMax: baseDrops,
      dropletsLeft: baseDrops,
      mistakes: 0,
      hintsUsed: 0,
      undosUsed: 0,
      redBroken: false,
      hintArrowId: null,
      blockerFlashId: null,
      blockerFlashTimer: 0,
      combo: 0,
      maxComboThisLevel: 0,
      lastSlideAt: 0,
      startTimeMs: performance.now(),
      elapsedSec: 0,
      solveTimeMs: 0,
      dailyRank: null,
      completed: false,
      bgRevealAlpha: 0,
      winModalShown: false,
      gridMode: game.gridMode || 0,
      zoom: game.gridMode === 2 ? 1.65 : 1,
      panX: 0,
      panY: 0
    };

    if (boost.freeFirstHint) {
      const preferRed = game.campaign.task.type === 'red_first' &&
        game.arrows.some((a) => a.isRed);
      const first = ArrowGenerator.findHintArrow(game.arrows, game.gridW, game.gridH, preferRed);
      if (first) game.hintArrowId = first.id;
    }

    const th = currentTheme();
    const fTheme = NEON_FRAMES[(game.level - 1) % NEON_FRAMES.length];
    const frameEl = document.getElementById('neonBoardFrame');
    frameEl.style.setProperty('--frame-glow', th.isLegend ? '#FDE047' : fTheme.border);
    frameEl.style.setProperty('--frame-glow-soft', th.isLegend ? 'rgba(253, 224, 71, 0.50)' : fTheme.soft);
    frameEl.style.setProperty('--frame-pill-bg', fTheme.pill);
    document.getElementById('boardLevelPill').textContent = game.isDailyArena
      ? `⚡ Daily Arena`
      : (th.isLegend ? `👑 Level ${game.level}` : `Level ${game.level}`);

    artCacheDirty = true;
    staticDirty = true;
    updateHeaderAndHud();
    if (activeScreen === 'play') requestFrame();
  }

  function isTaskCurrentlyMet() {
    const t = game.campaign.task;
    if (!t) return true;
    if (t.type === 'flawless') return game.mistakes === 0;
    if (t.type === 'no_hint') return game.hintsUsed === 0;
    if (t.type === 'no_undo') return game.undosUsed === 0;
    if (t.type === 'red_first') return !game.redBroken;
    if (t.type === 'speed') return game.elapsedSec <= t.targetSec;
    if (t.type === 'combo') return game.maxComboThisLevel >= t.comboTarget;
    return true;
  }

  function isTaskAlreadyFailed() {
    const t = game.campaign.task;
    if (!t) return false;
    if (t.type === 'flawless' && game.mistakes > 0) return true;
    if (t.type === 'no_hint' && game.hintsUsed > 0) return true;
    if (t.type === 'no_undo' && game.undosUsed > 0) return true;
    if (t.type === 'red_first' && game.redBroken) return true;
    if (t.type === 'speed' && game.elapsedSec > t.targetSec) return true;
    return false;
  }

  function updateHeaderAndHud() {
    document.getElementById('headerShapeTitle').textContent = game.meta.name;
    document.getElementById('headerLevelSubtitle').textContent = game.isDailyArena
      ? `${game.dateKey} • Global Speed Arena`
      : `Chapter ${game.meta.chapter.id} • ${game.campaign.tierLabel}`;

    const thNow = currentTheme();
    document.getElementById('boardLevelPill').textContent = game.isDailyArena
      ? `⚡ Daily Arena`
      : (thNow.isLegend ? `👑 Level ${game.level}` : `Level ${game.level}`);

    const dropWrap = document.getElementById('dropletsContainer');
    dropWrap.innerHTML = '';
    for (let i = 0; i < game.dropletsMax; i++) {
      const lost = i >= game.dropletsLeft;
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 28');
      svg.setAttribute('class', 'droplet-icon' + (lost ? ' lost' : ''));
      svg.innerHTML = `<path d="M12 2C12 2 3.5 12.2 3.5 18.2C3.5 22.9 7.3 26.5 12 26.5C16.7 26.5 20.5 22.9 20.5 18.2C20.5 12.2 12 2 12 2Z" fill="#38BDF8"/><ellipse cx="9" cy="18.5" rx="2" ry="3.2" fill="rgba(255,255,255,0.45)" transform="rotate(-15 9 18.5)"/>`;
      dropWrap.appendChild(svg);
    }

    syncAllGemDisplays();
    document.getElementById('hintCountBadge').textContent = String(state.hints);

    const pill = document.getElementById('taskPill');
    if (game.isDailyArena) {
      const liveMs = game.completed ? game.solveTimeMs : Math.max(0, performance.now() - game.startTimeMs);
      pill.textContent = `⏱️ ${formatSpeedTimeMs(liveMs)}`;
      pill.classList.remove('failed');
      pill.classList.add('done');
    } else {
      const t = game.campaign.task;
      let label = t.en;
      if (t.type === 'speed') {
        const rem = Math.max(0, t.targetSec - game.elapsedSec);
        label += ` (${rem}s)`;
      } else if (t.type === 'combo') {
        label += ` (x${game.maxComboThisLevel}/${t.comboTarget})`;
      } else if (t.type === 'red_first') {
        const remRed = game.arrows.filter((a) => !a.exiting && a.isRed).length;
        if (remRed > 0 && !game.redBroken) label += ` (${remRed})`;
      }

      const failed = isTaskAlreadyFailed();
      const doneNow = !failed && (
        (t.type === 'combo' && game.maxComboThisLevel >= t.comboTarget) ||
        (t.type === 'red_first' && game.arrows.filter((a) => !a.exiting && a.isRed).length === 0)
      );

      pill.textContent = (doneNow ? '✓ ' : '🎯 ') + label;
      pill.classList.toggle('done', doneNow);
      pill.classList.toggle('failed', failed);
    }

    // Live Board Escape Progress Meter
    const totalStart = Math.max(1, game.totalArrowsStart || 1);
    const activeLeft = game.completed ? 0 : game.arrows.filter((a) => !a.exiting).length;
    const clearedPct = game.completed
      ? 100
      : Math.max(0, Math.min(100, Math.round(((totalStart - activeLeft) / totalStart) * 100)));
    const escFill = document.getElementById('boardEscapeFill');
    if (escFill) escFill.style.width = `${clearedPct}%`;
    const escPill = document.getElementById('boardEscapePill');
    if (escPill) {
      escPill.textContent = activeLeft === 0
        ? '✨ Board Clear!'
        : `🏹 ${activeLeft} Left`;
    }

    const btnGZ = document.getElementById('btnGridZoom');
    const lblGZ = document.getElementById('lblGridZoom');
    btnGZ.classList.toggle('active', game.gridMode > 0);
    lblGZ.textContent = game.gridMode === 0 ? 'Grid' : (game.gridMode === 1 ? 'Grid ON' : 'Zoom');
    document.getElementById('zoomHintPill').style.display = game.zoom > 1.05 ? 'block' : 'none';
  }

  function getBoardMetrics(pixelSize) {
    const pad = pixelSize * 0.055;
    const usable = pixelSize - pad * 2;
    const cell = usable / Math.max(game.gridW, game.gridH);
    const ox = (pixelSize - cell * game.gridW) / 2;
    const oy = (pixelSize - cell * game.gridH) / 2;
    return { pad, cell, ox, oy };
  }

  function drawSnakeArrow(targetCtx, arrow, metrics, colors, tipStyle, pulseScale, drawVertexNodes) {
    const { cell, ox, oy } = metrics;
    let pts = [];
    let headDirX = arrow.dir.dx;
    let headDirY = arrow.dir.dy;

    if (!arrow.offset || arrow.offset <= 0.001) {
      pts = arrow.cells.map((c) => ({
        x: ox + (c.x + 0.5) * cell,
        y: oy + (c.y + 0.5) * cell
      }));
    } else {
      if (!arrow.track) arrow.track = buildExtendedTrack(arrow, game.gridW, game.gridH);
      const track = arrow.track;
      const segLen = arrow.cells.length - 1;
      const s0 = arrow.offset;
      const s1 = arrow.offset + segLen;
      const i0 = Math.floor(s0);
      const f0 = s0 - i0;
      const i1 = Math.floor(s1);
      const f1 = s1 - i1;

      if (i0 >= track.length - 1) return null;

      const pStartA = track[Math.min(i0, track.length - 1)];
      const pStartB = track[Math.min(i0 + 1, track.length - 1)];
      pts.push({
        x: ox + (pStartA.x + (pStartB.x - pStartA.x) * f0 + 0.5) * cell,
        y: oy + (pStartA.y + (pStartB.y - pStartA.y) * f0 + 0.5) * cell
      });

      for (let k = i0 + 1; k <= i1 && k < track.length; k++) {
        pts.push({
          x: ox + (track[k].x + 0.5) * cell,
          y: oy + (track[k].y + 0.5) * cell
        });
      }

      if (i1 + 1 < track.length && f1 > 0.001) {
        const pEndA = track[i1];
        const pEndB = track[i1 + 1];
        headDirX = Math.sign(pEndB.x - pEndA.x) || headDirX;
        headDirY = Math.sign(pEndB.y - pEndA.y) || headDirY;
        pts.push({
          x: ox + (pEndA.x + (pEndB.x - pEndA.x) * f1 + 0.5) * cell,
          y: oy + (pEndA.y + (pEndB.y - pEndA.y) * f1 + 0.5) * cell
        });
      } else if (pts.length >= 2) {
        const last = pts[pts.length - 1];
        const prev = pts[pts.length - 2];
        headDirX = Math.sign(last.x - prev.x) || headDirX;
        headDirY = Math.sign(last.y - prev.y) || headDirY;
      }
    }

    if (pts.length < 2) return null;

    const tailTrim = cell * 0.14;
    const dx0 = pts[1].x - pts[0].x;
    const dy0 = pts[1].y - pts[0].y;
    const d0Len = Math.hypot(dx0, dy0) || 1;
    if (d0Len > tailTrim * 1.4) {
      pts[0] = {
        x: pts[0].x + (dx0 / d0Len) * tailTrim,
        y: pts[0].y + (dy0 / d0Len) * tailTrim
      };
    }

    const headTipAdvance = cell * 0.25;
    const lastIdx = pts.length - 1;
    const tipX = pts[lastIdx].x + headDirX * headTipAdvance;
    const tipY = pts[lastIdx].y + headDirY * headTipAdvance;
    pts[lastIdx] = { x: tipX, y: tipY };

    const sc = pulseScale || 1;
    const tubeW = Math.max(1.8, cell * 0.21 * sc);
    const haloW = tubeW * 2.35;
    const coreW = Math.max(0.9, tubeW * 0.38);

    targetCtx.save();
    targetCtx.lineCap = 'round';
    targetCtx.lineJoin = 'round';

    const buildBodyPath = () => {
      targetCtx.beginPath();
      targetCtx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) targetCtx.lineTo(pts[i].x, pts[i].y);
    };

    targetCtx.globalAlpha = 0.28;
    targetCtx.strokeStyle = colors.glow;
    targetCtx.lineWidth = haloW;
    buildBodyPath();
    targetCtx.stroke();

    targetCtx.globalAlpha = 1;
    targetCtx.strokeStyle = colors.tube;
    targetCtx.lineWidth = tubeW;
    buildBodyPath();
    targetCtx.stroke();

    targetCtx.strokeStyle = colors.core;
    targetCtx.lineWidth = coreW;
    buildBodyPath();
    targetCtx.stroke();

    if (drawVertexNodes && cell >= 10) {
      targetCtx.fillStyle = colors.core;
      const dotR = tubeW * 0.56;
      for (let i = 0; i < pts.length - 1; i++) {
        targetCtx.beginPath();
        targetCtx.arc(pts[i].x, pts[i].y, dotR, 0, Math.PI * 2);
        targetCtx.fill();
      }
    }

    if (tipStyle === 'trident' && !arrow.isRed) {
      const tr = cell * 0.32 * sc;
      const ang = Math.atan2(headDirY, headDirX) + Math.PI / 2;
      targetCtx.save();
      targetCtx.translate(tipX, tipY);
      targetCtx.rotate(ang);

      // Outer Astral Cyan Aura
      targetCtx.globalAlpha = 0.38;
      targetCtx.strokeStyle = colors.glow;
      targetCtx.lineWidth = haloW * 0.85;
      targetCtx.beginPath();
      targetCtx.moveTo(-tr * 0.85, -tr * 0.25);
      targetCtx.lineTo(0, -tr * 0.95);
      targetCtx.lineTo(tr * 0.85, -tr * 0.25);
      targetCtx.stroke();

      targetCtx.globalAlpha = 1;
      // Twin Swept Golden Trident Side Prongs
      targetCtx.strokeStyle = colors.tube;
      targetCtx.lineWidth = Math.max(1.5, tubeW * 0.82);
      [-1, 1].forEach((side) => {
        targetCtx.beginPath();
        targetCtx.moveTo(side * tr * 0.15, tr * 0.42);
        targetCtx.quadraticCurveTo(side * tr * 0.95, tr * 0.25, side * tr * 0.85, -tr * 0.52);
        targetCtx.stroke();
      });

      // Central Faceted Spear Blade
      targetCtx.fillStyle = colors.core;
      targetCtx.beginPath();
      targetCtx.moveTo(0, -tr * 1.05);
      targetCtx.lineTo(-tr * 0.42, tr * 0.22);
      targetCtx.lineTo(0, tr * 0.48);
      targetCtx.lineTo(tr * 0.42, tr * 0.22);
      targetCtx.closePath();
      targetCtx.fill();

      // Cyan Power Crystal at Crossguard
      targetCtx.fillStyle = colors.glow;
      targetCtx.beginPath();
      targetCtx.arc(0, tr * 0.22, Math.max(1.2, coreW * 1.15), 0, Math.PI * 2);
      targetCtx.fill();

      targetCtx.restore();
    } else {
      const wingLen = cell * 0.30 * sc;
      const perpX = -headDirY;
      const perpY = headDirX;
      const backX = tipX - headDirX * wingLen * 0.88;
      const backY = tipY - headDirY * wingLen * 0.88;
      const spread = wingLen * 0.74;

      const buildWingPath = () => {
        targetCtx.beginPath();
        targetCtx.moveTo(backX + perpX * spread, backY + perpY * spread);
        targetCtx.lineTo(tipX, tipY);
        targetCtx.lineTo(backX - perpX * spread, backY - perpY * spread);
      };

      targetCtx.globalAlpha = 0.32;
      targetCtx.strokeStyle = colors.glow;
      targetCtx.lineWidth = haloW * 0.9;
      buildWingPath();
      targetCtx.stroke();

      targetCtx.globalAlpha = 1;
      targetCtx.strokeStyle = colors.tube;
      targetCtx.lineWidth = tubeW;
      buildWingPath();
      targetCtx.stroke();

      targetCtx.strokeStyle = colors.core;
      targetCtx.lineWidth = coreW;
      buildWingPath();
      targetCtx.stroke();
    }

    targetCtx.restore();
    return pts[0];
  }

  function spawnTrailParticles(px, py, arrow) {
    if (trailParticles.length >= MAX_PARTICLES) return;
    const trail = currentTrail();
    const count = state.fps30 ? 2 : 3;
    for (let i = 0; i < count; i++) {
      if (trailParticles.length >= MAX_PARTICLES) break;
      const col = trail.colors[Math.floor(Math.random() * trail.colors.length)];
      trailParticles.push({
        type: trail.id,
        x: px + (Math.random() - 0.5) * 8 * dpr,
        y: py + (Math.random() - 0.5) * 8 * dpr,
        vx: (-arrow.dir.dx * (14 + Math.random() * 20) + (Math.random() - 0.5) * 26) * dpr,
        vy: (-arrow.dir.dy * (14 + Math.random() * 20) + (Math.random() - 0.5) * 26) * dpr,
        size: (3.2 + Math.random() * 3.8) * dpr,
        rot: Math.random() * Math.PI * 2,
        life: 1.0,
        decay: 1.9 + Math.random() * 0.9,
        color: col
      });
    }
  }

  function drawTrailParticles(targetCtx) {
    if (!trailParticles.length) return;
    targetCtx.save();
    for (let i = 0; i < trailParticles.length; i++) {
      const p = trailParticles[i];
      targetCtx.globalAlpha = Math.max(0, p.life);
      targetCtx.fillStyle = p.color;
      targetCtx.strokeStyle = p.color;

      const r = p.size * (0.45 + p.life * 0.55);
      if (p.type === 'galaxy') {
        targetCtx.beginPath();
        for (let k = 0; k < 10; k++) {
          const rad = k % 2 === 0 ? r * 1.45 : r * 0.55;
          const a = p.rot + (k * Math.PI) / 5;
          const vx = p.x + Math.cos(a) * rad;
          const vy = p.y + Math.sin(a) * rad;
          if (k === 0) targetCtx.moveTo(vx, vy); else targetCtx.lineTo(vx, vy);
        }
        targetCtx.closePath();
        targetCtx.fill();
      } else if (p.type === 'diamond') {
        targetCtx.beginPath();
        targetCtx.moveTo(p.x, p.y - r * 1.3);
        targetCtx.lineTo(p.x + r, p.y);
        targetCtx.lineTo(p.x, p.y + r * 1.3);
        targetCtx.lineTo(p.x - r, p.y);
        targetCtx.closePath();
        targetCtx.fill();
      } else if (p.type === 'snow') {
        targetCtx.lineWidth = Math.max(1, 1.3 * dpr);
        for (let k = 0; k < 3; k++) {
          const a = p.rot + (k * Math.PI) / 3;
          targetCtx.beginPath();
          targetCtx.moveTo(p.x - Math.cos(a) * r * 1.3, p.y - Math.sin(a) * r * 1.3);
          targetCtx.lineTo(p.x + Math.cos(a) * r * 1.3, p.y + Math.sin(a) * r * 1.3);
          targetCtx.stroke();
        }
      } else if (p.type === 'sakura') {
        targetCtx.save();
        targetCtx.translate(p.x, p.y);
        targetCtx.rotate(p.rot);
        targetCtx.beginPath();
        targetCtx.ellipse(0, 0, r * 1.35, r * 0.72, 0, 0, Math.PI * 2);
        targetCtx.fill();
        targetCtx.restore();
      } else if (p.type === 'thunder') {
        targetCtx.lineWidth = Math.max(1.2, 1.8 * dpr);
        targetCtx.beginPath();
        targetCtx.moveTo(p.x - r, p.y - r);
        targetCtx.lineTo(p.x + r * 0.3, p.y);
        targetCtx.lineTo(p.x - r * 0.3, p.y + r * 0.5);
        targetCtx.lineTo(p.x + r, p.y + r * 1.2);
        targetCtx.stroke();
      } else {
        targetCtx.beginPath();
        targetCtx.arc(p.x, p.y, p.type === 'fire' ? r * 1.35 : r, 0, Math.PI * 2);
        targetCtx.fill();
      }
    }
    targetCtx.restore();
  }

  /**
   * Rebuilds static offscreen canvas using the active Premium Theme!
   */
  function rebuildStaticLayer() {
    if (artCacheDirty) rebuildArtCache();

    const W = staticCanvas.width;
    const H = staticCanvas.height;
    const metrics = getBoardMetrics(W);
    const { cell, ox, oy } = metrics;
    const th = currentTheme();

    staticCtx.fillStyle = th.boardBg;
    staticCtx.fillRect(0, 0, W, H);

    // Luxury radial ambient depth on ALL Board UI Themes + Ultimate LEGENDARY aura on Sovereign Legend!
    if (th.isLegend) {
      const legGrad = staticCtx.createRadialGradient(W / 2, H / 2, W * 0.04, W / 2, H / 2, W * 0.62);
      legGrad.addColorStop(0, 'rgba(253, 224, 71, 0.22)');
      legGrad.addColorStop(0.50, 'rgba(147, 51, 234, 0.19)');
      legGrad.addColorStop(1, 'rgba(10, 4, 25, 0)');
      staticCtx.fillStyle = legGrad;
      staticCtx.fillRect(0, 0, W, H);

      // Sacred 24K Gold Geometric Halo Rings
      staticCtx.save();
      staticCtx.strokeStyle = 'rgba(253, 224, 71, 0.20)';
      staticCtx.lineWidth = Math.max(1, 1.2 * dpr);
      staticCtx.beginPath();
      staticCtx.arc(W / 2, H / 2, W * 0.36, 0, Math.PI * 2);
      staticCtx.stroke();
      staticCtx.strokeStyle = 'rgba(232, 121, 249, 0.16)';
      staticCtx.beginPath();
      staticCtx.arc(W / 2, H / 2, W * 0.43, 0, Math.PI * 2);
      staticCtx.stroke();
      staticCtx.restore();
    } else if (!th.isLight) {
      const amb = staticCtx.createRadialGradient(W / 2, H * 0.45, W * 0.05, W / 2, H / 2, W * 0.65);
      amb.addColorStop(0, 'rgba(255, 255, 255, 0.045)');
      amb.addColorStop(1, 'rgba(0, 0, 0, 0.22)');
      staticCtx.fillStyle = amb;
      staticCtx.fillRect(0, 0, W, H);
    }

    // Ambient specks / golden stardust matching active theme
    const starRng = ArrowGenerator.createRng(game.level * 977 + 42);
    staticCtx.fillStyle = th.starFill;
    const starCount = th.isLegend ? 44 : 28;
    for (let s = 0; s < starCount; s++) {
      const sx = starRng() * W;
      const sy = starRng() * H;
      const sr = (0.65 + starRng() * (th.isLegend ? 1.55 : 1.15)) * dpr;
      staticCtx.beginPath();
      staticCtx.arc(sx, sy, sr, 0, Math.PI * 2);
      staticCtx.fill();
    }

    // Ornate Corner Brackets (24K Royal Filigree on Sovereign Legend, sleek neon bevels on Premium Themes)
    staticCtx.save();
    const bInset = 7 * dpr;
    const bLen = (th.isLegend ? 24 : 15) * dpr;
    staticCtx.strokeStyle = th.isLegend ? 'rgba(253, 224, 71, 0.85)' : th.accent;
    staticCtx.globalAlpha = th.isLegend ? 0.92 : 0.42;
    staticCtx.lineWidth = (th.isLegend ? 2.4 : 1.5) * dpr;
    staticCtx.lineCap = 'round';
    const corners = [
      [bInset, bInset, 1, 1],
      [W - bInset, bInset, -1, 1],
      [bInset, H - bInset, 1, -1],
      [W - bInset, H - bInset, -1, -1]
    ];
    corners.forEach(([cx, cy, sx, sy]) => {
      staticCtx.beginPath();
      staticCtx.moveTo(cx, cy + sy * bLen);
      staticCtx.lineTo(cx, cy);
      staticCtx.lineTo(cx + sx * bLen, cy);
      staticCtx.stroke();
      if (th.isLegend) {
        staticCtx.fillStyle = '#FDE047';
        staticCtx.beginPath();
        staticCtx.arc(cx + sx * 4 * dpr, cy + sy * 4 * dpr, 2.2 * dpr, 0, Math.PI * 2);
        staticCtx.fill();
      }
    });
    staticCtx.restore();

    if (!game.completed) {
      // Progressive Background Image (0% -> 50% as arrows leave, strictly masked to coveredMask!)
      const bgAlpha = computeCurrentImageAlpha();
      if (bgAlpha > 0.002) {
        staticCtx.save();
        staticCtx.globalAlpha = bgAlpha;
        staticCtx.drawImage(artCacheCanvas, 0, 0);
        staticCtx.restore();
      }

      // Cover cells currently occupied by stationary arrows so remaining arrows 100% cover the image!
      staticCtx.fillStyle = th.coverFill;
      for (let i = 0; i < game.arrows.length; i++) {
        const a = game.arrows[i];
        if (a.exiting) continue;
        for (let j = 0; j < a.cells.length; j++) {
          const c = a.cells[j];
          staticCtx.fillRect(ox + c.x * cell - 0.5, oy + c.y * cell - 0.5, cell + 1.0, cell + 1.0);
        }
      }
    }

    if (game.gridMode >= 1 && !game.completed) {
      staticCtx.strokeStyle = th.gridStroke;
      staticCtx.lineWidth = Math.max(1, dpr * 0.8);
      staticCtx.beginPath();
      for (let x = 0; x <= game.gridW; x++) {
        const px = ox + x * cell;
        staticCtx.moveTo(px, oy);
        staticCtx.lineTo(px, oy + game.gridH * cell);
      }
      for (let y = 0; y <= game.gridH; y++) {
        const py = oy + y * cell;
        staticCtx.moveTo(ox, py);
        staticCtx.lineTo(ox + game.gridW * cell, py);
      }
      staticCtx.stroke();
    }

    const skin = currentArrowSkin();
    for (let i = 0; i < game.arrows.length; i++) {
      const a = game.arrows[i];
      if (a.animState !== 'idle') continue;
      if (a.id === game.hintArrowId || a.id === game.blockerFlashId) continue;
      const cols = getArrowColors(a, skin);
      drawSnakeArrow(staticCtx, a, metrics, cols, skin.tipStyle, 1, true);
    }

    staticDirty = false;
  }

  let tapRipples = [];
  let floatingPopTexts = [];
  const PLAYFUL_CHEERS = ['✨ Smooth!', '⚡ Clean!', '🌟 Nice!', '💫 Swift!', '🎯 Sharp!', '✨ Silky!'];

  function spawnTapRipple(px, py, color, maxRadius) {
    if (tapRipples.length > 16) tapRipples.shift();
    tapRipples.push({
      x: px,
      y: py,
      r: 4 * dpr,
      maxR: (maxRadius || 38) * dpr,
      life: 1.0,
      color: color || '#38BDF8'
    });
  }

  function spawnFloatingPopText(px, py, text, color, scale) {
    if (floatingPopTexts.length > 12) floatingPopTexts.shift();
    floatingPopTexts.push({
      x: px,
      y: py,
      vy: -44 * dpr,
      life: 1.0,
      decay: 1.35,
      text: text || '✨ Smooth!',
      color: color || '#FDE047',
      scale: scale || 1
    });
  }

  function spawnWinCelebrationBurst() {
    const W = canvas.width;
    const H = canvas.height;
    const colors = ['#FDE047', '#38BDF8', '#34D399', '#F472B6', '#A78BFA', '#FB923C'];
    for (let i = 0; i < 36; i++) {
      if (trailParticles.length >= MAX_PARTICLES) break;
      const ang = (Math.PI * 2 * i) / 36 + Math.random() * 0.2;
      const spd = (45 + Math.random() * 115) * dpr;
      trailParticles.push({
        type: i % 2 === 0 ? 'galaxy' : 'diamond',
        x: W * 0.5 + (Math.random() - 0.5) * W * 0.32,
        y: H * 0.5 + (Math.random() - 0.5) * H * 0.32,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 20 * dpr,
        size: (4.2 + Math.random() * 4.5) * dpr,
        rot: Math.random() * Math.PI * 2,
        life: 1.0,
        decay: 0.95 + Math.random() * 0.5,
        color: colors[i % colors.length]
      });
    }
    spawnTapRipple(W * 0.5, H * 0.5, '#FDE047', 135);
    spawnFloatingPopText(W * 0.5, H * 0.44, '👑 MASTERPIECE REVEALED!', '#FDE047', 1.22);
  }

  function hasActiveAnimations() {
    if (trailParticles.length > 0 || tapRipples.length > 0 || floatingPopTexts.length > 0) return true;
    if (game.hintArrowId !== null || game.blockerFlashTimer > 0) return true;
    if (game.completed && game.bgRevealAlpha < 1) return true;
    for (let i = 0; i < game.arrows.length; i++) {
      if (game.arrows[i].animState !== 'idle') return true;
    }
    return false;
  }

  function requestFrame() {
    if (rafId === null && activeScreen === 'play') {
      lastFrameTime = performance.now();
      rafId = requestAnimationFrame(tickLoop);
    }
  }

  function updatePhysics(dt) {
    let listChanged = false;

    if (game.blockerFlashTimer > 0) {
      game.blockerFlashTimer = Math.max(0, game.blockerFlashTimer - dt);
      if (game.blockerFlashTimer === 0) {
        game.blockerFlashId = null;
        staticDirty = true;
      }
    }

    for (let i = trailParticles.length - 1; i >= 0; i--) {
      const p = trailParticles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += 2.4 * dt;
      p.life -= p.decay * dt;
      if (p.life <= 0) trailParticles.splice(i, 1);
    }

    for (let i = tapRipples.length - 1; i >= 0; i--) {
      const rp = tapRipples[i];
      rp.life -= dt * 2.35;
      rp.r += (rp.maxR - rp.r) * Math.min(1, dt * 10.5);
      if (rp.life <= 0) tapRipples.splice(i, 1);
    }

    for (let i = floatingPopTexts.length - 1; i >= 0; i--) {
      const fp = floatingPopTexts[i];
      fp.y += fp.vy * dt;
      fp.vy *= Math.max(0.88, 1 - dt * 2.2);
      fp.life -= fp.decay * dt;
      if (fp.life <= 0) floatingPopTexts.splice(i, 1);
    }

    const slideSpeed = Math.max(20, Math.min(34, game.gridW * 1.35));
    const bounceSpeed = 14;
    const metrics = getBoardMetrics(canvas.width);

    for (let i = game.arrows.length - 1; i >= 0; i--) {
      const a = game.arrows[i];
      if (a.animState === 'exiting') {
        a.offset += slideSpeed * dt;

        if (a.offset - (a.lastParticleOffset || 0) >= 0.55) {
          a.lastParticleOffset = a.offset;
          if (!a.track) a.track = buildExtendedTrack(a, game.gridW, game.gridH);
          const idx = Math.min(a.track.length - 1, Math.floor(a.offset));
          const tc = a.track[idx];
          if (tc.x >= -1 && tc.x <= game.gridW && tc.y >= -1 && tc.y <= game.gridH) {
            const px = metrics.ox + (tc.x + 0.5) * metrics.cell;
            const py = metrics.oy + (tc.y + 0.5) * metrics.cell;
            spawnTrailParticles(px, py, a);
          }
        }

        const exitNeeded = Math.max(game.gridW, game.gridH) + 2;
        if (a.offset >= exitNeeded) {
          game.arrows.splice(i, 1);
          listChanged = true;
        }
      } else if (a.animState === 'blocked_out') {
        a.offset += bounceSpeed * dt;
        if (a.offset >= a.maxBounceOffset) {
          a.offset = a.maxBounceOffset;
          a.animState = 'blocked_back';
        }
      } else if (a.animState === 'blocked_back') {
        a.offset -= bounceSpeed * 1.15 * dt;
        if (a.offset <= 0) {
          a.offset = 0;
          a.animState = 'idle';
          staticDirty = true;
        }
      }
    }

    if (listChanged && !game.completed && game.arrows.length === 0) {
      triggerLevelWin();
    }

    if (game.completed && game.bgRevealAlpha < 1) {
      game.bgRevealAlpha = Math.min(1, game.bgRevealAlpha + dt * 1.18);
      if (game.bgRevealAlpha >= 1 && !game.winModalShown) {
        game.winModalShown = true;
        setTimeout(openWinModal, 850);
      }
    }
  }

  function renderScene(now) {
    if (staticDirty) rebuildStaticLayer();

    const W = canvas.width;
    const H = canvas.height;
    const th = currentTheme();

    ctx.save();
    ctx.fillStyle = th.boardBg;
    ctx.fillRect(0, 0, W, H);

    if (game.zoom !== 1 || game.panX !== 0 || game.panY !== 0) {
      ctx.translate(W / 2 + game.panX * dpr, H / 2 + game.panY * dpr);
      ctx.scale(game.zoom, game.zoom);
      ctx.translate(-W / 2, -H / 2);
    }

    ctx.drawImage(staticCanvas, 0, 0);
    drawTrailParticles(ctx);

    // Tactile Neon Tap Ripple Rings
    if (tapRipples.length > 0) {
      ctx.save();
      for (let i = 0; i < tapRipples.length; i++) {
        const rp = tapRipples[i];
        ctx.globalAlpha = Math.max(0, rp.life * 0.78);
        ctx.strokeStyle = rp.color;
        ctx.lineWidth = Math.max(1.5, 2.6 * dpr * rp.life);
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    const metrics = getBoardMetrics(W);
    const skin = currentArrowSkin();

    for (let i = 0; i < game.arrows.length; i++) {
      const a = game.arrows[i];
      const isHint = a.id === game.hintArrowId;
      const isBlocker = a.id === game.blockerFlashId;
      if (a.animState === 'idle' && !isHint && !isBlocker) continue;

      let cols = getArrowColors(a, skin);
      let pulse = 1;
      if (a.animState === 'blocked_out' || a.animState === 'blocked_back') {
        cols = { glow: '#EF4444', tube: '#F87171', core: '#FEE2E2' };
        pulse = 1.14;
      } else if (isBlocker) {
        cols = { glow: '#F59E0B', tube: '#FBBF24', core: '#FEF9C3' };
        pulse = 1.15;
      } else if (isHint) {
        cols = { glow: '#10B981', tube: '#34D399', core: '#FFFFFF' };
        pulse = 1.10 + Math.sin(now * 0.008) * 0.08;
      }
      drawSnakeArrow(ctx, a, metrics, cols, skin.tipStyle, pulse, false);
    }

    if (game.completed) {
      if (artCacheDirty) rebuildArtCache();
      ctx.save();
      ctx.globalAlpha = game.bgRevealAlpha;
      ctx.drawImage(fullArtCanvas, 0, 0);
      ctx.restore();
    }

    // Playful Floating Cheer Pop-Texts (Smooth!, Combo xN!, Unstoppable!)
    if (floatingPopTexts.length > 0) {
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let i = 0; i < floatingPopTexts.length; i++) {
        const fp = floatingPopTexts[i];
        const alpha = Math.max(0, Math.min(1, fp.life * 1.25));
        const popScale = (fp.scale || 1) * (0.92 + Math.sin((1 - fp.life) * Math.PI) * 0.16);
        const fontPx = Math.round(13.5 * dpr * popScale);
        ctx.globalAlpha = alpha;
        ctx.font = `900 ${fontPx}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        ctx.lineWidth = Math.max(2.5, 3.6 * dpr);
        ctx.strokeStyle = 'rgba(4, 9, 24, 0.92)';
        ctx.strokeText(fp.text, fp.x, fp.y);
        ctx.fillStyle = fp.color;
        ctx.fillText(fp.text, fp.x, fp.y);
      }
      ctx.restore();
    }

    ctx.restore();
  }

  function tickLoop(now) {
    rafId = null;
    if (activeScreen !== 'play') return;

    const rawDt = Math.min(0.06, Math.max(0.0005, (now - lastFrameTime) / 1000));
    lastFrameTime = now;

    updatePhysics(rawDt);

    const cap = state.fpsCap || 120;
    // At 120 FPS Ultra, budgetMs = 0 renders every native ProMotion/120Hz display refresh without frame skipping!
    const budgetMs = cap === 120 ? 0 : (cap === 60 ? 15.2 : 32.2);
    if (staticDirty || budgetMs === 0 || (now - lastDrawTime >= budgetMs) || !hasActiveAnimations()) {
      renderScene(now);
      lastDrawTime = now;

      fpsCounterFrames++;
      if (now - fpsCounterWindowStart >= 650) {
        const elapsedSec = (now - fpsCounterWindowStart) / 1000;
        measuredFps = Math.min(cap, Math.max(1, Math.round(fpsCounterFrames / elapsedSec)));
        if (cap === 120 && measuredFps < 95) {
          document.getElementById('fpsBadge').textContent = `120 FPS • ${measuredFps}Hz`;
        } else {
          document.getElementById('fpsBadge').textContent = `${measuredFps} FPS`;
        }
        fpsCounterFrames = 0;
        fpsCounterWindowStart = now;
      }
    }

    if (hasActiveAnimations()) {
      rafId = requestAnimationFrame(tickLoop);
    } else {
      document.getElementById('fpsBadge').textContent = `${cap} FPS`;
    }
  }

  // --- Pointer / Touch Controls ---
  function screenToGrid(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const sx = (clientX - rect.left) * dpr;
    const sy = (clientY - rect.top) * dpr;
    const W = canvas.width;
    const H = canvas.height;

    const bx = (sx - (W / 2 + game.panX * dpr)) / game.zoom + W / 2;
    const by = (sy - (H / 2 + game.panY * dpr)) / game.zoom + H / 2;

    const { cell, ox, oy } = getBoardMetrics(W);
    return {
      gx: (bx - ox) / cell,
      gy: (by - oy) / cell
    };
  }

  function findTappedArrow(gx, gy) {
    const ix = Math.floor(gx);
    const iy = Math.floor(gy);
    for (let i = 0; i < game.arrows.length; i++) {
      const a = game.arrows[i];
      if (a.animState !== 'idle') continue;
      for (let j = 0; j < a.cells.length; j++) {
        if (a.cells[j].x === ix && a.cells[j].y === iy) return a;
      }
    }

    let bestArrow = null;
    let bestDist = 0.85;
    for (let i = 0; i < game.arrows.length; i++) {
      const a = game.arrows[i];
      if (a.animState !== 'idle') continue;
      for (let j = 0; j < a.cells.length; j++) {
        const dx = (a.cells[j].x + 0.5) - gx;
        const dy = (a.cells[j].y + 0.5) - gy;
        const d = Math.hypot(dx, dy);
        if (d < bestDist) {
          bestDist = d;
          bestArrow = a;
        }
      }
    }
    return bestArrow;
  }

  function onTapArrow(arrow) {
    if (game.completed || !arrow || arrow.animState !== 'idle') return;
    if (game.dropletsLeft <= 0) {
      openStuckModal(true);
      return;
    }
    AudioFX.unlock();

    const check = ArrowGenerator.checkArrowExit(arrow, game.arrows, game.gridW, game.gridH);

    if (!check.blocked) {
      game.undoStack.push({
        id: arrow.id,
        peelOrder: arrow.peelOrder,
        cells: arrow.cells.map((c) => ({ x: c.x, y: c.y })),
        dir: { dx: arrow.dir.dx, dy: arrow.dir.dy },
        isRed: arrow.isRed
      });

      if (game.campaign.task.type === 'red_first' && !arrow.isRed) {
        const anyRedLeft = game.arrows.some((a) => !a.exiting && a.id !== arrow.id && a.isRed);
        if (anyRedLeft) game.redBroken = true;
      }

      if (game.hintArrowId === arrow.id) game.hintArrowId = null;

      const now = performance.now();
      if (now - game.lastSlideAt <= 2400) {
        game.combo++;
      } else {
        game.combo = 1;
      }
      game.lastSlideAt = now;
      if (game.combo > game.maxComboThisLevel) game.maxComboThisLevel = game.combo;
      if (game.combo > state.bestCombo) state.bestCombo = game.combo;

      const comboEl = document.getElementById('comboBadge');
      if (game.combo >= 2) {
        comboEl.textContent = `🔥 Combo x${game.combo}`;
        comboEl.classList.add('visible');
      } else {
        comboEl.classList.remove('visible');
      }

      arrow.exiting = true;
      arrow.animState = 'exiting';
      arrow.offset = 0.01;
      arrow.lastParticleOffset = 0;
      arrow.track = buildExtendedTrack(arrow, game.gridW, game.gridH);

      const metrics = getBoardMetrics(canvas.width);
      const t0 = arrow.cells[0];
      const tapPx = metrics.ox + (t0.x + 0.5) * metrics.cell;
      const tapPy = metrics.oy + (t0.y + 0.5) * metrics.cell;
      spawnTrailParticles(tapPx, tapPy, arrow);

      const skinCols = getArrowColors(arrow, currentArrowSkin());
      spawnTapRipple(tapPx, tapPy, skinCols.tube || '#38BDF8', game.combo >= 3 ? 48 : 36);
      if (game.combo >= 5) {
        spawnFloatingPopText(tapPx, tapPy - 10 * dpr, `👑 UNSTOPPABLE x${game.combo}!`, '#FDE047', 1.14);
      } else if (game.combo >= 2) {
        spawnFloatingPopText(tapPx, tapPy - 10 * dpr, `🔥 Combo x${game.combo}!`, '#34D399', 1.05);
      } else {
        const cheer = PLAYFUL_CHEERS[(arrow.id + game.combo) % PLAYFUL_CHEERS.length];
        spawnFloatingPopText(tapPx, tapPy - 8 * dpr, cheer, '#7DD3FC', 0.94);
      }

      AudioFX.playSlide(game.combo);
      staticDirty = true;
      updateHeaderAndHud();
      requestFrame();
    } else {
      game.combo = 0;
      document.getElementById('comboBadge').classList.remove('visible');
      game.mistakes++;
      game.dropletsLeft = Math.max(0, game.dropletsLeft - 1);

      arrow.animState = 'blocked_out';
      arrow.offset = 0.02;
      arrow.maxBounceOffset = Math.max(0.28, Math.min(2.2, check.distanceCells - 0.56));
      arrow.track = buildExtendedTrack(arrow, game.gridW, game.gridH);

      const metrics = getBoardMetrics(canvas.width);
      const b0 = arrow.cells[0];
      const bPx = metrics.ox + (b0.x + 0.5) * metrics.cell;
      const bPy = metrics.oy + (b0.y + 0.5) * metrics.cell;
      spawnTapRipple(bPx, bPy, '#FB7185', 32);
      spawnFloatingPopText(bPx, bPy - 8 * dpr, 'Blocked!', '#FDA4AF', 0.92);

      game.blockerFlashId = check.blockerId;
      game.blockerFlashTimer = 0.48;

      AudioFX.playBlocked();
      updateHeaderAndHud();
      staticDirty = true;
      requestFrame();

      if (game.dropletsLeft <= 0) {
        setTimeout(() => openStuckModal(true), 340);
      }
    }
  }

  // --- Level Clear: +5 Gems on Campaign Clear, Speed Rank + Special Skins on Daily Arena Clear! ---
  async function triggerLevelWin() {
    game.completed = true;
    game.bgRevealAlpha = 0.50;
    game.zoom = 1;
    game.panX = 0;
    game.panY = 0;
    document.getElementById('comboBadge').classList.remove('visible');
    spawnWinCelebrationBurst();
    updateHeaderAndHud();

    const exactMs = Math.max(1000, Math.round(performance.now() - game.startTimeMs));
    const solveSec = Math.max(1, Math.round(exactMs / 1000));
    game.solveTimeMs = exactMs;
    game.elapsedSec = solveSec;
    if (state.fastestSec === 0 || solveSec < state.fastestSec) state.fastestSec = solveSec;

    const taskSuccess = isTaskCurrentlyMet();
    const bonusPts = taskSuccess ? (game.campaign.task.bonusPts || 100) : 0;
    const basePoints = 120 + game.totalArrowsStart * 10 + (game.mistakes === 0 ? 60 : 0) + game.maxComboThisLevel * 12 + bonusPts;

    const gemReward = game.isDailyArena ? 10 : LEVEL_CLEAR_GEMS;
    state.gems += gemReward;
    state.score += basePoints;
    state.weeklyPoints = (state.weeklyPoints || 0) + basePoints;
    if (game.mistakes === 0) state.flawlessCount++;

    if (game.isDailyArena) {
      const prevBest = state.dailyBestMs[game.dateKey] || 9999999;
      if (exactMs < prevBest) state.dailyBestMs[game.dateKey] = exactMs;
      const lg = LeaderboardClient.getLeagueForPoints(state.weeklyPoints);
      const dRes = await LeaderboardClient.submitDailyArena({
        dateKey: game.dateKey,
        playerId: state.playerId,
        name: state.playerName,
        avatar: state.avatar,
        league: lg.name,
        timeMs: state.dailyBestMs[game.dateKey],
        mistakes: game.mistakes
      });
      if (dRes && dRes.me) {
        game.dailyRank = dRes.me.rank;
        if (dRes.me.rank === 1 && !state.ownedArrowSkins.includes('arena_legend')) {
          state.ownedArrowSkins.push('arena_legend');
          if (!state.ownedArrowSkins.includes('arena_gold')) state.ownedArrowSkins.push('arena_gold');
          showToast('👑 RANK #1! Unlocked Legend Sovereign Special Skin!');
        } else if (dRes.me.rank <= 3 && !state.ownedArrowSkins.includes('arena_gold')) {
          state.ownedArrowSkins.push('arena_gold');
          showToast('🏆 TOP 3! Unlocked Arena Champion Special Skin!');
        }
      }
    } else {
      if (taskSuccess && game.campaign.task.type === 'red_first') state.redTasksDone++;
      if (!state.clearedLevels.includes(game.level)) {
        state.clearedLevels.push(game.level);
      }
      const nextLv = Math.min(150, game.level + 1);
      unlockLevelInState(nextLv);
      state.currentLevel = nextLv;
      if (state.clearedLevels.length % 4 === 0) state.hints++;
    }

    game.lastGemReward = gemReward;
    game.lastEarnedPoints = basePoints;
    game.lastBonusPts = bonusPts;
    game.lastTaskSuccess = taskSuccess;

    checkNewAchievements();
    persistSave();
    LeaderboardClient.submitScore(buildPlayerProfile()).catch(() => {});

    AudioFX.playWinReveal();
    staticDirty = true;
    requestFrame();
  }

  function buildPlayerProfile() {
    return {
      playerId: state.playerId,
      name: state.playerName,
      avatar: state.avatar,
      city: state.city,
      score: state.score,
      weeklyPoints: state.weeklyPoints || state.score || 0,
      levelsCleared: state.clearedLevels.length,
      flawlessCount: state.flawlessCount,
      bestCombo: state.bestCombo,
      albumCount: state.clearedLevels.length
    };
  }

  function checkNewAchievements() {
    for (const ach of ACHIEVEMENTS) {
      if (!state.claimedAch.includes(ach.id) && ach.check(state)) {
        state.claimedAch.push(ach.id);
        state.score += ach.pts;
        state.weeklyPoints = (state.weeklyPoints || 0) + ach.pts;
        showToast(`🏅 Achievement: ${ach.title} (+${ach.pts} Pts)`);
      }
    }
  }

  function openWinModal() {
    const artCanvas = document.getElementById('winArtworkCanvas');
    const actx = artCanvas.getContext('2d');
    actx.clearRect(0, 0, artCanvas.width, artCanvas.height);
    ArrowShapes.drawShapeArtwork(actx, game.meta, artCanvas.width, artCanvas.height, {
      resolution: 56,
      sparkles: true
    });

    const earnedGems = game.lastGemReward || LEVEL_CLEAR_GEMS;
    const gemsEl = document.getElementById('winGemsGain');
    if (gemsEl) gemsEl.textContent = `+${earnedGems} 💎`;
    document.getElementById('winScoreGain').textContent = `+${game.lastEarnedPoints}`;

    const banner = document.getElementById('winTaskBanner');
    const nextLv = Math.min(150, (game.level || 1) + 1);
    document.getElementById('winTitle').textContent = `✨ Level ${game.level} Cleared! (+${earnedGems} 💎)`;
    document.getElementById('winShapeName').textContent = game.meta.name;
    document.getElementById('winAlbumSaved').textContent =
      `Level ${nextLv} Unlocked! • Earned +${earnedGems} 💎 • Album (${state.clearedLevels.length}/150)`;
    const mins = Math.floor(game.elapsedSec / 60);
    const secs = String(game.elapsedSec % 60).padStart(2, '0');
    document.getElementById('winTimeVal').textContent = `${mins}:${secs}`;
    if (game.lastTaskSuccess && game.campaign && game.campaign.task) {
      banner.style.color = '#34D399';
      banner.textContent = `✓ Bonus Goal: ${game.campaign.task.en} (+${game.lastBonusPts} Score)`;
    } else {
      banner.style.color = 'var(--text-muted)';
      banner.textContent = `Level Complete! (+${earnedGems} 💎 Added to Wallet)`;
    }
    document.getElementById('btnNextLevel').textContent = `▶ Play Level ${nextLv} →`;

    updateHeaderAndHud();
    openModal('modalWin');
  }

  function updateContinueModalButtons() {
    document.getElementById('btnContinueGems').textContent =
      `Continue (+5 Gems 💎)`;
    document.getElementById('btnGemBoostRestart').textContent =
      `Gem Power Restart (5 + Free Hint) — 25 Gems 💎 (Have ${state.gems} 💎)`;
    document.getElementById('btnContinueAd').textContent =
      `🎬 Watch Ad (+10 Gems 💎)`;
    document.getElementById('btnRetryFree').textContent =
      `Restart [ Free ]`;
  }

  function openStuckModal(outOfDroplets) {
    if (game.completed) return;
    const remCount = game.arrows.filter((a) => !a.exiting).length;
    const pct = Math.min(98, Math.round(((game.totalArrowsStart - remCount) / Math.max(1, game.totalArrowsStart)) * 100));

    document.getElementById('continueModalTitle').textContent =
      '💧 Out of Droplets — Need a Boost?';

    document.getElementById('nearMissText').innerHTML =
      `You cleared <strong>${pct}%</strong> of <strong>${game.meta.name}</strong> (${remCount} arrows left). Continue right here, Power Restart with 5 Droplets + Free Hint, or Watch Ad for +10 Gems!`;

    document.getElementById('btnCloseContinue').style.display = outOfDroplets ? 'none' : 'inline-flex';
    updateContinueModalButtons();
    openModal('modalContinue');
  }

  function initPointerControls() {
    const pointers = new Map();
    let startX = 0;
    let startY = 0;
    let startPanX = 0;
    let startPanY = 0;
    let dragged = false;
    let initialPinchDist = 0;
    let initialZoom = 1;

    canvas.addEventListener('pointerdown', (e) => {
      canvas.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size === 1) {
        startX = e.clientX;
        startY = e.clientY;
        startPanX = game.panX;
        startPanY = game.panY;
        dragged = false;
      } else if (pointers.size === 2) {
        const pts = [...pointers.values()];
        initialPinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
        initialZoom = game.zoom;
        dragged = true;
      }
    });

    canvas.addEventListener('pointermove', (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size === 2) {
        const pts = [...pointers.values()];
        const distNow = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
        game.zoom = Math.max(1, Math.min(2.4, initialZoom * (distNow / initialPinchDist)));
        if (game.zoom <= 1.02) {
          game.zoom = 1;
          game.panX = 0;
          game.panY = 0;
        }
        updateHeaderAndHud();
        requestFrame();
      } else if (pointers.size === 1) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.hypot(dx, dy) > 9 && game.zoom > 1.02) {
          dragged = true;
          const limit = canvasCssSize * (game.zoom - 1) * 0.55;
          game.panX = Math.max(-limit, Math.min(limit, startPanX + dx));
          game.panY = Math.max(-limit, Math.min(limit, startPanY + dy));
          requestFrame();
        }
      }
    });

    function endPointer(e) {
      if (!pointers.has(e.pointerId)) return;
      pointers.delete(e.pointerId);
      if (pointers.size === 0 && !dragged) {
        const { gx, gy } = screenToGrid(e.clientX, e.clientY);
        const hit = findTappedArrow(gx, gy);
        if (hit) onTapArrow(hit);
      }
    }

    canvas.addEventListener('pointerup', endPointer);
    canvas.addEventListener('pointercancel', (e) => pointers.delete(e.pointerId));
  }

  // --- Modals (Dynamic top-most z-index so Unlock Level ALWAYS opens above Levels!) ---
  let modalStackTopZ = 100;
  function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (id === 'modalWelcomeName') {
      el.style.zIndex = '260';
    } else {
      modalStackTopZ += 1;
      el.style.zIndex = String(modalStackTopZ);
    }
    el.classList.add('open');
    if (id === 'modalSkins') syncBottomNavVisibility('arrows');
    else if (id === 'modalTrails') syncBottomNavVisibility('trails');
    else if (id === 'modalThemes') syncBottomNavVisibility('themes');
    else syncBottomNavVisibility();
  }

  function checkStartupPlayerNamePrompt() {
    const params = new URLSearchParams(window.location.search || '');
    const isAdminUrl = params.get('admin') === '1' || window.location.hash === '#admin';
    if (isAdminUrl) return;
    if (!state.playerNameSaved) {
      const avBtn = document.getElementById('btnWelcomeAvatar');
      const nameInp = document.getElementById('inputWelcomePlayerName');
      if (avBtn) avBtn.textContent = state.avatar || '🦊';
      renderAvatarPickerInto('welcomeAvatarGrid', (av) => {
        if (avBtn) avBtn.textContent = av;
      });
      if (nameInp) {
        nameInp.value = state.playerName && state.playerName !== 'Player' ? state.playerName : '';
      }
      openModal('modalWelcomeName');
      setTimeout(() => {
        if (nameInp) nameInp.focus();
      }, 120);
    }
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
    syncBottomNavVisibility('home');
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach((m) => m.classList.remove('open'));
    syncBottomNavVisibility('home');
  }

  // --- Level Map Modal: Locked Cards show 50% Photo + Real Level Name + Lock on top + Direct Gem Unlock! ---
  function renderAlbumModal(chapterId) {
    const chSelect = document.getElementById('selectChapter');
    if (!chSelect.options.length) {
      ArrowShapes.CHAPTERS.forEach((ch) => {
        const opt = document.createElement('option');
        opt.value = String(ch.id);
        opt.textContent = `Ch ${ch.id}: ${ch.title} (${(ch.id - 1) * 15 + 1}–${ch.id * 15})`;
        chSelect.appendChild(opt);
      });
    }
    const activeCh = Number(chapterId) || Math.ceil(state.currentLevel / 15) || 1;
    chSelect.value = String(activeCh);
    document.getElementById('albumProgressBadge').textContent = `${state.clearedLevels.length}/150 Solved`;

    const grid = document.getElementById('albumGrid');
    grid.innerHTML = '';
    const startLv = (activeCh - 1) * 15 + 1;
    const endLv = activeCh * 15;

    for (let lv = startLv; lv <= endLv; lv++) {
      const meta = ArrowShapes.getLevelMeta(lv);
      const isCollected = state.clearedLevels.includes(lv);
      const canPlay = isLevelUnlocked(lv);
      const fTheme = NEON_FRAMES[(lv - 1) % NEON_FRAMES.length];
      const unlockCost = getLevelUnlockCost(lv);

      const card = document.createElement('div');
      card.className = 'album-card' +
        (canPlay ? '' : ' locked') +
        (lv === state.currentLevel ? ' current' : '');
      if (canPlay) card.style.borderColor = fTheme.border;

      const numBadge = document.createElement('div');
      numBadge.className = 'card-num';
      numBadge.textContent = `Level ${lv}`;
      card.appendChild(numBadge);

      const artWrap = document.createElement('div');
      artWrap.className = 'card-art-wrap';

      const miniCanvas = document.createElement('canvas');
      miniCanvas.width = 76;
      miniCanvas.height = 76;
      miniCanvas.style.width = '64px';
      miniCanvas.style.height = '64px';
      const mctx = miniCanvas.getContext('2d');

      if (isCollected) {
        ArrowShapes.drawShapeArtwork(mctx, meta, 76, 76, { resolution: 34, backdrop: true });
      } else if (canPlay) {
        mctx.save();
        mctx.globalAlpha = 0.78;
        ArrowShapes.drawShapeArtwork(mctx, meta, 76, 76, { resolution: 34, backdrop: true });
        mctx.restore();
      } else {
        // Locked Level: Show real level photo at 50% opacity + Lock icon overlaid on top!
        mctx.save();
        mctx.globalAlpha = 0.50;
        ArrowShapes.drawShapeArtwork(mctx, meta, 76, 76, { resolution: 34, backdrop: true });
        mctx.restore();
      }
      artWrap.appendChild(miniCanvas);

      if (!canPlay) {
        const lockOverlay = document.createElement('div');
        lockOverlay.className = 'card-lock-badge';
        lockOverlay.textContent = '🔒';
        artWrap.appendChild(lockOverlay);
      }

      card.appendChild(artWrap);

      // Always show the REAL level name (never "Locked"!)
      const titleDiv = document.createElement('div');
      titleDiv.className = 'card-title';
      titleDiv.textContent = isCollected ? `✓ ${meta.name}` : meta.name;
      card.appendChild(titleDiv);

      if (!canPlay) {
        const unlockPill = document.createElement('div');
        unlockPill.className = 'card-unlock-pill';
        unlockPill.textContent = `🔓 ${unlockCost} 💎`;
        card.appendChild(unlockPill);
      }

      card.addEventListener('click', () => {
        AudioFX.unlock();
        if (!canPlay) {
          openUnlockLevelModal(lv);
          return;
        }
        closeAllModals();
        startCampaignLevel(lv);
      });

      grid.appendChild(card);
    }
  }

  function openUnlockLevelModal(lv) {
    pendingUnlockLevel = lv;
    refreshUnlockModalUI(lv);
    openModal('modalUnlockLevel');
  }

  function refreshUnlockModalUI(lv) {
    const meta = ArrowShapes.getLevelMeta(lv);
    const cost = getLevelUnlockCost(lv);

    document.getElementById('unlockLevelHeading').textContent = `🔓 Unlock Level ${lv} Only`;
    document.getElementById('unlockShapeTitle').textContent = `Level ${lv}: ${meta.name}`;
    document.getElementById('unlockSubNote').textContent =
      `Unlocks ONLY Level ${lv} for ${cost} 💎 (Wallet: ${state.gems} 💎) • Earlier locked levels stay locked until cleared or unlocked!`;

    const uCanvas = document.getElementById('unlockPreviewCanvas');
    const uctx = uCanvas.getContext('2d');
    uctx.clearRect(0, 0, uCanvas.width, uCanvas.height);
    uctx.save();
    uctx.globalAlpha = 0.50;
    ArrowShapes.drawShapeArtwork(uctx, meta, uCanvas.width, uCanvas.height, { resolution: 44, backdrop: true });
    uctx.restore();

    document.getElementById('btnConfirmGemUnlock').textContent =
      `🔓 Unlock Level ${lv} Only — ${cost} 💎`;
  }

  let deferredPwaPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPwaPrompt = e;
    const pwaBtn = document.getElementById('btnModalInstallPwa');
    if (pwaBtn) pwaBtn.style.display = 'inline-flex';
  });

  function triggerDirectUrlDownload(urlPath, fileName, toastMsg) {
    const a = document.createElement('a');
    a.href = urlPath;
    a.download = fileName;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
    AudioFX.playWinReveal();
    showToast(toastMsg);
  }

  function triggerApkDownload() {
    AudioFX.unlock();
    AudioFX.playTap();
    const statusEl = document.getElementById('downloadModalStatusText');
    if (statusEl) {
      statusEl.textContent = '⬇️ Downloading Arrow-Puzzle.apk... Open it from Notifications / Downloads & tap Install!';
    }
    triggerDirectUrlDownload(
      isServerOnline() ? '/api/download-apk' : 'Arrow-Puzzle.apk',
      'Arrow-Puzzle.apk',
      '📱 Downloading Full Android Game (Arrow-Puzzle.apk)!'
    );
  }

  function triggerFullZipDownload() {
    AudioFX.unlock();
    AudioFX.playTap();
    const statusEl = document.getElementById('downloadModalStatusText');
    if (statusEl) {
      statusEl.textContent = '⬇️ Downloading Arrow-Puzzle-Full-Game.zip (All Offline Game Files + Launchers + APK)!';
    }
    triggerDirectUrlDownload(
      isServerOnline() ? '/api/download-full-zip' : 'Arrow-Puzzle-Full-Game.zip',
      'Arrow-Puzzle-Full-Game.zip',
      '📦 Downloading Full Game Package (Arrow-Puzzle-Full-Game.zip)!'
    );
  }

  async function triggerPwaInstall() {
    AudioFX.unlock();
    AudioFX.playTap();
    if (!deferredPwaPrompt) {
      showToast('Use the APK or ZIP download buttons above to install offline!');
      return;
    }
    try {
      deferredPwaPrompt.prompt();
      const choice = await deferredPwaPrompt.userChoice;
      if (choice && choice.outcome === 'accepted') {
        AudioFX.playWinReveal();
        showToast('📲 Installing Arrow Puzzle to your Home Screen!');
      }
      deferredPwaPrompt = null;
    } catch (_) {}
  }

  function openFullGameDownloadFlow() {
    AudioFX.unlock();
    AudioFX.playTap();
    const pwaBtn = document.getElementById('btnModalInstallPwa');
    if (pwaBtn) {
      pwaBtn.style.display = deferredPwaPrompt ? 'inline-flex' : 'none';
    }
    openModal('modalDownloadGame');

    // Automatically start downloading the Full Game right away (APK on Android, Full Game ZIP on PC/Other — NEVER a bare .html!)
    const isAndroidDevice = /Android/i.test(navigator.userAgent || '');
    if (isAndroidDevice) {
      triggerApkDownload();
    } else {
      triggerFullZipDownload();
    }
  }

  function renderSettingsAndAchievements() {
    applySettings();
    const list = document.getElementById('achievementsList');
    list.innerHTML = '';
    ACHIEVEMENTS.forEach((ach) => {
      const done = state.claimedAch.includes(ach.id);
      const row = document.createElement('div');
      row.className = 'lb-row' + (done ? ' me' : '');
      row.innerHTML = `
        <div style="font-size:1.2rem;">${done ? '🏅' : '🔒'}</div>
        <div class="lb-info">
          <div class="lb-name">${ach.title}</div>
          <div class="lb-sub">${ach.desc}</div>
        </div>
        <div class="lb-score">${done ? '✓ Done' : `+${ach.pts} Pts`}</div>
      `;
      list.appendChild(row);
    });
  }

  function wireButtons() {
    document.querySelectorAll('[data-close]').forEach((btn) => {
      btn.addEventListener('click', () => closeModal(btn.dataset.close));
    });

    document.getElementById('btnCloseContinue').addEventListener('click', () => {
      if (game.dropletsLeft > 0) closeModal('modalContinue');
    });

    document.querySelectorAll('.modal-backdrop').forEach((bd) => {
      bd.addEventListener('click', (e) => {
        if (
          e.target === bd &&
          bd.id !== 'modalWin' &&
          bd.id !== 'modalContinue' &&
          bd.id !== 'modalWelcomeName'
        ) {
          closeModal(bd.id);
        }
      });
    });

    // Startup Player Name Save Modal (Save Name + Avatar Only!)
    document.getElementById('btnWelcomeAvatar').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      const idx = (AVATARS.indexOf(state.avatar) + 1) % AVATARS.length;
      state.avatar = AVATARS[idx];
      document.getElementById('btnWelcomeAvatar').textContent = state.avatar;
      renderAvatarPickerInto('welcomeAvatarGrid', (av) => {
        document.getElementById('btnWelcomeAvatar').textContent = av;
      });
    });

    function submitStartupPlayerName() {
      AudioFX.unlock();
      const inp = document.getElementById('inputWelcomePlayerName');
      const rawName = (inp ? inp.value : '').trim();
      if (rawName.length < 2) {
        AudioFX.playBlocked();
        showToast('Please enter your Player Name (at least 2 characters)!');
        if (inp) inp.focus();
        return;
      }
      state.playerName = rawName.slice(0, 20);
      state.playerNameSaved = true;
      persistSave();
      AudioFX.playWinReveal();
      syncAllGemDisplays();
      renderHomeScreen();
      renderAccountModal();
      syncAccountWithServer();
      closeModal('modalWelcomeName');
      showToast(`Welcome, ${state.avatar} ${state.playerName}!`);
    }

    document.getElementById('btnSaveWelcomeName').addEventListener('click', submitStartupPlayerName);
    document.getElementById('inputWelcomePlayerName').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitStartupPlayerName();
      }
    });

    // Persistent Global Bottom Navigation Bar (4 Clean Sections: Home, Arrows, Trail Effects, Themes!)
    document.getElementById('gnavHome').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      closeAllModals();
      showScreen('home');
    });
    document.getElementById('gnavArrows').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      closeAllModals();
      syncAllGemDisplays();
      renderAllShopGrids();
      openModal('modalSkins');
    });
    document.getElementById('gnavTrails').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      closeAllModals();
      syncAllGemDisplays();
      renderAllShopGrids();
      openModal('modalTrails');
    });
    document.getElementById('gnavThemes').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      closeAllModals();
      syncAllGemDisplays();
      renderAllShopGrids();
      openModal('modalThemes');
    });

    // Direct Gem Level Unlock Actions
    document.getElementById('btnConfirmGemUnlock').addEventListener('click', () => {
      if (pendingUnlockLevel === null) return;
      const lv = pendingUnlockLevel;
      const cost = getLevelUnlockCost(lv);
      AudioFX.unlock();

      if (state.gems < cost) {
        AudioFX.playBlocked();
        showToast(`Need ${cost - state.gems} more 💎 — Opening Gem Store!`);
        renderGemStore();
        openModal('modalGems');
        return;
      }

      state.gems -= cost;
      unlockLevelInState(lv);
      state.currentLevel = lv;
      persistSave();
      AudioFX.playWinReveal();
      syncAllGemDisplays();
      renderHomeScreen();
      closeAllModals();
      startCampaignLevel(lv);
      showToast(`Unlocked Level ${lv} Only (${ArrowShapes.getLevelMeta(lv).name}) for ${cost} 💎!`);
    });

    document.getElementById('btnBuyGemsForUnlock').addEventListener('click', () => {
      AudioFX.unlock();
      renderGemStore();
      openModal('modalGems');
    });

    // Home Screen Actions
    document.getElementById('btnHeroPlay').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      const targetLv = getFallbackPlayableLevel();
      startCampaignLevel(targetLv);
    });
    document.getElementById('btnHomeProfile').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      renderAccountModal();
      openModal('modalAccount');
    });
    document.getElementById('btnHomeGems').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      renderGemStore();
      openModal('modalGems');
    });
    document.getElementById('btnHomeSettings').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      renderSettingsAndAchievements();
      openModal('modalSettings');
    });
    document.getElementById('btnHubLevels').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      renderAlbumModal();
      openModal('modalAlbum');
    });

    const homeTopDlBtn = document.getElementById('btnHomeTopDownload');
    if (homeTopDlBtn) {
      homeTopDlBtn.addEventListener('click', openFullGameDownloadFlow);
    }
    const homeDlBtn = document.getElementById('btnHomeDownloadOffline');
    if (homeDlBtn) {
      homeDlBtn.addEventListener('click', openFullGameDownloadFlow);
    }
    const settingsDlBtn = document.getElementById('btnDownloadOfflineGame');
    if (settingsDlBtn) {
      settingsDlBtn.addEventListener('click', openFullGameDownloadFlow);
    }
    const modalApkBtn = document.getElementById('btnModalDownloadApk');
    if (modalApkBtn) {
      modalApkBtn.addEventListener('click', triggerApkDownload);
    }
    const modalZipBtn = document.getElementById('btnModalDownloadZip');
    if (modalZipBtn) {
      modalZipBtn.addEventListener('click', triggerFullZipDownload);
    }
    const modalPwaBtn = document.getElementById('btnModalInstallPwa');
    if (modalPwaBtn) {
      modalPwaBtn.addEventListener('click', triggerPwaInstall);
    }

    const quickPlayBtn = document.getElementById('btnPlayRandomLevel');
    if (quickPlayBtn) {
      quickPlayBtn.addEventListener('click', () => {
        AudioFX.unlock();
        AudioFX.playTap();
        const pool = Array.isArray(state.unlockedLevels) && state.unlockedLevels.length
          ? state.unlockedLevels
          : [1];
        const pick = pool[Math.floor(Math.random() * pool.length)] || 1;
        startCampaignLevel(pick);
        showToast(`🎲 Quick Play • Level ${pick} (${ArrowShapes.getLevelMeta(pick).name})!`);
      });
    }

    const eqSkinBtn = document.getElementById('btnHomeEquipSkin');
    if (eqSkinBtn) {
      eqSkinBtn.addEventListener('click', () => {
        AudioFX.unlock();
        AudioFX.playTap();
        syncAllGemDisplays();
        renderAllShopGrids();
        openModal('modalSkins');
      });
    }
    const eqTrailBtn = document.getElementById('btnHomeEquipTrail');
    if (eqTrailBtn) {
      eqTrailBtn.addEventListener('click', () => {
        AudioFX.unlock();
        AudioFX.playTap();
        syncAllGemDisplays();
        renderAllShopGrids();
        openModal('modalTrails');
      });
    }
    const eqThemeBtn = document.getElementById('btnHomeEquipTheme');
    if (eqThemeBtn) {
      eqThemeBtn.addEventListener('click', () => {
        AudioFX.unlock();
        AudioFX.playTap();
        syncAllGemDisplays();
        renderAllShopGrids();
        openModal('modalThemes');
      });
    }

    // Account Wallet, Checkout, Card Form & Hidden Admin Actions
    document.getElementById('btnSwitchAccountFromStore').addEventListener('click', () => {
      AudioFX.playTap();
      renderAccountModal();
      openModal('modalAccount');
    });
    document.getElementById('btnOpenAccountFromSettings').addEventListener('click', () => {
      AudioFX.playTap();
      renderAccountModal();
      openModal('modalAccount');
    });

    // Custom Gem Amount Choice in Gem Store
    document.getElementById('inputCustomGemQty').addEventListener('input', () => {
      syncCustomGemChoiceUI();
    });
    document.querySelectorAll('.custom-gem-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        AudioFX.playTap();
        const gVal = Number(chip.dataset.customgems || 100);
        const inp = document.getElementById('inputCustomGemQty');
        if (inp) inp.value = String(gVal);
        syncCustomGemChoiceUI();
      });
    });
    document.getElementById('btnBuyCustomGems').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      openCustomGemCheckout();
    });

    document.querySelectorAll('#checkoutMethodTabs .seg-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        AudioFX.playTap();
        setCheckoutMethodTab(btn.dataset.paytab);
      });
    });
    document.getElementById('inputCheckoutAccount').addEventListener('input', () => {
      if (activeCheckoutTab === 'upi') refreshDirectUpiQr();
    });
    document.getElementById('btnCopyMerchantUpi').addEventListener('click', async () => {
      AudioFX.playTap();
      const vpa = (paymentConfig.upiId || '').trim();
      if (!vpa) return;
      try {
        await navigator.clipboard.writeText(vpa);
        showToast(`Copied UPI ID: ${vpa}`);
      } catch (_) {
        showToast(vpa);
      }
    });

    // Live Card Number formatting + Brand Detection + MM/YY slash formatter
    document.getElementById('inputCardNumber').addEventListener('input', (e) => {
      const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
      const grouped = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
      e.target.value = grouped;
      document.getElementById('cardBrandBadge').textContent = detectCardBrand(digits);
    });
    document.getElementById('inputCardExpiry').addEventListener('input', (e) => {
      const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
      e.target.value = digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    });

    document.getElementById('btnPayWithCard').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      submitCardPayment();
    });
    document.getElementById('btnPayWithRazorpay').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      launchRazorpayCheckoutFlow({ cardOnly: false });
    });
    document.getElementById('btnVerifyUpiPayment').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      verifyDirectUpiPayment();
    });

    // Wait for Approval Confirmation Screen actions (auto-syncs every 3s)
    document.getElementById('btnSubmitAnotherInquiry').addEventListener('click', () => {
      AudioFX.playTap();
      document.getElementById('inputUpiUtr').value = '';
      document.getElementById('inputCardCvv').value = '';
      document.getElementById('inputCardAuthRef').value = '';
      hideCheckoutWaitApprovalScreen();
      refreshCheckoutPendingBanner();
      showToast('➕ Ready for your next Gem order inquiry!');
    });
    document.getElementById('btnBackToStoreFromWait').addEventListener('click', () => {
      AudioFX.playTap();
      hideCheckoutWaitApprovalScreen();
      closeModal('modalCheckout');
      renderGemStore();
      openModal('modalGems');
    });

    // Secret 5-Tap Gesture on Settings Header Title (Invisible to ordinary players!)
    document.getElementById('secretAdminTriggerTitle').addEventListener('click', () => {
      secretTapCount++;
      clearTimeout(secretTapResetTimer);
      secretTapResetTimer = setTimeout(() => {
        secretTapCount = 0;
      }, 2500);
      if (secretTapCount >= 5) {
        secretTapCount = 0;
        openSecretAdminEntry();
      }
    });

    document.getElementById('btnAdminLoginSubmit').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      submitAdminPinLogin();
    });
    document.getElementById('inputAdminLoginPin').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitAdminPinLogin();
    });
    document.querySelectorAll('#adminPanelTabs .seg-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        AudioFX.playTap();
        setAdminTab(btn.dataset.admintab);
      });
    });
    document.getElementById('btnAdminRefresh').addEventListener('click', () => {
      AudioFX.playTap();
      openAdminControlPanel(false);
    });
    document.getElementById('btnAdminLogout').addEventListener('click', () => {
      AudioFX.playTap();
      adminSessionToken = '';
      try {
        sessionStorage.removeItem(ADMIN_SESSION_KEY);
      } catch (_) {}
      closeModal('modalAdminPanel');
      showToast('🔒 Admin Panel Locked');
    });

    // Admin Direct Credit, Plans Editor, Custom QR Upload & Channel Toggles
    document.getElementById('btnAdminDirectCredit').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      submitAdminDirectCredit();
    });
    document.getElementById('btnAdminAddPlan').addEventListener('click', () => {
      AudioFX.playTap();
      if (adminDraftPlans.length >= 12) {
        showToast('Maximum 12 Gem Plans allowed!');
        return;
      }
      const nextNum = adminDraftPlans.length + 1;
      adminDraftPlans.push({
        id: `plan_${nextNum}_${Date.now().toString(36).slice(-3)}`,
        tag: 'SPECIAL',
        icon: '💎',
        title: `Custom Gem Plan #${nextNum}`,
        bundleText: 'Instant Gems Pack',
        gems: 100,
        amountInr: 79,
        priceInr: 79,
        priceLabel: '₹79',
        bonusSkins: [],
        bonusTrails: [],
        active: true
      });
      renderAdminPlansEditor();
    });
    document.getElementById('btnAdminResetPlans').addEventListener('click', () => {
      AudioFX.playTap();
      saveAdminMerchantPlans(true);
    });
    document.getElementById('btnAdminSavePlans').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      saveAdminMerchantPlans(false);
    });

    document.getElementById('btnUploadAdminQr').addEventListener('click', () => {
      AudioFX.playTap();
      document.getElementById('inputAdminQrFile').click();
    });
    document.getElementById('inputAdminQrFile').addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      try {
        adminDraftQrImage = await compressQrImageToDataUri(file);
        syncAdminQrPreviewUI();
        showToast('📷 QR Image ready! Click Save Merchant Settings below to publish.');
      } catch (_) {
        AudioFX.playBlocked();
        showToast('Could not read QR image — please pick a PNG or JPG image.');
      }
      e.target.value = '';
    });
    document.getElementById('btnClearAdminQr').addEventListener('click', () => {
      AudioFX.playTap();
      adminDraftQrImage = '';
      syncAdminQrPreviewUI();
      showToast('Custom QR cleared — click Save below to switch to Auto UPI QR.');
    });

    document.getElementById('btnToggleUpiMethod').addEventListener('click', () => {
      AudioFX.playTap();
      adminDraftChannels.upiEnabled = !adminDraftChannels.upiEnabled;
      syncAdminChannelPills();
    });
    document.getElementById('btnToggleCardMethod').addEventListener('click', () => {
      AudioFX.playTap();
      adminDraftChannels.cardEnabled = !adminDraftChannels.cardEnabled;
      syncAdminChannelPills();
    });
    document.getElementById('btnToggleRazorpayMethod').addEventListener('click', () => {
      AudioFX.playTap();
      adminDraftChannels.razorpayEnabled = !adminDraftChannels.razorpayEnabled;
      syncAdminChannelPills();
    });

    document.getElementById('btnAcctCycleAvatar').addEventListener('click', () => {
      AudioFX.playTap();
      const idx = (AVATARS.indexOf(state.avatar) + 1) % AVATARS.length;
      state.avatar = AVATARS[idx];
      document.getElementById('btnAcctCycleAvatar').textContent = state.avatar;
      persistSave();
      renderHomeScreen();
      renderAccountModal();
    });

    document.getElementById('btnSaveAndSyncAccount').addEventListener('click', async () => {
      AudioFX.unlock();
      AudioFX.playTap();
      const nm = document.getElementById('inputAcctName').value.trim();
      if (nm.length < 2) {
        AudioFX.playBlocked();
        showToast('Please enter at least 2 characters for your Player Name!');
        document.getElementById('inputAcctName').focus();
        return;
      }
      state.playerName = nm.slice(0, 20);
      state.playerNameSaved = true;
      persistSave();
      await syncAccountWithServer();
      syncAllGemDisplays();
      renderHomeScreen();
      renderAccountModal();
      closeModal('modalAccount');
      showToast(`Saved Profile: ${state.avatar} ${state.playerName}!`);
    });

    document.getElementById('inputAcctName').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('btnSaveAndSyncAccount').click();
      }
    });

    document.getElementById('btnSaveMerchantConfig').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      saveMerchantConfiguration();
    });

    // Gameplay Screen Actions
    document.getElementById('btnBackHome').addEventListener('click', () => {
      showScreen('home');
    });
    document.getElementById('levelHeadingTap').addEventListener('click', () => {
      renderAlbumModal();
      openModal('modalAlbum');
    });
    document.getElementById('btnOpenMapPlay').addEventListener('click', () => {
      renderAlbumModal();
      openModal('modalAlbum');
    });
    document.getElementById('selectChapter').addEventListener('change', (e) => {
      renderAlbumModal(Number(e.target.value));
    });

    document.getElementById('gemsDisplay').addEventListener('click', () => {
      renderGemStore();
      openModal('modalGems');
    });
    document.getElementById('btnModalSkinsGems').addEventListener('click', () => {
      renderGemStore();
      openModal('modalGems');
    });
    document.getElementById('btnModalTrailsGems').addEventListener('click', () => {
      renderGemStore();
      openModal('modalGems');
    });
    document.getElementById('btnStuckHelp').addEventListener('click', () => {
      openStuckModal(false);
    });

    document.getElementById('btnModalThemesGems').addEventListener('click', () => {
      renderGemStore();
      openModal('modalGems');
    });

    const quickRestartBtn = document.getElementById('btnQuickRestartPlay');
    if (quickRestartBtn) {
      quickRestartBtn.addEventListener('click', () => {
        AudioFX.unlock();
        AudioFX.playTap();
        if (game.isDailyArena) {
          startDailyArenaLevel();
        } else {
          startCampaignLevel(game.level || state.currentLevel || 1);
        }
        showToast('↻ Board Restarted Fresh!');
      });
    }

    document.getElementById('btnOpenSettings').addEventListener('click', () => {
      renderSettingsAndAchievements();
      openModal('modalSettings');
    });

    document.getElementById('btnToggleFps').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      state.fpsCap = state.fpsCap === 120 ? 60 : (state.fpsCap === 60 ? 30 : 120);
      persistSave();
      resizeBoard();
      renderSettingsAndAchievements();
      showToast(`Refresh Rate: ${state.fpsCap} FPS Mode Active!`);
    });
    document.getElementById('btnToggleSound').addEventListener('click', () => {
      AudioFX.unlock();
      state.sound = !state.sound;
      persistSave();
      renderSettingsAndAchievements();
      AudioFX.playTap();
    });
    document.getElementById('btnToggleHaptics').addEventListener('click', () => {
      AudioFX.unlock();
      const order = ['off', 'medium', 'strong'];
      const curIdx = order.indexOf(state.hapticStrength);
      state.hapticStrength = order[(curIdx + 1) % order.length];
      state.haptics = state.hapticStrength !== 'off';
      persistSave();
      renderSettingsAndAchievements();
      if (state.haptics) AudioFX.vibrate([16, 26, 22]);
      showToast(`Tactile Haptics: ${state.hapticStrength.toUpperCase()}`);
    });
    document.getElementById('btnTestHaptics').addEventListener('click', () => {
      AudioFX.unlock();
      if (!state.haptics) {
        showToast('Tactile Haptics is OFF — turn it ON first to feel vibration!');
        return;
      }
      AudioFX.vibrate([18, 34, 26, 40, 38]);
      AudioFX.playSlide(4);
      showToast('📳 Tactile Haptic Pulse Triggered!');
    });

    // Bottom Play Controls
    document.getElementById('btnGridZoom').addEventListener('click', () => {
      game.gridMode = (game.gridMode + 1) % 3;
      if (game.gridMode === 2) {
        game.zoom = 1.65;
      } else {
        game.zoom = 1;
        game.panX = 0;
        game.panY = 0;
      }
      updateHeaderAndHud();
      staticDirty = true;
      requestFrame();
    });

    document.getElementById('btnUndo').addEventListener('click', () => {
      if (game.completed || game.undoStack.length === 0) {
        showToast('Nothing to undo yet');
        return;
      }
      const restored = game.undoStack.pop();
      game.arrows.push({
        id: restored.id,
        peelOrder: restored.peelOrder,
        cells: restored.cells,
        dir: restored.dir,
        isRed: restored.isRed,
        animState: 'idle',
        exiting: false,
        offset: 0,
        lastParticleOffset: 0,
        maxBounceOffset: 0,
        track: null
      });
      game.undosUsed++;
      game.hintArrowId = null;
      AudioFX.vibrate(10);
      staticDirty = true;
      updateHeaderAndHud();
      requestFrame();
    });

    document.getElementById('btnHint').addEventListener('click', () => {
      if (game.completed) return;
      if (state.hints <= 0) {
        if (state.gems >= 15) {
          state.gems -= 15;
          state.hints += 1;
          syncAllGemDisplays();
          showToast('Bought +1 Hint for 15 💎');
        } else {
          showToast('Need 15 💎 for a Hint — Opening Gem Store!');
          renderGemStore();
          openModal('modalGems');
          return;
        }
      }
      const preferRed = game.campaign.task.type === 'red_first' && !game.redBroken &&
        game.arrows.some((a) => !a.exiting && a.isRed);
      const next = ArrowGenerator.findHintArrow(game.arrows, game.gridW, game.gridH, preferRed);
      if (!next) return;

      state.hints--;
      game.hintsUsed++;
      game.hintArrowId = next.id;
      persistSave();
      AudioFX.playHint();
      updateHeaderAndHud();
      staticDirty = true;
      requestFrame();
    });

    // Win Modal Actions
    document.getElementById('btnNextLevel').addEventListener('click', () => {
      closeModal('modalWin');
      const nextLv = game.level < 150 ? game.level + 1 : 1;
      unlockLevelInState(nextLv);
      startCampaignLevel(nextLv);
    });
    document.getElementById('btnWinHome').addEventListener('click', () => {
      closeModal('modalWin');
      showScreen('home');
    });
    document.getElementById('btnWinLevels').addEventListener('click', () => {
      closeModal('modalWin');
      renderAlbumModal();
      openModal('modalAlbum');
    });

    // Out of Droplets — Need a Boost? Modal (Exact 4 Buttons!)
    document.getElementById('btnContinueGems').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      if (state.gems < 5) {
        showToast('Need 5 💎 — Watch Ad (+10 💎) below or open Gem Store!');
        renderGemStore();
        openModal('modalGems');
        return;
      }
      state.gems -= 5;
      game.dropletsLeft = Math.min(game.dropletsMax, game.dropletsLeft + 1);
      persistSave();
      syncAllGemDisplays();
      closeModal('modalContinue');
      updateHeaderAndHud();
      showToast('+1 💧 Restored for 5 💎!');
    });

    document.getElementById('btnGemBoostRestart').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      if (state.gems < 25) {
        showToast('Need 25 💎 — Watch Ad (+10 💎) or open Gem Store!');
        renderGemStore();
        openModal('modalGems');
        return;
      }
      state.gems -= 25;
      persistSave();
      syncAllGemDisplays();
      closeModal('modalContinue');
      if (game.isDailyArena) {
        startDailyArenaLevel({ extraDroplets: true, freeFirstHint: true });
      } else {
        startCampaignLevel(game.level, { extraDroplets: true, freeFirstHint: true });
      }
      showToast('⚡ Gem Power Restart! 5 Droplets + Free Hint Active!');
    });

    document.getElementById('btnContinueAd').addEventListener('click', () => {
      AudioFX.unlock();
      AudioFX.playTap();
      const btn = document.getElementById('btnContinueAd');
      btn.disabled = true;
      let rem = 3;
      btn.textContent = `🎬 Watching Ad... ${rem}s`;
      const iv = setInterval(() => {
        rem--;
        if (rem > 0) {
          btn.textContent = `🎬 Watching Ad... ${rem}s`;
        } else {
          clearInterval(iv);
          btn.disabled = false;
          state.gems += 10;
          if (game.dropletsLeft <= 0) {
            game.dropletsLeft = 1;
          }
          persistSave();
          AudioFX.playWinReveal();
          syncAllGemDisplays();
          updateContinueModalButtons();
          updateHeaderAndHud();
          closeModal('modalContinue');
          showToast('🎬 Earned +10 Gems 💎 (+1 💧 Ready)!');
        }
      }, 1000);
    });

    document.getElementById('btnRetryFree').addEventListener('click', () => {
      AudioFX.playTap();
      closeModal('modalContinue');
      if (game.isDailyArena) {
        startDailyArenaLevel();
      } else {
        startCampaignLevel(game.level);
      }
    });
  }

  // --- Living Ambient Environment Backdrop (Starlight Motes, Aurora Waves & Drifting Mini-Arrows) ---
  function initLivingEnvironmentBackdrop() {
    const envCanvas = document.getElementById('envBackdropCanvas');
    if (!envCanvas) return;
    const ectx = envCanvas.getContext('2d');
    let ew = 0;
    let eh = 0;
    let edpr = 1;

    const motes = [];
    const miniArrows = [];

    function resizeEnv() {
      const frame = document.getElementById('phoneFrame');
      if (!frame) return;
      const rect = frame.getBoundingClientRect();
      edpr = Math.min(2, window.devicePixelRatio || 1);
      ew = Math.max(240, Math.round(rect.width * edpr));
      eh = Math.max(400, Math.round(rect.height * edpr));
      envCanvas.width = ew;
      envCanvas.height = eh;
    }

    resizeEnv();
    window.addEventListener('resize', resizeEnv);

    for (let i = 0; i < 34; i++) {
      motes.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.016,
        vy: -(0.008 + Math.random() * 0.018),
        r: 1.1 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
        speed: 1.1 + Math.random() * 1.8
      });
    }

    for (let i = 0; i < 7; i++) {
      const ang = -Math.PI * 0.35 + (Math.random() - 0.5) * 0.55;
      const spd = 0.022 + Math.random() * 0.026;
      miniArrows.push({
        x: Math.random(),
        y: Math.random(),
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        ang,
        len: 14 + Math.random() * 14,
        alpha: 0.11 + Math.random() * 0.14
      });
    }

    let lastEnvNow = performance.now();
    function envStep(now) {
      if (document.visibilityState === 'hidden') {
        lastEnvNow = now;
        requestAnimationFrame(envStep);
        return;
      }
      const dt = Math.min(0.05, Math.max(0.001, (now - lastEnvNow) / 1000));
      lastEnvNow = now;

      const th = currentTheme();
      const skin = currentArrowSkin();
      ectx.clearRect(0, 0, ew, eh);

      // Soft breathing aurora glow ribbons at top & bottom of sanctuary
      const tSec = now * 0.001;
      const topGlow = ectx.createRadialGradient(
        ew * (0.5 + Math.sin(tSec * 0.45) * 0.18),
        eh * 0.14,
        10,
        ew * 0.5,
        eh * 0.16,
        ew * 0.85
      );
      topGlow.addColorStop(0, th.isLegend ? 'rgba(253, 224, 71, 0.14)' : 'rgba(56, 189, 248, 0.12)');
      topGlow.addColorStop(0.55, th.isLegend ? 'rgba(244, 114, 182, 0.06)' : 'rgba(139, 92, 246, 0.06)');
      topGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ectx.fillStyle = topGlow;
      ectx.fillRect(0, 0, ew, eh);

      // Drifting miniature translucent neon arrows in background
      ectx.save();
      ectx.lineCap = 'round';
      ectx.lineJoin = 'round';
      const arrowStroke = th.isLegend ? '#FDE047' : (skin.tube === 'rainbow' ? '#38BDF8' : skin.tube);
      for (let i = 0; i < miniArrows.length; i++) {
        const ma = miniArrows[i];
        ma.x += ma.vx * dt;
        ma.y += ma.vy * dt;
        if (ma.x > 1.12) ma.x = -0.12;
        if (ma.x < -0.12) ma.x = 1.12;
        if (ma.y > 1.12) ma.y = -0.12;
        if (ma.y < -0.12) ma.y = 1.12;

        const px = ma.x * ew;
        const py = ma.y * eh;
        const L = ma.len * edpr;
        ectx.save();
        ectx.translate(px, py);
        ectx.rotate(ma.ang);
        ectx.globalAlpha = ma.alpha;
        ectx.strokeStyle = arrowStroke;
        ectx.lineWidth = 2.0 * edpr;
        ectx.beginPath();
        ectx.moveTo(-L, 0);
        ectx.lineTo(L * 0.5, 0);
        ectx.moveTo(L * 0.15, -L * 0.28);
        ectx.lineTo(L * 0.55, 0);
        ectx.lineTo(L * 0.15, L * 0.28);
        ectx.stroke();
        ectx.restore();
      }
      ectx.restore();

      // Twinkling fireflies / starlight motes
      ectx.save();
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        if (m.y < -0.04) {
          m.y = 1.04;
          m.x = Math.random();
        }
        if (m.x < -0.04) m.x = 1.04;
        if (m.x > 1.04) m.x = -0.04;

        const twinkle = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(tSec * m.speed + m.phase));
        ectx.globalAlpha = twinkle * 0.58;
        ectx.fillStyle = i % 3 === 0
          ? (th.isLegend ? '#FDE047' : (th.accent || '#38BDF8'))
          : (i % 3 === 1 ? '#E0F2FE' : '#C4B5FD');
        ectx.beginPath();
        ectx.arc(m.x * ew, m.y * eh, m.r * edpr, 0, Math.PI * 2);
        ectx.fill();
      }
      ectx.restore();

      requestAnimationFrame(envStep);
    }

    requestAnimationFrame(envStep);
  }

  // Native Android APK environment detection & Back button bridge
  const isInsideNativeAndroidApk = window.location.href.indexOf('android_asset') !== -1;
  if (isInsideNativeAndroidApk) {
    ['btnHomeTopDownload', 'btnHomeDownloadOffline', 'btnDownloadOfflineGame'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  }

  window.__handleAndroidBack = function () {
    const openModals = Array.from(document.querySelectorAll('.modal-backdrop.open'))
      .filter((m) => m.id !== 'modalWelcomeName');
    if (openModals.length > 0) {
      const topModal = openModals.sort((a, b) => (Number(b.style.zIndex) || 0) - (Number(a.style.zIndex) || 0))[0];
      if (topModal && topModal.id !== 'modalContinue') {
        closeModal(topModal.id);
        return 'closed_modal';
      }
    }
    if (activeScreen === 'play') {
      showScreen('home');
      return 'went_home';
    }
    return 'exit_ok';
  };

  // Boot!
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js?v=17').catch(() => {});
  }

  window.addEventListener('resize', () => {
    if (activeScreen === 'play') resizeBoard();
  });

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#admin') openSecretAdminEntry();
  });

  window.addEventListener('storage', (e) => {
    if (!e) return;
    if (e.key === 'arrow_admin_ping_v1' && adminSessionToken) {
      openAdminControlPanel(true);
    } else if (e.key === 'arrow_player_order_ping_v1') {
      pollMyPaymentOrders(false);
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      pollMyPaymentOrders(false);
      if (adminSessionToken && document.getElementById('modalAdminPanel').classList.contains('open')) {
        openAdminControlPanel(true);
      }
    }
  });

  applySettings();
  initPointerControls();
  initLivingEnvironmentBackdrop();
  wireButtons();
  refreshPaymentConfig();
  syncAccountWithServer();
  pollMyPaymentOrders(false);

  const startLv = getFallbackPlayableLevel();
  const initialData = ArrowGenerator.generateCampaignLevel(startLv);
  setupBoardFromData(initialData);
  showScreen('home');
  checkSecretAdminUrl();
  checkStartupPlayerNamePrompt();

  // Auto-sync pending UTR / Card approvals every 3 seconds when awaiting approval or viewing store/admin
  setInterval(() => {
    const hasPending = Array.isArray(state.recentOrders) && state.recentOrders.some((o) => o.status === 'pending_approval');
    const storeOrCheckoutOpen =
      document.getElementById('modalGems').classList.contains('open') ||
      document.getElementById('modalCheckout').classList.contains('open');
    if (hasPending || storeOrCheckoutOpen) {
      pollMyPaymentOrders(false);
    }
    const adminModalEl = document.getElementById('modalAdminPanel');
    const typingInsideAdmin = adminModalEl && adminModalEl.contains(document.activeElement) &&
      (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA');
    if (adminSessionToken && adminModalEl.classList.contains('open') && !typingInsideAdmin) {
      openAdminControlPanel(true);
    }
  }, 3000);

  setInterval(() => {
    if (activeScreen === 'play' && !game.completed && !document.querySelector('.modal-backdrop.open')) {
      game.elapsedSec = Math.floor((performance.now() - game.startTimeMs) / 1000);
      if (game.isDailyArena || game.campaign?.task?.type === 'speed') {
        updateHeaderAndHud();
      }
    }
  }, 150);
})();
