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
  "Bot, not these sounds!",
  "Bot, rage! Rage!",
  "Bot，春天你喜欢德彪西，而今已是严冬了。"
];
var poemEl = document.getElementById("poem");
if (poemEl) {
  var day = new Date().getDay();
  poemEl.textContent = poemByDay[day];
}

// 笔记索引：唯一数据源。dir 缺省为 posts；dir: "notes" 表示 notes/ 下页面。subtitle 显示在标题下小字。
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
      { title: "强化学习基础", file: "rl-basics.html", letter: "Q" },
      { title: "强化学习", file: "rl.html", letter: "Q", dir: "notes", subtitle: "目录" },
      { title: "PPO 算法学习", file: "ppo.html", letter: "P", dir: "notes", subtitle: "论文与代码" }
    ]},
    { title: "五、论文笔记", items: [
      { title: "ACT", file: "act-action-chunking-transformers.html", letter: "A", dir: "notes", subtitle: "Action Chunking · Transformer" },
      { title: "Diffusion Policy", file: "diffusion-policy.html", letter: "D", dir: "notes", subtitle: "扩散策略" },
      { title: "RDT", file: "robotics-diffusion-transformer-rdt.html", letter: "R", dir: "notes", subtitle: "Robotics Diffusion Transformer" },
      { title: "HIL-SERL", file: "hil-serl.html", letter: "H", dir: "notes", subtitle: "Human-in-the-Loop RL" },
      { title: "LeRobot", file: "lerobot.html", letter: "L", dir: "notes", subtitle: "Hugging Face 机器人框架" },
      { title: "OpenVLA", file: "openvla.html", letter: "O", dir: "notes", subtitle: "开源 7B VLA" },
      { title: "TinyVLA", file: "tinyvla.html", letter: "T", dir: "notes", subtitle: "轻量化 VLA" },
      { title: "DexVLA", file: "dexvla.html", letter: "D", dir: "notes", subtitle: "Plug-In Diffusion Expert" },
      { title: "RoboTwin", file: "robotwin.html", letter: "R", dir: "notes", subtitle: "双臂 benchmark" },
      { title: "RoboBrain 2.5", file: "robobrain-2-5.html", letter: "R", dir: "notes", subtitle: "机器人大脑" },
      { title: "Robix", file: "robix.html", letter: "R", dir: "notes", subtitle: "推理与规划一体化" },
      { title: "pi 系列", file: "pi-series.html", letter: "P", dir: "notes", subtitle: "pi0 / pi0.5 / pi0.6" },
      { title: "RTC", file: "real-time-chunking-rtc.html", letter: "R", dir: "notes", subtitle: "Real-Time Chunking" },
      { title: "Knowledge Insulation", file: "knowledge-insulation.html", letter: "K", dir: "notes", subtitle: "VLA 梯度屏蔽" },
      { title: "Project GR00T", file: "project-gr00t.html", letter: "G", dir: "notes", subtitle: "NVIDIA 人形基础模型" },
      { title: "StarVLA", file: "starvla.html", letter: "S", dir: "notes", subtitle: "模块化 VLA 框架" },
      { title: "SimpleVLA-RL", file: "simplevla-rl.html", letter: "S", dir: "notes", subtitle: "VLA 强化学习后训练" },
      { title: "RLinf", file: "rlinf-vla.html", letter: "R", dir: "notes", subtitle: "VLA 后训练基础设施" },
      { title: "VLA-Adapter", file: "vla-adapter.html", letter: "V", dir: "notes", subtitle: "轻量级具身范式" },
      { title: "DIH-Tele：多物体灵巧手内操作与触觉感知", file: "dih-tele.html", letter: "D", dir: "notes", subtitle: "遥操作 · 模仿学习 · CVAE" },
      { title: "折纸万能抓手", file: "origami-gripper.html", letter: "Z", dir: "notes", subtitle: "形态学计算 · 逆向设计" },
      { title: "重型四肢人形全身控制", file: "humanoid-wbc-heavy-limbs.html", letter: "Z", dir: "notes", subtitle: "MPC · HQP" },
      { title: "多层地形路径规划", file: "terrain-multilevel-path-planning.html", letter: "T", dir: "notes", subtitle: "NDT · ZMP" },
      { title: "RFSG 图像目标导航", file: "rfsg-image-goal-navigation.html", letter: "R", dir: "notes", subtitle: "特征引导 · 场景图 GCN" },
      { title: "ReasonManip", file: "reasonmanip-lmm-robot.html", letter: "R", dir: "notes", subtitle: "轴向表示 · GRPO" },
      { title: "频域平面路径跟踪", file: "frequency-domain-planar-path-following.html", letter: "F", dir: "notes", subtitle: "T-MECH · FFT · GVF" }
    ]}
  ]
};

function sidebarItemHref(it, pathname) {
  var inPosts = /\/posts\//.test(pathname);
  var isNotes = it.dir === "notes";
  if (inPosts) {
    return (isNotes ? "../notes/" : "./") + it.file;
  }
  return (isNotes ? "./notes/" : "./posts/") + it.file;
}

function renderArticleSidebar() {
  var aside = document.getElementById("article-sidebar");
  if (!aside || !document.body.classList.contains("article-page")) return;
  var data = window.articlesNavData;
  var pathname = document.location.pathname || "";
  var currentFile = pathname.split("/").pop() || "";
  var notesHome = /\/posts\//.test(pathname) ? "../notes.html" : "./notes.html";
  var html = '<p class="article-sidebar-title">学习路线</p><nav><ul class="article-sidebar-nav">';
  html += '<li><a href="' + notesHome + '">笔记首页</a></li>';
  for (var g = 0; g < data.groups.length; g++) {
    html += '<li class="article-sidebar-group"><span class="article-sidebar-group-title">' + data.groups[g].title + "</span></li>";
    for (var i = 0; i < data.groups[g].items.length; i++) {
      var it = data.groups[g].items[i];
      var href = sidebarItemHref(it, pathname);
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
      var base = it.dir === "notes" ? "./notes/" : "./posts/";
      byLetter[letter].push({ title: it.title, href: base + it.file, subtitle: it.subtitle || "" });
    }
  }
  var letters = Object.keys(byLetter).sort();
  var html = "";
  for (var k = 0; k < letters.length; k++) {
    var L = letters[k];
    html += '<section class="articles-letter-group"><span class="articles-letter" aria-hidden="true">' + L + "</span>";
    for (var j = 0; j < byLetter[L].length; j++) {
      var entry = byLetter[L][j];
      html += '<a class="articles-index-link" href="' + entry.href + '">' + entry.title;
      if (entry.subtitle) {
        html += "<small>" + entry.subtitle + "</small>";
      }
      html += "</a>";
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
