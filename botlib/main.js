const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// 首页诗句：按星期几显示不同句子（0=周日 … 6=周六）
var poemByDay = [
  "Bot，春天你喜欢德彪西，而今已是严冬了。",
  "Bot, love to be",
  "Bot，去雪山脚下",
  "Bot, rage! Rage bot!",
  "Bot, rage! Rage!",
  "Bot, rage! Rage!",
  "Bot，春天你喜欢德彪西，而今已是严冬了。"
];
var poemEl = document.getElementById("poem");
if (poemEl) {
  var day = new Date().getDay();
  poemEl.textContent = poemByDay[day];
}

// 文章列表：唯一数据源，新增文章只需在此添加一项
window.articlesNavData = {
  groups: [
    { title: "一、基础 · 控制与稳定性", items: [
      { title: "PID 控制", file: "pid.html", letter: "P" },
      { title: "李雅普诺夫稳定性", file: "lyapunov.html", letter: "L" }
    ]},
    { title: "二、状态估计", items: [
      { title: "卡尔曼滤波", file: "kalman.html", letter: "K" },
      { title: "粒子滤波", file: "particle-filter.html", letter: "L" }
    ]},
    { title: "三、最优控制", items: [
      { title: "LQR", file: "lqr.html", letter: "L" },
      { title: "MPC", file: "mpc.html", letter: "M" },
      { title: "滑模控制", file: "smc.html", letter: "H" }
    ]},
    { title: "四、学习与决策", items: [
      { title: "强化学习基础", file: "rl-basics.html", letter: "Q" }
    ]}
  ]
};

function renderArticleSidebar() {
  var aside = document.getElementById("article-sidebar");
  if (!aside || !document.body.classList.contains("article-page")) return;
  var data = window.articlesNavData;
  var pathname = document.location.pathname || "";
  var currentFile = pathname.split("/").pop() || "";
  var html = '<p class="article-sidebar-title">学习路线</p><nav><ul class="article-sidebar-nav">';
  html += '<li><a href="../articles.html">文章首页</a></li>';
  for (var g = 0; g < data.groups.length; g++) {
    html += '<li class="article-sidebar-group"><span class="article-sidebar-group-title">' + data.groups[g].title + "</span></li>";
    for (var i = 0; i < data.groups[g].items.length; i++) {
      var it = data.groups[g].items[i];
      var href = "./" + it.file;
      var current = it.file === currentFile ? ' aria-current="page"' : "";
      html += '<li><a href="' + href + '"' + current + ">" + it.title + "</a></li>";
    }
  }
  html += "</ul></nav>";
  aside.innerHTML = html;
}

function renderArticlesIndex() {
  var container = document.getElementById("articles-index-by-letter");
  if (!container) return;
  var data = window.articlesNavData;
  var byLetter = {};
  for (var g = 0; g < data.groups.length; g++) {
    for (var i = 0; i < data.groups[g].items.length; i++) {
      var it = data.groups[g].items[i];
      var letter = it.letter || "?";
      if (!byLetter[letter]) byLetter[letter] = [];
      byLetter[letter].push({ title: it.title, href: "./posts/" + it.file });
    }
  }
  var letters = Object.keys(byLetter).sort();
  var html = "";
  for (var k = 0; k < letters.length; k++) {
    var L = letters[k];
    html += '<section class="articles-letter-group"><span class="articles-letter" aria-hidden="true">' + L + "</span>";
    for (var j = 0; j < byLetter[L].length; j++) {
      html += '<a class="articles-index-link" href="' + byLetter[L][j].href + '">' + byLetter[L][j].title + "</a>";
    }
    html += "</section>";
  }
  container.innerHTML = html;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    renderArticleSidebar();
    renderArticlesIndex();
  });
} else {
  renderArticleSidebar();
  renderArticlesIndex();
}

// 公式：MathJax 加载后再排版（defer 脚本可能晚于本脚本执行）
setTimeout(function () {
  if (window.MathJax && document.querySelector(".prose")) {
    window.MathJax.typesetPromise?.().catch(function () {});
  }
}, 150);

// 点击火花特效
(function () {
  var colors = ["#e07c4a", "#c45d3a", "#f0a050", "#1f4d63", "#d4a055"];
  document.addEventListener("click", function (e) {
    var x = e.clientX;
    var y = e.clientY;
    var wrap = document.createElement("div");
    wrap.className = "spark-wrap";
    wrap.style.left = x + "px";
    wrap.style.top = y + "px";
    var n = 14;
    for (var i = 0; i < n; i++) {
      var angle = (Math.PI * 2 * i) / n + Math.random() * 0.5;
      var dist = 28 + Math.random() * 20;
      var tx = Math.cos(angle) * dist;
      var ty = Math.sin(angle) * dist;
      var p = document.createElement("span");
      p.className = "spark-particle";
      p.style.setProperty("--tx", tx + "px");
      p.style.setProperty("--ty", ty + "px");
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      wrap.appendChild(p);
    }
    document.body.appendChild(wrap);
    setTimeout(function () {
      wrap.remove();
    }, 450);
  });
})();
