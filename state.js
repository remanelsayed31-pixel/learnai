(function () {
  "use strict";
  var LearnAI = window.LearnAI = window.LearnAI || {};

  var KEY = "ai-explorers-save-v1";

  var LEVELS = [
    { min: 0, name: "Curious Cub" },
    { min: 100, name: "Bit Beginner" },
    { min: 250, name: "Data Explorer" },
    { min: 450, name: "Pattern Finder" },
    { min: 700, name: "Smart Thinker" },
    { min: 1000, name: "AI Whiz Kid" },
    { min: 1400, name: "Tech Tinkerer" },
    { min: 1900, name: "Robot Trainer" },
    { min: 2500, name: "Machine Mentor" },
    { min: 3200, name: "Future Inventor" }
  ];

  var BADGES = {
    "ai-beginner": { emoji: "🌱", title: "AI Beginner", how: "Finish your first lesson" },
    "smart-explorer": { emoji: "🧭", title: "Smart Explorer", how: "Finish 3 lessons" },
    "ml-hero": { emoji: "🦸", title: "Machine Learning Hero", how: "Perfect score in the Machine Learning quiz" },
    "quiz-whiz": { emoji: "🧠", title: "Quiz Whiz", how: "Get 100% on any lesson quiz" },
    "streak-star": { emoji: "🔥", title: "Streak Star", how: "Learn 3 days in a row" },
    "safe-surfing": { emoji: "🛡️", title: "Safety Star", how: "Finish the AI Safety lesson" }
  };

  function defaults() {
    return {
      xp: 0,
      completedLessons: [],
      lessonQuizScores: {},
      badges: [],
      streak: { count: 0, lastDay: null, days: [] },
      timeSpent: 0,
      questionsAnswered: 0,
      correctAnswers: 0,
      soundOn: true
    };
  }

  var state = load();

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        var d = defaults();
        for (var k in d) {
          if (parsed[k] === undefined) parsed[k] = d[k];
        }
        return parsed;
      }
    } catch (e) { /* corrupted save */ }
    return defaults();
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage full */ }
  }

  function levelInfo(xp) {
    var current = LEVELS[0];
    var next = null;
    for (var i = 0; i < LEVELS.length; i++) {
      if (xp >= LEVELS[i].min) current = LEVELS[i];
    }
    for (var j = 0; j < LEVELS.length; j++) {
      if (LEVELS[j].min > xp) { next = LEVELS[j]; break; }
    }
    var idx = LEVELS.indexOf(current);
    var spanStart = current.min;
    var spanEnd = next ? next.min : current.min + 1;
    var pct = next ? Math.min(100, Math.round(((xp - spanStart) / (spanEnd - spanStart)) * 100)) : 100;
    return { level: idx + 1, name: current.name, intoNext: xp - spanStart, span: spanEnd - spanStart, pct: pct, next: next };
  }

  var listeners = [];

  function emit(evt) {
    listeners.forEach(function (fn) { fn(evt); });
    save();
  }

  function on(fn) { listeners.push(fn); }

  function addXP(amount, reason) {
    var beforeLevel = levelInfo(state.xp).level;
    state.xp += amount;
    var after = levelInfo(state.xp);
    emit({ type: "xp", amount: amount });
    if (after.level > beforeLevel) {
      emit({ type: "levelup", level: after.level, name: after.name });
    }
    if (reason) emit({ type: "toast", message: reason + " +" + amount + " XP!", kind: "gold" });
  }

  function awardBadge(id) {
    if (!BADGES[id] || state.badges.indexOf(id) !== -1) return false;
    state.badges.push(id);
    emit({ type: "badge", id: id });
    return true;
  }

  function hasBadge(id) { return state.badges.indexOf(id) !== -1; }

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function dayDiff(a, b) {
    var da = new Date(a), db = new Date(b);
    return Math.round((db - da) / 86400000);
  }

  function updateStreak() {
    var today = todayStr();
    if (state.streak.lastDay === today) return;
    var diff = state.streak.lastDay ? dayDiff(state.streak.lastDay, today) : 99;
    state.streak.count = diff === 1 ? state.streak.count + 1 : 1;
    state.streak.lastDay = today;
    if (state.streak.days.indexOf(today) === -1) state.streak.days.push(today);
    if (state.streak.days.length > 30) state.streak.days.shift();
    if (state.streak.count >= 3) awardBadge("streak-star");
    emit({ type: "streak" });
  }

  function last7Days() {
    var out = [];
    for (var i = 6; i >= 0; i--) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      var key = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
      out.push({
        key: key,
        label: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()],
        active: state.streak.days.indexOf(key) !== -1
      });
    }
    return out;
  }

  function completeLesson(id) {
    if (state.completedLessons.indexOf(id) !== -1) return false;
    state.completedLessons.push(id);
    addXP(50);
    if (state.completedLessons.length >= 1) awardBadge("ai-beginner");
    if (state.completedLessons.length >= 3) awardBadge("smart-explorer");
    emit({ type: "lesson-complete", id: id });
    return true;
  }

  function recordQuiz(topicId, correct, total) {
    var prev = state.lessonQuizScores[topicId];
    if (!prev || correct / total > prev.correct / prev.total) {
      state.lessonQuizScores[topicId] = { correct: correct, total: total };
    }
    state.questionsAnswered += total;
    state.correctAnswers += correct;
    var points = correct * 10;
    if (correct === total) {
      points += 20;
      awardBadge("quiz-whiz");
    }
    addXP(points);
    emit({ type: "quiz-done", topicId: topicId, correct: correct, total: total });
    return points;
  }

  function recordAnswer(correct) {
    state.questionsAnswered++;
    if (correct) state.correctAnswers++;
  }

  function addTime(seconds) {
    state.timeSpent += seconds;
    save();
  }

  LearnAI.State = {
    get: function () { return state; },
    save: save,
    on: on,
    addXP: addXP,
    awardBadge: awardBadge,
    hasBadge: hasBadge,
    BADGES: BADGES,
    LEVELS: LEVELS,
    levelInfo: levelInfo,
    updateStreak: updateStreak,
    last7Days: last7Days,
    todayStr: todayStr,
    completeLesson: completeLesson,
    recordQuiz: recordQuiz,
    recordAnswer: recordAnswer,
    addTime: addTime
  };
})();
