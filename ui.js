(function () {
  "use strict";
  var LearnAI = window.LearnAI;
  var State = LearnAI.State;

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k === "textContent") node.textContent = attrs[k];
        else if (k.indexOf("on") === 0) node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function mascotSVG(size) {
    size = size || 260;
    return '<svg class="mascot" width="' + size + '" height="' + Math.round(size * 1.08) + '" viewBox="0 0 200 216" fill="none" aria-hidden="true">' +
      '<defs>' +
      '<linearGradient id="mg-body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a78bfa"/><stop offset="1" stop-color="#6c5ce7"/></linearGradient>' +
      '<linearGradient id="mg-face" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d3a6e"/><stop offset="1" stop-color="#262347"/></linearGradient>' +
      '</defs>' +
      '<line x1="100" y1="14" x2="100" y2="34" stroke="#8b7cf0" stroke-width="6" stroke-linecap="round"/>' +
      '<circle class="antenna-ball" cx="100" cy="12" r="9" fill="#ffc53d"/>' +
      '<circle cx="100" cy="12" r="13" fill="#ffc53d" opacity="0.3"/>' +
      '<rect x="88" y="30" width="24" height="16" rx="8" fill="#8b7cf0"/>' +
      '<rect x="42" y="42" width="116" height="86" rx="30" fill="url(#mg-body)"/>' +
      '<rect x="28" y="72" width="14" height="26" rx="7" fill="#8b7cf0"/>' +
      '<rect x="158" y="72" width="14" height="26" rx="7" fill="#8b7cf0"/>' +
      '<rect x="54" y="54" width="92" height="62" rx="20" fill="url(#mg-face)"/>' +
      '<g class="eye-group">' +
      '<circle cx="80" cy="82" r="10" fill="#fff"/><circle cx="120" cy="82" r="10" fill="#fff"/>' +
      '<circle cx="83" cy="84" r="5" fill="#26325b"/><circle cx="117" cy="84" r="5" fill="#26325b"/>' +
      '<circle cx="85" cy="81" r="1.8" fill="#fff"/><circle cx="119" cy="81" r="1.8" fill="#fff"/>' +
      '</g>' +
      '<path d="M88 99 Q100 109 112 99" stroke="#ffc53d" stroke-width="5" stroke-linecap="round" fill="none"/>' +
      '<circle cx="68" cy="95" r="4" fill="#ff6b9d" opacity="0.65"/>' +
      '<circle cx="132" cy="95" r="4" fill="#ff6b9d" opacity="0.65"/>' +
      '<path d="M60 138 Q52 160 66 172" stroke="#8b7cf0" stroke-width="11" stroke-linecap="round" fill="none"/>' +
      '<path d="M140 138 Q166 148 156 118" stroke="#8b7cf0" stroke-width="11" stroke-linecap="round" fill="none"/>' +
      '<circle cx="155" cy="114" r="8" fill="#ffc53d"/>' +
      '<rect x="58" y="134" width="84" height="56" rx="22" fill="url(#mg-body)"/>' +
      '<circle cx="100" cy="162" r="15" fill="#262347"/>' +
      '<circle cx="100" cy="162" r="8" fill="#63d3ff"/>' +
      '<rect x="74" y="190" width="22" height="18" rx="8" fill="#5b4bc4"/>' +
      '<rect x="104" y="190" width="22" height="18" rx="8" fill="#5b4bc4"/>' +
      '</svg>';
  }

  var ROBOT_COLORS = ["#4f8cff", "#8b5cf6", "#ff6b9d", "#34c77b", "#ffc53d", "#ff9f43"];
  var EYE_STYLES = ["round", "happy", "sleepy"];
  var ANTENNAS = ["ball", "star", "heart", "bolt"];
  var ACCESSORIES = [
    { id: "none", label: "None" },
    { id: "bowtie", label: "Bow Tie 🎀" },
    { id: "headphones", label: "Headphones 🎧" },
    { id: "crown", label: "Crown 👑" },
    { id: "cape", label: "Cape 🦸" }
  ];

  function robotSVG(cfg, size) {
    cfg = cfg || {};
    var color = ROBOT_COLORS.indexOf(cfg.color) !== -1 ? cfg.color : ROBOT_COLORS[0];
    var dark = shade(color, -30);
    var eyes = EYE_STYLES.indexOf(cfg.eyes) !== -1 ? cfg.eyes : "round";
    var ant = ANTENNAS.indexOf(cfg.antenna) !== -1 ? cfg.antenna : "ball";
    var acc = ACCESSORIES.some(function (a) { return a.id === cfg.accessory; }) ? cfg.accessory : "none";
    size = size || 240;

    var uid = "rb" + color.replace("#", "") + eyes + ant + acc;
    var s = '<svg class="builder-bot" width="' + size + '" height="' + Math.round(size * 1.08) + '" viewBox="0 0 200 216" fill="none" aria-hidden="true">';
    s += '<defs><linearGradient id="' + uid + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + lighten(color, 25) + '"/><stop offset="1" stop-color="' + dark + '"/></linearGradient></defs>';

    if (acc === "cape") {
      s += '<path d="M52 140 C30 170 34 196 44 206 L156 206 C166 196 170 170 148 140 Z" fill="#ff6b9d" opacity="0.9"/>';
    }
    s += '<line x1="100" y1="14" x2="100" y2="32" stroke="' + dark + '" stroke-width="6" stroke-linecap="round"/>';

    if (ant === "ball") s += '<circle class="antenna-ball" cx="100" cy="12" r="9" fill="#ffc53d"/><circle cx="100" cy="12" r="13" fill="#ffc53d" opacity="0.3"/>';
    else if (ant === "star") s += '<text x="100" y="20" font-size="22" text-anchor="middle">⭐</text>';
    else if (ant === "heart") s += '<text x="100" y="20" font-size="22" text-anchor="middle">💖</text>';
    else s += '<text x="100" y="20" font-size="22" text-anchor="middle">⚡</text>';

    s += '<rect x="88" y="30" width="24" height="16" rx="8" fill="' + dark + '"/>';
    s += '<rect x="42" y="42" width="116" height="86" rx="30" fill="url(#' + uid + ')"/>';
    s += '<rect x="28" y="72" width="14" height="26" rx="7" fill="' + dark + '"/>';
    s += '<rect x="158" y="72" width="14" height="26" rx="7" fill="' + dark + '"/>';
    s += '<rect x="54" y="54" width="92" height="62" rx="20" fill="#262347"/>';

    if (eyes === "round") {
      s += '<g class="eye-group"><circle cx="80" cy="82" r="10" fill="#fff"/><circle cx="120" cy="82" r="10" fill="#fff"/><circle cx="83" cy="84" r="5" fill="#26325b"/><circle cx="117" cy="84" r="5" fill="#26325b"/></g>';
    } else if (eyes === "happy") {
      s += '<path d="M71 84 Q80 74 89 84" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none"/>';
      s += '<path d="M111 84 Q120 74 129 84" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none"/>';
    } else {
      s += '<path d="M70 84 L90 84 M110 84 L130 84" stroke="#fff" stroke-width="6" stroke-linecap="round"/>';
    }
    s += '<path d="M88 100 Q100 110 112 100" stroke="#ffc53d" stroke-width="5" stroke-linecap="round" fill="none"/>';
    s += '<circle cx="68" cy="96" r="4" fill="#ff6b9d" opacity="0.65"/><circle cx="132" cy="96" r="4" fill="#ff6b9d" opacity="0.65"/>';

    s += '<path d="M60 138 Q50 162 64 174" stroke="' + dark + '" stroke-width="11" stroke-linecap="round" fill="none"/>';
    s += '<path d="M140 138 Q164 150 154 120" stroke="' + dark + '" stroke-width="11" stroke-linecap="round" fill="none"/>';
    s += '<rect x="58" y="134" width="84" height="56" rx="22" fill="url(#' + uid + ')"/>';
    s += '<circle cx="100" cy="162" r="15" fill="#262347"/><circle cx="100" cy="162" r="8" fill="#63d3ff"/>';
    s += '<rect x="74" y="190" width="22" height="18" rx="8" fill="' + dark + '"/><rect x="104" y="190" width="22" height="18" rx="8" fill="' + dark + '"/>';

    if (acc === "bowtie") {
      s += '<path d="M84 132 L98 139 L84 146 Z" fill="#ff6b9d"/><path d="M116 132 L102 139 L116 146 Z" fill="#ff6b9d"/><circle cx="100" cy="139" r="4" fill="#e84f87"/>';
    } else if (acc === "headphones") {
      s += '<path d="M46 76 C46 48 154 48 154 76" stroke="#262347" stroke-width="9" stroke-linecap="round" fill="none"/>';
      s += '<rect x="36" y="70" width="16" height="28" rx="8" fill="#ff6b9d"/><rect x="148" y="70" width="16" height="28" rx="8" fill="#ff6b9d"/>';
    } else if (acc === "crown") {
      s += '<path d="M64 42 L74 26 L88 38 L100 22 L112 38 L126 26 L136 42 Z" fill="#ffc53d"/>';
    }

    s += "</svg>";
    return s;
  }

  function shade(hex, pct) {
    var n = parseInt(hex.slice(1), 16);
    var r = Math.min(255, Math.max(0, (n >> 16) + pct));
    var g = Math.min(255, Math.max(0, ((n >> 8) & 255) + pct));
    var b = Math.min(255, Math.max(0, (n & 255) + pct));
    return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
  }
  function lighten(hex, pct) { return shade(hex, pct); }

  var CONFETTI_COLORS = ["#4f8cff", "#8b5cf6", "#ffc53d", "#34c77b", "#ff6b9d", "#63d3ff", "#ff9f43"];

  function confetti(count) {
    count = count || 80;
    var root = document.getElementById("confetti-root");
    for (var i = 0; i < count; i++) {
      var p = document.createElement("i");
      p.className = "confetti-piece";
      p.style.left = Math.random() * 100 + "vw";
      p.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      p.style.animationDuration = 2.2 + Math.random() * 2 + "s";
      p.style.animationDelay = Math.random() * 0.6 + "s";
      p.style.width = 8 + Math.random() * 8 + "px";
      p.style.height = 12 + Math.random() * 10 + "px";
      p.style.borderRadius = Math.random() > 0.5 ? "50%" : "4px";
      root.appendChild(p);
      setTimeout(function (node) { return function () { node.remove(); }; }(p), 5200);
    }
  }

  function toast(message, kind) {
    var root = document.getElementById("toast-root");
    var t = el("div", { class: "toast" + (kind === "gold" ? " gold" : ""), html: "<span>" + message + "</span>" });
    root.appendChild(t);
    setTimeout(function () { t.remove(); }, 3200);
  }

  function rewardModal(opts) {
    LearnAI.Speech.stop();
    var bg = el("div", { class: "reward-modal-bg", role: "dialog", "aria-modal": "true" });
    var modal = el("div", { class: "reward-modal", html: '<div class="rm-rays"></div>' });
    modal.appendChild(el("span", { class: "rm-emoji", textContent: opts.emoji || "🎉" }));
    modal.appendChild(el("h2", { textContent: opts.title || "Amazing!" }));
    if (opts.text) modal.appendChild(el("p", { textContent: opts.text }));
    var row = el("div", { style: "margin-top:22px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap" });
    var btn = el("button", { class: "btn purple", type: "button", onclick: close }, [opts.buttonText || "Continue"]);
    row.appendChild(btn);
    if (opts.secondary) {
      row.appendChild(el("a", { class: "btn secondary small", href: opts.secondary.href }, [opts.secondary.label]));
    }
    modal.appendChild(row);
    bg.appendChild(modal);

    function close() {
      bg.remove();
      if (opts.onClose) opts.onClose();
    }
    bg.addEventListener("click", function (e) { if (e.target === bg) close(); });
    document.body.appendChild(bg);
    btn.focus();
  }

  function readBtn(text) {
    return el("button", {
      class: "read-btn",
      type: "button",
      title: "Read this out loud",
      onclick: function () {
        LearnAI.Sound.play("pop");
        LearnAI.Speech.say(text);
      }
    }, ["🔊 Read to me"]);
  }

  LearnAI.UI = {
    el: el,
    mascotSVG: mascotSVG,
    robotSVG: robotSVG,
    confetti: confetti,
    toast: toast,
    rewardModal: rewardModal,
    readBtn: readBtn,
    ROBOT_COLORS: ROBOT_COLORS,
    EYE_STYLES: EYE_STYLES,
    ANTENNAS: ANTENNAS,
    ACCESSORIES: ACCESSORIES
  };
})();
