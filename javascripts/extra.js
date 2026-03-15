// ------- Pangu 自动中英文间距 -------
function panguSpacingAll() {
  if (typeof pangu !== "undefined") {
    pangu.spacingElementByTagName('p');
    pangu.spacingElementByTagName('h1');
    pangu.autoSpacingPage();
  }
}

// ------- MathJax 自动重渲染 -------
function renderMathJaxAll(delay = 0) {
  if (typeof MathJax !== "undefined" && MathJax.typesetPromise) {
    setTimeout(() => {
      MathJax.typesetPromise().catch((err) => {
        // 可以忽略异常，不中断其它脚本
      });
    }, delay);
  }
}

// ------- 首次加载 -------
document.addEventListener('DOMContentLoaded', function () {
  panguSpacingAll();
  renderMathJaxAll();
});

// ------- footer 贴底：动态设置 .md-container 最小高度 -------
function fixContainerHeight() {
  const container = document.querySelector('.md-container');
  const header = document.querySelector('.md-header');
  if (!container || !header) return;
  const headerH = header.getBoundingClientRect().height;
  container.style.setProperty('min-height', 'calc(100vh - ' + headerH + 'px)', 'important');
}

// ------- SPA 页内导航切换后自动排版和重渲染公式 -------
if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    panguSpacingAll();
    renderMathJaxAll(100);
    // 推迟到浏览器下一帧，确保 DOM 已提交、CSS 已应用再强制计算高度
    requestAnimationFrame(fixContainerHeight);
  });
}

window.addEventListener('resize', fixContainerHeight);
