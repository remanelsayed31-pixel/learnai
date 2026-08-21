(function () {
  "use strict";
  var LearnAI = window.LearnAI;
  var State = LearnAI.State;
  var UI = LearnAI.UI;
  var Views = LearnAI.Views;

  var app = document.getElementById("app");

  function route() {
    UI.toast && clearToasts();
    LearnAI.Speech.stop();
    var hash = location.hash || "#/";
    var parts = hash.replace(/^#\//, "").split("/");
    var page = parts[0] || "home";
    var param = parts[1] || null;

    app.innerHTML = "";
    window.scrollTo(0, 0);
    setActiveNav(page);

    try {
      if (page === "home" || page === "") Views.home(app);
      else if (page === "learn") Views.learn(app);
      else if (page === "lesson" && param) Views.lesson(app, param);
      else if (page === "progress") Views.progress(app);
      else Views.home(app);
    } catch (err) {
      app.innerHTML = "";
      var fallback = document.createElement("div");
      fallback.className = "page-wrap section";
      fallback.innerHTML = "<div class='card' style='text-align:center'><h2>🤖 Oops!</h2><p>Something went wrong. Let's go home and try again.</p><a class='btn purple' href='#/' style='margin-top:14px'>🏠 Back Home</a></div>";
      app.appendChild(fallback);
      if (window.console && console.error) console.error(err);
    }
    updateXPPill();
  }

  function clearToasts() {
    var root = document.getElementById("toast-root");
    if (!root) return;
    while (root.firstChild) root.removeChild(root.firstChild);
  }

  function setActiveNav(page) {
    var map = { home: "home", learn: "learn", lesson: "learn", progress: "progress" };
    var key = map[page];
    document.querySelectorAll(".mainnav a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-nav") === key);
    });
  }

  function updateXPPill() {
    var val = document.getElementById("xp-value");
    if (val) {
      var target = State.get().xp;
      animateNumber(val, parseInt(val.textContent, 10) || 0, target);
    }
  }

  function animateNumber(node, from, to) {
    if (from === to) { node.textContent = String(to); return; }
    var steps = Math.min(20, Math.abs(to - from));
    var i = 0;
    var timer = setInterval(function () {
      i++;
      node.textContent = String(Math.round(from + (to - from) * (i / steps)));
      if (i >= steps) clearInterval(timer);
    }, 30);
  }

  function wireChrome() {
    var menuBtn = document.getElementById("menu-toggle");
    var nav = document.getElementById("mainnav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.addEventListener("click", function (e) {
        if (e.target.closest("a")) {
          nav.classList.remove("open");
          menuBtn.setAttribute("aria-expanded", "false");
        }
      });
    }

    var soundBtn = document.getElementById("sound-toggle");
    var soundIcon = document.getElementById("sound-icon");

    function paintSoundIcon() {
      if (!soundIcon) return;
      soundIcon.textContent = State.get().soundOn ? "🔔" : "🔕";
      soundBtn.title = State.get().soundOn ? "Sound is ON" : "Sound is OFF";
    }
    if (soundBtn && soundIcon) {
      soundBtn.addEventListener("click", function () {
        var on = !State.get().soundOn;
        State.get().soundOn = on;
        State.save();
        LearnAI.Sound.setEnabled(on);
        if (!on) LearnAI.Speech.stop();
        paintSoundIcon();
        if (on) LearnAI.Sound.play("pop");
      });
    }
    LearnAI.Sound.setEnabled(State.get().soundOn);
    paintSoundIcon();

    window.addEventListener("hashchange", route);

    State.on(function (evt) {
      if (evt.type === "xp") updateXPPill();
      if (evt.type === "levelup") {
        LearnAI.Sound.play("levelup");
        UI.confetti(150);
        UI.rewardModal({
          emoji: "🎊",
          title: "LEVEL " + evt.level + "!",
          text: "You reached the rank of \"" + evt.name + "\"! Your brain is glowing!",
          buttonText: "Keep Exploring!"
        });
      }
      if (evt.type === "badge") {
        var b = State.BADGES[evt.id];
        LearnAI.Sound.play("badge");
        UI.toast("🏅 Badge earned: " + b.title + "!", "gold");
      }
    });

    setInterval(function () {
      if (!document.hidden) State.addTime(15);
    }, 15000);
  }

  State.updateStreak();
  wireChrome();
  route();
})();
