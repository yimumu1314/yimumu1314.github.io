// ------- Pangu 自动中英文间距 -------
function panguSpacingAll() {
  if (typeof pangu !== "undefined") {
    pangu.spacingElementByTagName('p');
    pangu.spacingElementByTagName('h1');
    pangu.autoSpacingPage();
  }
}
// 首次加载
document.addEventListener('DOMContentLoaded', panguSpacingAll);

// Material 页内导航/切换后再次排版 + 公式渲染
if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    // Pangu自动排版
    panguSpacingAll();
    // MathJax 公式重渲染
    if (typeof MathJax !== "undefined") {
      MathJax.typesetPromise();
    }
  });
}

// 首次加载页面时公式渲染（兼容首屏未切换情况）
window.addEventListener('DOMContentLoaded', function () {
  if (typeof MathJax !== "undefined") {
    MathJax.typesetPromise();
  }
});
