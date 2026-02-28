const posts = [
  {
    title: "第 1 篇：机器人学习需要哪些数学基础？",
    level: "入门",
    minutes: 10,
  },
  {
    title: "第 2 篇：从状态空间模型理解控制问题",
    level: "入门",
    minutes: 12,
  },
  {
    title: "第 3 篇：卡尔曼滤波直觉与实现",
    level: "进阶",
    minutes: 15,
  },
  {
    title: "第 4 篇：强化学习在机械臂上的最小实验",
    level: "进阶",
    minutes: 18,
  },
  {
    title: "第 5 篇：从仿真到真实机器人的迁移",
    level: "进阶",
    minutes: 16,
  },
  {
    title: "第 6 篇：机器人学习项目结构模板",
    level: "入门",
    minutes: 9,
  },
];

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const postGrid = document.getElementById("postGrid");
const toggleBtn = document.getElementById("toggleBtn");
let beginnerOnly = false;

function renderPosts() {
  if (!postGrid) return;

  const filtered = beginnerOnly
    ? posts.filter((post) => post.level === "入门")
    : posts;

  postGrid.innerHTML = filtered
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
