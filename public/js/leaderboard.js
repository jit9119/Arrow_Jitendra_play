(function (root) {
  'use strict';

  const LEAGUES = [
    { id: 'bronze', name: 'Bronze', icon: '🥉', color: '#CD7F32', minPts: 0, nextPts: 600, rewardGems: 15 },
    { id: 'silver', name: 'Silver', icon: '🥈', color: '#CBD5E1', minPts: 600, nextPts: 1500, rewardGems: 30 },
    { id: 'gold', name: 'Gold', icon: '🥇', color: '#FBBF24', minPts: 1500, nextPts: 3000, rewardGems: 60 },
    { id: 'diamond', name: 'Diamond', icon: '💎', color: '#38BDF8', minPts: 3000, nextPts: 5000, rewardGems: 120 },
    { id: 'legend', name: 'Legend', icon: '👑', color: '#F59E0B', minPts: 5000, nextPts: null, rewardGems: 250 }
  ];

  const FALLBACK_SEEDS = [
    { playerId: 'seed-01', friendCode: 'ARENA-A1R9', name: 'Aarav_99', avatar: '🦅', city: 'Jaipur, IN', score: 5420, weeklyPoints: 5420, levelsCleared: 38, flawlessCount: 24, bestCombo: 14, albumCount: 38 },
    { playerId: 'seed-02', friendCode: 'ARENA-M2Y7', name: 'MeeraGlow', avatar: '🦋', city: 'Mumbai, IN', score: 4890, weeklyPoints: 3620, levelsCleared: 33, flawlessCount: 21, bestCombo: 12, albumCount: 33 },
    { playerId: 'seed-03', friendCode: 'ARENA-K3B5', name: 'KabirZen', avatar: '🐯', city: 'Delhi, IN', score: 3910, weeklyPoints: 2150, levelsCleared: 28, flawlessCount: 16, bestCombo: 11, albumCount: 28 },
    { playerId: 'seed-04', friendCode: 'ARENA-R4Y2', name: 'RiyaFlow', avatar: '🪷', city: 'Bengaluru, IN', score: 3180, weeklyPoints: 1640, levelsCleared: 22, flawlessCount: 14, bestCombo: 9, albumCount: 22 },
    { playerId: 'seed-05', friendCode: 'ARENA-D5V8', name: 'Dev_Neon', avatar: '🚀', city: 'Pune, IN', score: 2540, weeklyPoints: 980, levelsCleared: 18, flawlessCount: 10, bestCombo: 8, albumCount: 18 },
    { playerId: 'seed-06', friendCode: 'ARENA-A6N4', name: 'AnanyaArt', avatar: '🦚', city: 'Udaipur, IN', score: 1960, weeklyPoints: 720, levelsCleared: 14, flawlessCount: 8, bestCombo: 7, albumCount: 14 },
    { playerId: 'seed-07', friendCode: 'ARENA-V7H1', name: 'VihaanX', avatar: '🦊', city: 'Ahmedabad, IN', score: 1420, weeklyPoints: 460, levelsCleared: 10, flawlessCount: 6, bestCombo: 6, albumCount: 10 },
    { playerId: 'seed-08', friendCode: 'ARENA-S8N6', name: 'SanaCalm', avatar: '🌙', city: 'Hyderabad, IN', score: 980, weeklyPoints: 290, levelsCleared: 7, flawlessCount: 4, bestCombo: 5, albumCount: 7 }
  ];

  const FALLBACK_DAILY = [
    { playerId: 'seed-01', name: 'Aarav_99', avatar: '🦅', league: 'Legend', timeMs: 26420, mistakes: 0 },
    { playerId: 'seed-02', name: 'MeeraGlow', avatar: '🦋', league: 'Diamond', timeMs: 31850, mistakes: 0 },
    { playerId: 'seed-03', name: 'KabirZen', avatar: '🐯', league: 'Gold', timeMs: 37910, mistakes: 1 },
    { playerId: 'seed-04', name: 'RiyaFlow', avatar: '🪷', league: 'Gold', timeMs: 43280, mistakes: 0 },
    { playerId: 'seed-05', name: 'Dev_Neon', avatar: '🚀', league: 'Silver', timeMs: 49640, mistakes: 1 },
    { playerId: 'seed-07', name: 'VihaanX', avatar: '🦊', league: 'Bronze', timeMs: 58120, mistakes: 2 }
  ];

  const STORAGE_KEY = 'arrow_arena_local_lb_v8';
  const DAILY_STORAGE_KEY = 'arrow_arena_daily_lb_v8';
  const FRIENDS_STORAGE_KEY = 'arrow_arena_friends_v8';

  function getLeagueForPoints(pts) {
    const p = Number(pts) || 0;
    for (let i = LEAGUES.length - 1; i >= 0; i--) {
      if (p >= LEAGUES[i].minPts) return LEAGUES[i];
    }
    return LEAGUES[0];
  }

  function makeFriendCodeFromId(playerId) {
    const s = String(playerId || 'player');
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i);
    const hex = (h >>> 0).toString(16).toUpperCase().padStart(4, '0').slice(0, 4);
    return `ARENA-${hex}`;
  }

  function sortEntries(entries, tab) {
    const arr = [...entries];
    if (tab === 'levels') {
      arr.sort((a, b) => (b.levelsCleared - a.levelsCleared) || (b.score - a.score));
    } else if (tab === 'combo') {
      arr.sort((a, b) => (b.bestCombo - a.bestCombo) || (b.score - a.score));
    } else if (tab === 'weekly') {
      arr.sort((a, b) => ((b.weeklyPoints || b.score || 0) - (a.weeklyPoints || a.score || 0)));
    } else {
      arr.sort((a, b) => (b.score - a.score) || (b.levelsCleared - a.levelsCleared));
    }
    return arr.map((e, i) => {
      const lg = getLeagueForPoints(e.weeklyPoints !== undefined ? e.weeklyPoints : e.score);
      return {
        ...e,
        friendCode: e.friendCode || makeFriendCodeFromId(e.playerId),
        league: lg.name,
        rank: i + 1
      };
    });
  }

  function getLocalPool() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch (_) {}
    return [...FALLBACK_SEEDS];
  }

  function saveLocalPool(pool) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pool));
    } catch (_) {}
  }

  function upsertLocal(profile) {
    const pool = getLocalPool();
    const idx = pool.findIndex((p) => p.playerId === profile.playerId);
    if (idx >= 0) {
      pool[idx] = { ...pool[idx], ...profile };
    } else {
      pool.push({ ...profile });
    }
    saveLocalPool(pool);
    return pool;
  }

  const LeaderboardClient = {
    isOnlineApi: false,
    LEAGUES,
    getLeagueForPoints,
    makeFriendCodeFromId,

    async fetchBoard(tab, playerProfile) {
      const localPool = playerProfile ? upsertLocal(playerProfile) : getLocalPool();
      if ((window.location.protocol.startsWith('http') && navigator.onLine !== false)) {
        try {
          const q = new URLSearchParams({
            category: tab || 'score',
            playerId: playerProfile?.playerId || ''
          });
          const res = await fetch(`/api/leaderboard?${q.toString()}`, { method: 'GET' });
          if (res.ok) {
            const data = await res.json();
            this.isOnlineApi = true;
            return data;
          }
        } catch (_) {
          this.isOnlineApi = false;
        }
      }
      const ranked = sortEntries(localPool, tab || 'score');
      const me = playerProfile ? ranked.find((e) => e.playerId === playerProfile.playerId) || null : null;
      return {
        category: tab || 'score',
        totalPlayers: ranked.length,
        leaders: ranked,
        me
      };
    },

    async fetchWeeklyLeague(leagueFilter, playerProfile) {
      const localPool = playerProfile ? upsertLocal(playerProfile) : getLocalPool();
      if ((window.location.protocol.startsWith('http') && navigator.onLine !== false)) {
        try {
          const q = new URLSearchParams({
            league: leagueFilter || 'all',
            playerId: playerProfile?.playerId || ''
          });
          const res = await fetch(`/api/weekly-league?${q.toString()}`, { method: 'GET' });
          if (res.ok) {
            this.isOnlineApi = true;
            return await res.json();
          }
        } catch (_) {
          this.isOnlineApi = false;
        }
      }
      const rankedAll = sortEntries(localPool, 'weekly');
      const me = playerProfile ? rankedAll.find((e) => e.playerId === playerProfile.playerId) || null : null;
      const lf = (leagueFilter || 'all').toLowerCase();
      const filtered = lf === 'all'
        ? rankedAll
        : rankedAll.filter((r) => r.league.toLowerCase() === lf).map((r, i) => ({ ...r, leagueRank: i + 1 }));
      return {
        weekKey: 'Current Week',
        leagueFilter: lf,
        leaders: filtered,
        me
      };
    },

    async submitScore(playerProfile) {
      const localPool = upsertLocal(playerProfile);
      if ((window.location.protocol.startsWith('http') && navigator.onLine !== false)) {
        try {
          const res = await fetch('/api/leaderboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(playerProfile)
          });
          if (res.ok) {
            this.isOnlineApi = true;
            return await res.json();
          }
        } catch (_) {
          this.isOnlineApi = false;
        }
      }
      const ranked = sortEntries(localPool, 'score');
      const me = ranked.find((e) => e.playerId === playerProfile.playerId) || null;
      return { ok: true, me, leaders: ranked, totalPlayers: ranked.length };
    },

    async fetchDailyArena(dateKey, playerId) {
      if ((window.location.protocol.startsWith('http') && navigator.onLine !== false)) {
        try {
          const q = new URLSearchParams({ date: dateKey, playerId: playerId || '' });
          const res = await fetch(`/api/daily-arena?${q.toString()}`);
          if (res.ok) {
            this.isOnlineApi = true;
            return await res.json();
          }
        } catch (_) {}
      }
      let map = {};
      try {
        map = JSON.parse(localStorage.getItem(DAILY_STORAGE_KEY) || '{}');
      } catch (_) {}
      const list = Array.isArray(map[dateKey]) ? map[dateKey] : [...FALLBACK_DAILY];
      list.sort((a, b) => (a.timeMs - b.timeMs) || (a.mistakes - b.mistakes));
      const ranked = list.map((e, i) => ({ ...e, rank: i + 1 }));
      const me = ranked.find((e) => e.playerId === playerId) || null;
      return { dateKey, leaders: ranked, me, totalPlayers: ranked.length };
    },

    async submitDailyArena(entry) {
      if ((window.location.protocol.startsWith('http') && navigator.onLine !== false)) {
        try {
          const res = await fetch('/api/daily-arena', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry)
          });
          if (res.ok) {
            this.isOnlineApi = true;
            return await res.json();
          }
        } catch (_) {}
      }
      let map = {};
      try {
        map = JSON.parse(localStorage.getItem(DAILY_STORAGE_KEY) || '{}');
      } catch (_) {}
      const list = Array.isArray(map[entry.dateKey]) ? map[entry.dateKey] : [...FALLBACK_DAILY];
      const ex = list.find((e) => e.playerId === entry.playerId);
      if (ex) {
        if (entry.timeMs < ex.timeMs) {
          ex.timeMs = entry.timeMs;
          ex.mistakes = entry.mistakes;
        }
        ex.name = entry.name;
        ex.avatar = entry.avatar;
        ex.league = entry.league;
      } else {
        list.push({ ...entry });
      }
      map[entry.dateKey] = list;
      try {
        localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(map));
      } catch (_) {}
      list.sort((a, b) => (a.timeMs - b.timeMs) || (a.mistakes - b.mistakes));
      const ranked = list.map((e, i) => ({ ...e, rank: i + 1 }));
      return {
        ok: true,
        dateKey: entry.dateKey,
        me: ranked.find((e) => e.playerId === entry.playerId) || null,
        leaders: ranked
      };
    },

    async registerFriend(profile) {
      if ((window.location.protocol.startsWith('http') && navigator.onLine !== false)) {
        try {
          const res = await fetch('/api/friends/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile)
          });
          if (res.ok) return await res.json();
        } catch (_) {}
      }
      return { ok: true, friendCode: makeFriendCodeFromId(profile.playerId) };
    },

    async fetchFriends(playerId) {
      if ((window.location.protocol.startsWith('http') && navigator.onLine !== false)) {
        try {
          const res = await fetch(`/api/friends?playerId=${encodeURIComponent(playerId)}`);
          if (res.ok) return await res.json();
        } catch (_) {}
      }
      let localFriends = null;
      try {
        localFriends = JSON.parse(localStorage.getItem(FRIENDS_STORAGE_KEY) || 'null');
      } catch (_) {}
      if (!Array.isArray(localFriends) || !localFriends.length) {
        localFriends = FALLBACK_SEEDS.slice(0, 3).map((s) => ({
          playerId: s.playerId,
          friendCode: s.friendCode,
          name: s.name,
          avatar: s.avatar,
          league: getLeagueForPoints(s.weeklyPoints).name,
          score: s.score,
          isBotRival: true
        }));
      }
      return {
        friendCode: makeFriendCodeFromId(playerId),
        friends: localFriends,
        challenges: []
      };
    },

    async addFriend(payload) {
      if ((window.location.protocol.startsWith('http') && navigator.onLine !== false)) {
        try {
          const res = await fetch('/api/friends/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const data = await res.json();
          if (res.ok) return data;
          return { ok: false, error: data.error || 'Could not add friend' };
        } catch (_) {}
      }
      const cur = await this.fetchFriends(payload.playerId);
      const code = String(payload.targetCode || '').trim().toUpperCase();
      if (!code) return { ok: false, error: 'Enter a valid Friend Code' };
      const seedMatch = FALLBACK_SEEDS.find((s) => s.friendCode === code);
      const friendObj = seedMatch
        ? {
            playerId: seedMatch.playerId,
            friendCode: seedMatch.friendCode,
            name: seedMatch.name,
            avatar: seedMatch.avatar,
            league: getLeagueForPoints(seedMatch.weeklyPoints).name,
            score: seedMatch.score,
            isBotRival: true
          }
        : {
            playerId: 'ext-' + code.toLowerCase(),
            friendCode: code,
            name: payload.targetName || ('Friend ' + code.slice(-4)),
            avatar: '🐯',
            league: 'Gold',
            score: 1200,
            isBotRival: false
          };
      const next = [friendObj, ...cur.friends.filter((f) => f.friendCode !== code)];
      try {
        localStorage.setItem(FRIENDS_STORAGE_KEY, JSON.stringify(next));
      } catch (_) {}
      return { ok: true, friend: friendObj, friendCode: cur.friendCode };
    },

    async createChallenge(payload) {
      if ((window.location.protocol.startsWith('http') && navigator.onLine !== false)) {
        try {
          const res = await fetch('/api/challenges/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (res.ok) return await res.json();
        } catch (_) {}
      }
      return {
        ok: true,
        room: {
          roomId: payload.roomId || ('duel_' + Math.random().toString(36).slice(2, 8)),
          levelNum: payload.levelNum || 1,
          isDailyArena: Boolean(payload.isDailyArena),
          hostId: payload.playerId,
          hostName: payload.hostName,
          hostAvatar: payload.hostAvatar,
          guestCode: payload.guestCode || '',
          guestName: payload.guestName || 'Friend',
          guestAvatar: payload.guestAvatar || '🦅',
          players: {}
        }
      };
    },

    async syncChallenge(payload) {
      if ((window.location.protocol.startsWith('http') && navigator.onLine !== false)) {
        try {
          const res = await fetch('/api/challenges/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (res.ok) return await res.json();
        } catch (_) {}
      }
      return null;
    }
  };

  root.LeaderboardClient = LeaderboardClient;
})(typeof self !== 'undefined' ? self : this);
