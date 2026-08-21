(function () {
  "use strict";
  var LearnAI = window.LearnAI;
  var UI = LearnAI.UI;
  var el = UI.el;
  var D = LearnAI.DATA;
  var State = LearnAI.State;

  var PRAISE = ["Awesome! 🎉", "Great Job! 🌟", "You're an AI Explorer! 🚀", "Super smart! 💡", "Fantastic! ✨", "Brilliant! 🧠"];
  var RETRY_MSG = ["Almost! You'll get the next one! 💪", "Good try! Keep going! 🌱"];

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function sectionHead(kicker, title, sub) {
    var head = el("div", { class: "section-head" });
    if (kicker) head.appendChild(el("span", { class: "chip purple kicker", textContent: kicker }));
    head.appendChild(el("h2", { textContent: title }));
    if (sub) head.appendChild(el("p", { textContent: sub }));
    return head;
  }

  function readRow(text) {
    var row = el("div", { style: "margin-top:14px;display:flex;justify-content:center" });
    row.appendChild(UI.readBtn(text));
    return row;
  }

  /* ---------------- QUIZ ENGINE ---------------- */

  function quizQuestion(container, q, index, total, onAnswered) {
    container.innerHTML = "";
    var box = el("div", { class: "quiz-box step-card" });
    var prog = el("div", { class: "quiz-progress" });
    var fill = el("div", { class: "progress-track", style: "flex:1" }, [el("div", { class: "progress-fill", style: "width:" + ((index) / total * 100) + "%" })]);
    prog.appendChild(el("b", { textContent: "Question " + (index + 1) + " of " + total }));
    prog.appendChild(fill);
    box.appendChild(prog);

    var qHead = el("div");
    qHead.appendChild(el("div", { class: "quiz-q", textContent: q.q }));
    qHead.appendChild(UI.readBtn(q.q));
    box.appendChild(qHead);

    var options = el("div", { class: "options" });
    var answered = false;
    var letters = ["A", "B", "C", "D"];
    q.options.forEach(function (opt, i) {
      var btn = el("button", {
        class: "option-btn",
        type: "button",
        onclick: function () {
          if (answered) return;
          answered = true;
          State.recordAnswer(i === q.answer);
          Array.prototype.forEach.call(options.children, function (b, bi) {
            b.disabled = true;
            if (bi === q.answer) b.classList.add("correct");
            else if (bi === i && i !== q.answer) b.classList.add("wrong");
          });
          var fb;
          if (i === q.answer) {
            LearnAI.Sound.play("correct");
            UI.confetti(40);
            fb = el("div", { class: "feedback good" }, [
              el("span", { class: "fb-emoji", textContent: "🎉" }),
              el("div", {}, [
                el("div", { textContent: pick(PRAISE) }),
                el("div", { textContent: q.explain, style: "font-weight:600;margin-top:4px" })
              ])
            ]);
          } else {
            LearnAI.Sound.play("wrong");
            fb = el("div", { class: "feedback bad" }, [
              el("span", { class: "fb-emoji", textContent: "🤔" }),
              el("div", {}, [
                el("div", { textContent: pick(RETRY_MSG) }),
                el("div", { textContent: q.explain, style: "font-weight:600;margin-top:4px" })
              ])
            ]);
          }
          box.appendChild(fb);
          setTimeout(function () { onAnswered(i === q.answer); }, i === q.answer ? 1600 : 2600);
        }
      }, [
        el("span", { class: "opt-key", textContent: letters[i] }),
        el("span", { textContent: opt })
      ]);
      options.appendChild(btn);
    });
    box.appendChild(options);
    container.appendChild(box);
  }

  function quizResult(container, correct, total, opts) {
    var pct = Math.round(correct / total * 100);
    var stars = pct >= 90 ? 3 : pct >= 60 ? 2 : 1;
    var starStr = "";
    for (var i = 0; i < 3; i++) starStr += '<span class="' + (i < stars ? "" : "off") + '">⭐</span>';
    container.innerHTML = "";
    var box = el("div", { class: "step-card score-hero" });

    if (pct === 100) UI.confetti(140);
    else if (pct >= 60) UI.confetti(70);

    box.appendChild(el("div", {
      class: "score-ring",
      html: '<div>' + correct + "/" + total + "</div>",
      style: "--pct:" + pct
    }));
    box.appendChild(el("div", { class: "stars", html: starStr }));

    var msg = pct === 100 ? "PERFECT SCORE! You're an AI genius!" :
      pct >= 60 ? "Great work, explorer!" : "Nice try - practice makes perfect!";
    box.appendChild(el("h2", { textContent: msg }));
    box.appendChild(el("p", { textContent: opts.doneText || "Your brain is getting smarter every day!" }));

    var row = el("div", { class: "btn-row", style: "margin-top:24px" });
    if (opts.againHref) row.appendChild(el("a", { class: "btn secondary", href: opts.againHref }, ["🔁 Try Again"]));
    (opts.actions || []).forEach(function (a) {
      row.appendChild(el("a", { class: "btn purple", href: a.href }, [a.label]));
    });
    box.appendChild(row);
    container.appendChild(box);
    LearnAI.Sound.play("win");
  }

  function runQuiz(container, questions, opts) {
    var idx = 0, correct = 0;
    function next() {
      if (idx >= questions.length) {
        var points = State.recordQuiz(opts.topicId, correct, questions.length);
        if (opts.onComplete) opts.onComplete(correct, questions.length);
        quizResult(container, correct, questions.length, opts.result(correct));
        UI.toast("Quiz complete! +" + points + " XP ⚡", "gold");
        return;
      }
      quizQuestion(container, questions[idx], idx, questions.length, function (wasCorrect) {
        if (wasCorrect) correct++;
        idx++;
        next();
      });
    }
    next();
  }

  /* ---------------- HOME ---------------- */

  function renderHome(root) {
    var v = el("div", { class: "view" });

    var hero = el("section", { class: "hero" });
    hero.appendChild(el("div", { class: "blob", style: "width:300px;height:300px;background:#8b5cf6;top:-80px;left:-60px" }));
    hero.appendChild(el("div", { class: "blob", style: "width:280px;height:280px;background:#ffc53d;bottom:-100px;right:-40px" }));

    var inner = el("div", { class: "hero-inner" });
    var copy = el("div", { class: "hero-copy" });
    copy.appendChild(el("span", { class: "chip yellow", textContent: "🚀 The fun way to learn AI • Ages 6–12" }));
    copy.appendChild(el("h1", { html: 'Learn AI.<br>Discover. <span class="hl">Create!</span>' }));
    copy.appendChild(el("p", { class: "hero-sub", textContent: "Explore the amazing world of Artificial Intelligence through fun stories, animations and quizzes." }));

    var ctas = el("div", { class: "btn-row", style: "justify-content:flex-start" });
    ctas.appendChild(el("a", { class: "btn big", href: "#/learn" }, ["🎓 Start Learning"]));
    ctas.appendChild(el("a", { class: "btn secondary big", href: "#/progress" }, ["⭐ See My Progress"]));
    copy.appendChild(ctas);

    var hb = el("div", { class: "hero-badges" });
    hb.appendChild(el("span", { class: "chip green", textContent: "🏆 Earn Badges" }));
    hb.appendChild(el("span", { class: "chip blue", textContent: "⚡ Collect XP" }));
    hb.appendChild(el("span", { class: "chip pink", textContent: "🔥 Daily Streaks" }));
    copy.appendChild(hb);

    var art = el("div", { class: "hero-art" });
    art.innerHTML = UI.mascotSVG(340);
    art.appendChild(el("div", { class: "float-tag t1", textContent: "👋 Hi! I'm Sparky!" }));
    art.appendChild(el("div", { class: "float-tag t2", textContent: "🧠 Let's learn AI!" }));
    art.appendChild(el("div", { class: "float-tag t3", textContent: "⚡ +50 XP" }));

    inner.appendChild(copy);
    inner.appendChild(art);
    hero.appendChild(inner);
    v.appendChild(hero);

    var facts = D.FUN_FACTS;
    var wrap = el("div", { class: "page-wrap" });

    var factCard = el("div", {
      class: "card",
      style: "margin-top:-46px;text-align:center;z-index:5;border-left:8px solid var(--yellow)"
    });
    factCard.appendChild(el("h3", { textContent: "💡 Fun Fact of the Day" }));
    factCard.appendChild(el("p", { style: "font-size:1.15rem;font-weight:700;color:var(--purple-deep);margin-top:6px", textContent: facts[new Date().getDate() % facts.length] }));
    wrap.appendChild(factCard);

    var featSec = el("section", { class: "section" });
    featSec.appendChild(sectionHead("START HERE", "Pick Your Adventure!", "Two fun ways to become an AI expert"));
    var grid = el("div", { class: "grid cols-2" });
    [
      { href: "#/learn", icon: "📚", title: "Learn AI", text: "10 exciting lessons with stories, animations and quizzes." },
      { href: "#/progress", icon: "⭐", title: "My Progress", text: "Watch your XP grow and collect all the badges!" }
    ].forEach(function (f) {
      var c = el("a", { class: "feature-card", href: f.href });
      c.appendChild(el("div", { class: "fc-icon", textContent: f.icon }));
      c.appendChild(el("h3", { textContent: f.title }));
      c.appendChild(el("p", { textContent: f.text }));
      grid.appendChild(c);
    });
    featSec.appendChild(grid);
    wrap.appendChild(featSec);

    var readySec = el("section", { class: "section", style: "text-align:center;padding-bottom:70px" });
    var rc = el("div", { class: "card", style: "background:linear-gradient(135deg,var(--purple-deep),var(--blue));color:#fff;padding:48px 30px" });
    rc.innerHTML = "<h2 style='color:#fff'>Ready to become an AI Explorer?</h2>";
    rc.appendChild(el("p", { style: "color:#e6e2ff;margin:10px 0 26px;font-weight:600", textContent: "Start with your first lesson and earn the AI Beginner badge today!" }));
    rc.appendChild(el("a", { class: "btn secondary big", href: "#/learn" }, ["🚀 Start My Adventure"]));
    readySec.appendChild(rc);
    wrap.appendChild(readySec);

    v.appendChild(wrap);
    root.appendChild(v);
  }

  /* ---------------- LEARN LIST ---------------- */

  function renderLearn(root) {
    var v = el("div", { class: "view page-wrap" });
    v.appendChild(sectionHead("LESSONS", "AI Learning Adventures", "Complete lessons to earn XP, stars and badges!"));

    var st = State.get();
    var grid = el("div", { class: "grid cols-3" });
    D.LESSONS.forEach(function (l, i) {
      var done = st.completedLessons.indexOf(l.id) !== -1;
      var score = st.lessonQuizScores[l.id];
      var card = el("a", { class: "lesson-card" + (done ? " done" : ""), href: "#/lesson/" + l.id });
      if (done) card.appendChild(el("span", { class: "lc-done-stamp", textContent: "✓ Complete" }));
      var banner = el("div", { class: "lc-banner", style: "background:linear-gradient(135deg," + l.color + "22," + l.color + "55)" });
      banner.appendChild(el("span", { textContent: l.emoji }));
      card.appendChild(banner);
      var body = el("div", { class: "lc-body" });
      body.appendChild(el("h3", { textContent: l.title }));
      body.appendChild(el("p", { textContent: l.tagline }));
      var foot = el("div", { class: "lc-foot" });
      foot.appendChild(el("span", { class: "chip", textContent: "⏱️ ~" + l.minutes + " min" }));
      foot.appendChild(el("span", { class: "chip " + (done ? "green" : "blue"), textContent: done ? "⭐ " + (score ? score.correct + "/" + score.total : "Done!") : "▶ Start" }));
      body.appendChild(foot);
      if (done && score) {
        body.appendChild(el("div", { class: "progress-track" }, [el("div", { class: "progress-fill", style: "width:" + Math.round(score.correct / score.total * 100) + "%" })]));
      }
      card.appendChild(body);
      card.style.animationDelay = (i * 0.05) + "s";
      card.setAttribute("style", (card.getAttribute("style") || "") + ";animation:rise .5s ease both");
      grid.appendChild(card);
    });
    v.appendChild(grid);
    root.appendChild(v);
  }

  /* ---------------- LESSON PLAYER ---------------- */

  function renderLesson(root, id) {
    var lesson = D.getLesson(id);
    if (!lesson) { location.hash = "#/learn"; return; }

    var stages = [];
    lesson.steps.forEach(function (s) { stages.push({ type: s.type }); });
    stages.push({ type: "quiz" });

    var v = el("div", { class: "view" });
    var topBar = el("div", { class: "page-wrap", style: "display:flex;justify-content:space-between;align-items:center;margin-top:20px;gap:12px;flex-wrap:wrap" });
    topBar.appendChild(el("a", { class: "btn small secondary", href: "#/learn" }, ["← All Lessons"]));
    topBar.appendChild(el("span", { class: "chip", textContent: lesson.emoji + " " + lesson.title }));
    v.appendChild(topBar);

    var dots = el("div", { class: "stage-dots page-wrap", style: "justify-content:center" });
    v.appendChild(dots);
    var stage = el("div", { class: "lesson-stage page-wrap", id: "lesson-stage" });
    v.appendChild(stage);
    root.appendChild(v);

    var current = 0;

    function drawDots() {
      dots.innerHTML = "";
      stages.forEach(function (s, i) {
        dots.appendChild(el("span", { class: "stage-dot" + (i === current ? " active" : i < current ? " complete" : "") }));
      });
    }

    function animHTML(kind) {
      if (!kind) return "";
      if (kind === "think") return '<div class="anim-scene"><div class="thinking-dots"><i></i><i></i><i></i></div><p style="margin-top:14px;font-weight:700">Thinking...</p></div>';
      if (kind === "pixels") {
        var px = '<div class="anim-scene"><div class="pixel-canvas">';
        var colors = ["#ff6b9d", "#ffc53d", "#63d3ff", "#8b5cf6", "#34c77b", "#ff9f43"];
        for (var i = 0; i < 64; i++) {
          px += '<i style="animation-delay:' + (i * 0.02) + 's;background:' + colors[i % colors.length] + ';opacity:' + (0.35 + (i % 5) * 0.13) + '"></i>';
        }
        return px + "</div><p style='margin-top:14px;font-weight:700'>Noise becomes a picture! ✨</p></div>";
      }
      if (kind === "voice") {
        var bars = '<div class="anim-scene"><div class="sound-bars">';
        for (var j = 0; j < 9; j++) bars += '<i style="animation-delay:' + (j * 0.08) + 's;height:' + (12 + (j % 4) * 14) + 'px"></i>';
        return bars + '</div><p style="margin-top:14px;font-weight:700">Listening... 👂</p></div>';
      }
      if (kind === "robot") return '<div class="anim-scene light"><div class="pattern-line"><span>👀</span><span>➡️</span><span>🧠</span><span>➡️</span><span>🦾</span></div><p style="margin-top:12px;font-weight:700">Sense → Decide → Act!</p></div>';
      if (kind === "pattern") return '<div class="anim-scene light"><div class="pattern-line"><span>🍎</span><span>🍌</span><span>🍎</span><span>🍌</span><span class="q">❓</span></div><p style="margin-top:12px;font-weight:700">Can you spot the pattern?</p></div>';
      return "";
    }

    function showStage(i) {
      current = i;
      drawDots();
      window.scrollTo({ top: 0, behavior: "smooth" });
      stage.innerHTML = "";

      if (stages[i].type === "quiz") {
        var intro = el("div", { class: "step-card" });
        intro.appendChild(el("span", { class: "step-emoji", textContent: "🏁" }));
        intro.appendChild(el("h2", { textContent: "Final Quiz Time!" }));
        intro.appendChild(el("p", { textContent: "Answer " + lesson.quiz.length + " questions and earn up to " + (lesson.quiz.length * 10 + 20) + " XP. Perfect scores get bonus XP!" }));
        var startWrap = el("div", { style: "margin-top:22px" });
        startWrap.appendChild(readRow("Final Quiz Time! Answer " + lesson.quiz.length + " questions and earn XP."));
        var sb = el("div", { style: "margin-top:16px" });
        sb.appendChild(el("button", { class: "btn big purple", type: "button", onclick: function () { LearnAI.Sound.play("click"); runLessonQuiz(); } }, ["🎯 Start Quiz"]));
        startWrap.appendChild(sb);
        intro.appendChild(startWrap);
        stage.appendChild(intro);
        return;
      }

      var step = lesson.steps[i];
      var card = el("div", { class: "step-card" });

      if (step.type === "story") {
        card.appendChild(el("span", { class: "step-emoji", textContent: step.emoji }));
        card.appendChild(el("h2", { textContent: step.title }));
        card.appendChild(el("p", { textContent: step.text }));
      } else if (step.type === "concept") {
        card.appendChild(el("span", { class: "step-emoji", textContent: "💡" }));
        card.appendChild(el("h2", { textContent: step.title }));
        card.appendChild(el("p", { textContent: step.text }));
        var ul = el("ul", { class: "bullet-list" });
        step.bullets.forEach(function (b) {
          ul.appendChild(el("li", {}, [el("span", { class: "ic", textContent: b.ic }), el("span", { textContent: b.text })]));
        });
        card.appendChild(ul);
        var animBox = el("div", { html: animHTML(step.anim) });
        card.appendChild(animBox);
      } else if (step.type === "examples") {
        card.appendChild(el("span", { class: "step-emoji", textContent: "🌟" }));
        card.appendChild(el("h2", { textContent: step.title }));
        card.appendChild(el("p", { textContent: step.text }));
        var eg = el("div", { class: "example-grid" });
        step.items.forEach(function (it) {
          eg.appendChild(el("div", { class: "example-tile" }, [
            el("div", { class: "et-emoji", textContent: it.emoji }),
            el("b", { textContent: it.title }),
            el("small", { textContent: it.text })
          ]));
        });
        card.appendChild(eg);
      } else if (step.type === "try") {
        card.appendChild(el("span", { class: "chip pink", textContent: "🧠 Quick Question" }));
        card.appendChild(el("div", { style: "height:14px" }));
        quizQuestionInline(card, step.question, function () {
          nextBtn.classList.remove("hidden");
        });
      } else if (step.type === "challenge") {
        card.appendChild(el("span", { class: "step-emoji", textContent: "🏅" }));
        card.appendChild(el("h2", { textContent: step.title }));
        card.appendChild(el("p", { textContent: step.text }));
        card.appendChild(el("div", { class: "feedback good", style: "text-align:left" }, [
          el("span", { class: "fb-emoji", textContent: "✅" }),
          el("span", { textContent: step.task })
        ]));
        card.appendChild(el("p", { style: "margin-top:12px;font-style:italic", textContent: "💡 Hint: " + step.hint }));
        var didBtn = el("button", {
          class: "btn small green", type: "button", style: "margin-top:18px",
          onclick: function () {
            LearnAI.Sound.play("badge");
            UI.confetti(50);
            didBtn.disabled = true;
            didBtn.textContent = "✓ Challenge accepted!";
            State.addXP(15);
            UI.toast("Challenge bonus! +15 XP ⚡", "gold");
            nextBtn.classList.remove("hidden");
          }
        }, ["🙌 I did it!"]);
        card.appendChild(didBtn);
      }

      var nav = el("div", { class: "step-nav" });
      if (i > 0) nav.appendChild(el("button", { class: "btn small secondary", type: "button", onclick: function () { LearnAI.Sound.play("click"); showStage(i - 1); } }, ["← Back"]));
      else nav.appendChild(el("span"));
      var nextBtn = el("button", {
        class: "btn purple" + (step.type === "try" || step.type === "challenge" ? " hidden" : ""),
        type: "button",
        onclick: function () { LearnAI.Sound.play("pop"); showStage(i + 1); }
      }, [i === lesson.steps.length - 1 ? "To the Final Quiz! 🏁" : "Next →"]);
      if (!nextBtn.classList.contains("hidden")) {
        setTimeout(function () { nav.appendChild(nextBtn); }, 0);
      } else {
        nav.appendChild(nextBtn);
      }
      card.appendChild(nav);
      stage.appendChild(card);
    }

    function quizQuestionInline(card, q, onDone) {
      var holder = el("div", { style: "text-align:left;margin-top:18px" });
      card.appendChild(holder);
      var qHead = el("div", {}, [
        el("div", { class: "quiz-q", style: "margin-bottom:16px", textContent: q.q })
      ]);
      qHead.appendChild(UI.readBtn(q.q));
      holder.appendChild(qHead);
      var answered = false;
      var letters = ["A", "B", "C", "D"];
      var optionsEl = el("div", { class: "options" });
      q.options.forEach(function (opt, oi) {
        optionsEl.appendChild(el("button", {
          class: "option-btn", type: "button",
          onclick: function () {
            if (answered) return;
            answered = true;
            State.recordAnswer(oi === q.answer);
            Array.prototype.forEach.call(optionsEl.children, function (b, bi) {
              b.disabled = true;
              if (bi === q.answer) b.classList.add("correct");
              else if (bi === oi && oi !== q.answer) b.classList.add("wrong");
            });
            if (oi === q.answer) {
              LearnAI.Sound.play("correct");
              UI.confetti(36);
              holder.appendChild(el("div", { class: "feedback good" }, [
                el("span", { class: "fb-emoji", textContent: "🎊" }),
                el("div", {}, [
                  el("div", { textContent: pick(PRAISE) }),
                  el("div", { textContent: q.explain, style: "font-weight:600;margin-top:4px" })
                ])
              ]));
              State.addXP(5);
              UI.toast("+5 XP ⚡");
              onDone();
            } else {
              LearnAI.Sound.play("wrong");
              holder.appendChild(el("div", { class: "feedback bad" }, [
                el("span", { class: "fb-emoji", textContent: "🤗" }),
                el("div", {}, [
                  el("div", { textContent: pick(RETRY_MSG) }),
                  el("div", { textContent: q.explain, style: "font-weight:600;margin-top:4px" })
                ])
              ]));
              onDone();
            }
          }
        }, [el("span", { class: "opt-key", textContent: letters[oi] }), el("span", { textContent: opt })]));
      });
      holder.appendChild(optionsEl);
    }

    function runLessonQuiz() {
      runQuiz(stage, lesson.quiz, {
        topicId: lesson.id,
        result: function (correct, total) {
          return {
            actions: [
              { href: "#/learn", label: "📚 All Lessons" },
              { href: nextLessonHref(), label: "Next Lesson →" }
            ],
            againHref: "#/lesson/" + lesson.id,
            doneText: correct === total ? "Perfect score! You really know your stuff!" : "Keep exploring to earn more stars!"
          };
        },
        onComplete: function (correct, total) {
          var firstTime = State.completeLesson(lesson.id);
          if (lesson.id === "ai-safety") State.awardBadge("safe-surfing");
          if (lesson.id === "machine-learning" && correct === total) State.awardBadge("ml-hero");
          if (firstTime) UI.toast("Lesson complete! +50 XP ⚡", "gold");
        }
      });
    }

    function nextLessonHref() {
      var idx = D.LESSONS.findIndex(function (l) { return l.id === lesson.id; });
      var nxt = D.LESSONS[(idx + 1) % D.LESSONS.length];
      return "#/lesson/" + nxt.id;
    }

    showStage(0);
  }

  /* ---------------- PROGRESS ---------------- */

  function renderProgress(root) {
    var st = State.get();
    var li = State.levelInfo(st.xp);
    var v = el("div", { class: "view page-wrap" });
    v.appendChild(sectionHead("MY JOURNEY", "My Progress", "Look how far you've come, explorer!"));

    var dash = el("div", { class: "dash-hero" });
    var levelCard = el("div", { class: "card level-ring-card" });
    levelCard.appendChild(el("div", {
      class: "level-ring", style: "--pct:" + li.pct,
      html: '<div><div class="level-num">' + li.level + "</div><small>LVL</small></div>"
    }));
    levelCard.appendChild(el("div", { class: "level-name", textContent: li.name }));
    levelCard.appendChild(el("p", { style: "font-weight:700;color:var(--ink-soft);font-size:0.9rem", textContent: li.next ? (li.next.min - st.xp) + " XP to \"" + li.next.name + "\"" : "Max level reached!" }));
    dash.appendChild(levelCard);

    var stats = el("div", { class: "stat-grid" });
    var accuracy = st.questionsAnswered ? Math.round(st.correctAnswers / st.questionsAnswered * 100) : 0;
    var statDefs = [
      { icon: "⚡", val: st.xp, label: "Total XP", bg: "#fff4d6" },
      { icon: "🔥", val: st.streak.count + " day" + (st.streak.count === 1 ? "" : "s"), label: "Learning Streak", bg: "#ffe9ec" },
      { icon: "📚", val: st.completedLessons.length + "/10", label: "Lessons Done", bg: "#e2f9ec" },
      { icon: "🏅", val: st.badges.length + "/" + Object.keys(State.BADGES).length, label: "Badges Earned", bg: "#f1edff" },
      { icon: "🎯", val: accuracy + "%", label: "Quiz Accuracy", bg: "#e8f8ff" }
    ];
    statDefs.forEach(function (sd) {
      var c = el("div", { class: "stat-card" });
      c.appendChild(el("div", { class: "stat-icon", style: "background:" + sd.bg, textContent: sd.icon }));
      c.appendChild(el("div", {}, [el("b", { textContent: String(sd.val) }), el("small", { textContent: sd.label })]));
      stats.appendChild(c);
    });
    dash.appendChild(stats);
    v.appendChild(dash);

    var streakCard = el("div", { class: "card", style: "margin-top:26px;text-align:center" });
    streakCard.appendChild(el("h3", { textContent: "🔥 Learning Streak" }));
    streakCard.appendChild(el("p", { style: "color:var(--ink-soft);font-weight:600", textContent: "Learn something every day to keep your flame burning!" }));
    var strip = el("div", { class: "streak-strip" });
    State.last7Days().forEach(function (day, i) {
      strip.appendChild(el("div", { class: "streak-day" + (day.active ? " hit" : "") }, [
        el("div", { class: "sd-circle", textContent: day.active ? "🔥" : i === 6 ? "?" : "·" }),
        el("span", { textContent: day.label })
      ]));
    });
    streakCard.appendChild(strip);
    v.appendChild(streakCard);

    var badgeSec = el("section", { class: "section" });
    badgeSec.appendChild(sectionHead("COLLECTION", "Badge Shelf", "Tap into your inner collector - earn them all!"));
    var shelf = el("div", { class: "badge-shelf" });
    Object.keys(State.BADGES).forEach(function (id) {
      var b = State.BADGES[id];
      var owned = st.badges.indexOf(id) !== -1;
      var bc = el("div", { class: "badge-card" + (owned ? "" : " locked") });
      bc.appendChild(el("div", { class: "badge-medal", textContent: owned ? b.emoji : "🔒" }));
      bc.appendChild(el("b", { textContent: b.title }));
      bc.appendChild(el("small", { textContent: owned ? "Earned! 🎉" : b.how }));
      shelf.appendChild(bc);
    });
    badgeSec.appendChild(shelf);
    v.appendChild(badgeSec);

    var lessonProg = el("div", { class: "card", style: "margin-top:10px" });
    lessonProg.appendChild(el("h3", { textContent: "📚 Lesson Progress" }));
    var lpList = el("div", { style: "display:grid;gap:14px;margin-top:16px" });
    D.LESSONS.forEach(function (l) {
      var done = st.completedLessons.indexOf(l.id) !== -1;
      var row = el("div", { style: "display:grid;gap:6px" });
      var top = el("div", { style: "display:flex;justify-content:space-between;font-weight:800;font-size:0.95rem" });
      top.appendChild(el("span", { textContent: l.emoji + " " + l.title }));
      top.appendChild(el("span", { textContent: done ? "✓" : "—" }));
      var bar = el("div", { class: "progress-track" }, [el("div", { class: "progress-fill", style: "width:" + (done ? "100" : "0") + "%;" + (done ? "" : "background:#dbe3f7") })]);
      row.appendChild(top);
      row.appendChild(bar);
      lpList.appendChild(row);
    });
    lessonProg.appendChild(lpList);
    var overall = el("div", { class: "progress-track", style: "margin-top:18px;height:20px" }, [el("div", { class: "progress-fill", style: "width:" + (st.completedLessons.length / 10 * 100) + "%" })]);
    lessonProg.appendChild(el("p", { style: "text-align:center;font-weight:800;margin-top:8px", textContent: "Overall journey: " + st.completedLessons.length + " of 10 lessons complete!" }));
    lessonProg.appendChild(overall);
    v.appendChild(lessonProg);

    var cta = el("div", { class: "btn-row", style: "margin:34px 0 10px" });
    cta.appendChild(el("a", { class: "btn purple", href: nextIncomplete() }, ["🎯 Continue Adventure"]));
    cta.appendChild(el("a", { class: "btn secondary", href: "#/learn" }, ["📚 All Lessons"]));
    v.appendChild(cta);
    root.appendChild(v);
  }

  function nextIncomplete() {
    var st = State.get();
    for (var i = 0; i < D.LESSONS.length; i++) {
      if (st.completedLessons.indexOf(D.LESSONS[i].id) === -1) return "#/lesson/" + D.LESSONS[i].id;
    }
    return "#/learn";
  }

  LearnAI.Views = {
    home: renderHome,
    learn: renderLearn,
    lesson: renderLesson,
    progress: renderProgress
  };
})();
