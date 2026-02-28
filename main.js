const posts = [
  { title: "第 1 篇：机器人学习要补哪些数学？", level: "入门", minutes: 8 },
  { title: "第 2 篇：坐标变换与齐次矩阵", level: "入门", minutes: 10 },
  { title: "第 3 篇：卡尔曼滤波的最小实现", level: "进阶", minutes: 12 },
  { title: "第 4 篇：轨迹规划与 MPC 直觉", level: "进阶", minutes: 14 },
  { title: "第 5 篇：强化学习在控制中的基本套路", level: "进阶", minutes: 16 },
  { title: "第 6 篇：Sim2Real 常见失败点", level: "入门", minutes: 9 },
];

const yearEl = document.getElementById("year");
const postGrid = document.getElementById("postGrid");
const toggleBtn = document.getElementById("toggleBtn");
let beginnerOnly = false;

if (yearEl) yearEl.textContent = String(new Date().getFullYear());

function renderPosts() {
  if (!postGrid) return;

  const list = beginnerOnly ? posts.filter((p) => p.level === "入门") : posts;
  postGrid.innerHTML = list
    .map(
      (post) => `
        <article class="post">
          <h3>${post.title}</h3>
          <p class="meta">阅读时间：约 ${post.minutes} 分钟</p>
          <span class="badge">${post.level}</span>
        </article>
      `,
    )
    .join("");
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    beginnerOnly = !beginnerOnly;
    toggleBtn.textContent = beginnerOnly ? "显示全部" : "只看入门";
    renderPosts();
  });
}

for (const link of document.querySelectorAll('a[href^="#"]')) {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

renderPosts();
