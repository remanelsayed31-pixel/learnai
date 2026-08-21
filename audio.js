(function () {
  "use strict";
  window.LearnAI = window.LearnAI || {};

  var ctx = null;
  var enabled = true;

  function getCtx() {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, start, dur, type, vol) {
    var c = getCtx();
    if (!c) return;
    var osc = c.createOscillator();
    var gain = c.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, c.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(vol || 0.18, c.currentTime + start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(c.currentTime + start);
    osc.stop(c.currentTime + start + dur + 0.05);
  }

  var recipes = {
    click: function () { tone(520, 0, 0.08, "triangle", 0.12); },
    pop: function () { tone(660, 0, 0.07, "sine", 0.14); tone(880, 0.05, 0.09, "sine", 0.12); },
    flip: function () { tone(340, 0, 0.06, "triangle", 0.1); tone(500, 0.04, 0.07, "triangle", 0.1); },
    correct: function () {
      tone(523.25, 0, 0.14, "triangle", 0.2);
      tone(659.25, 0.1, 0.14, "triangle", 0.2);
      tone(783.99, 0.2, 0.24, "triangle", 0.22);
    },
    wrong: function () { tone(196, 0, 0.22, "square", 0.07); tone(165, 0.14, 0.28, "square", 0.06); },
    win: function () {
      var notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach(function (n, i) { tone(n, i * 0.11, 0.22, "triangle", 0.2); });
      tone(1318.5, 0.48, 0.4, "sine", 0.16);
    },
    levelup: function () {
      [392, 523.25, 659.25, 783.99, 1046.5].forEach(function (n, i) {
        tone(n, i * 0.09, 0.26, "sine", 0.2);
      });
    },
    badge: function () {
      tone(880, 0, 0.12, "sine", 0.18);
      tone(1108.7, 0.1, 0.12, "sine", 0.18);
      tone(1318.5, 0.2, 0.34, "sine", 0.2);
    }
  };

  var Sound = {
    setEnabled: function (v) { enabled = !!v; },
    isEnabled: function () { return enabled; },
    play: function (name) {
      if (!enabled) return;
      try {
        if (recipes[name]) recipes[name]();
      } catch (e) { /* audio unavailable */ }
    }
  };

  var Speech = {
    supported: !!(window.speechSynthesis && window.SpeechSynthesisUtterance),
    say: function (text) {
      if (!this.supported) return;
      window.speechSynthesis.cancel();
      var u = new window.SpeechSynthesisUtterance(text.replace(/[🤖📚🎮❓🧩⭐🎨🧠🛡️🚀🔍🎙️🦾✨🎓🔮🃏🛠️⚡🌟🏆🎉💡🔊]/gu, ""));
      u.rate = 0.95;
      u.pitch = 1.15;
      u.lang = "en-US";
      window.speechSynthesis.speak(u);
    },
    stop: function () {
      if (this.supported) window.speechSynthesis.cancel();
    }
  };

  LearnAI.Sound = Sound;
  LearnAI.Speech = Speech;
})();
