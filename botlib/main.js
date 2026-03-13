const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
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
