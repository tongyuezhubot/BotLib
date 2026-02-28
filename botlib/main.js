const posts = [
  {
    title: "第 1 篇：卡尔曼滤波最小推导",
    level: "入门",
    minutes: 8,
    href: "./posts/kalman.html",
  },
  {
    title: "第 2 篇：LQR 最小推导",
    level: "进阶",
    minutes: 10,
    href: "./posts/lqr.html",
  },
  {
    title: "第 3 篇：强化学习基础公式",
    level: "入门",
    minutes: 9,
    href: "./posts/rl-basics.html",
  },
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
        <a class="post" href="${post.href}">
          <h3>${post.title}</h3>
          <p class="meta">阅读时间：约 ${post.minutes} 分钟</p>
          <span class="badge">${post.level}</span>
        </a>
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
