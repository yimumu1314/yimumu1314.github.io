(function () {
  // —— 可调参数 ——
  var DELAY = 300; // 页面载入后延时（ms），Material 切页很快，给点缓冲
  var SHOW_EVERY_TIME = false; // 改为 true 则每次进入含公式页面都弹（不记忆）

  // 判断是否为“含公式页面”
  function hasMath() {
    return document.querySelector(
      '.arithmatex, script[type^="math/tex"], script[type="math/tex; mode=display"]'
    );
  }

  // 会话内：同一路径只弹一次
  function shownKey() {
    return 'math-refresh-hint-shown:' + location.pathname + location.hash;
  }
  function alreadyShown() {
    return sessionStorage.getItem(shownKey()) === '1';
  }
  function markShown() {
    try { sessionStorage.setItem(shownKey(), '1'); } catch (e) {}
  }

  // 弹窗
  function showModal() {
    if (document.getElementById('math-refresh-modal')) return;

    var wrap = document.createElement('div');
    wrap.id = 'math-refresh-modal';
    wrap.innerHTML =
      '<div class="math-hint-overlay"></div>' +
      '<div class="math-hint-dialog" role="dialog" aria-modal="true" aria-label="提示">' +
      '  <div class="math-hint-title">提示</div>' +
      '  <div class="math-hint-body">若本页数学公式显示不完整，请手动刷新一次页面（F5 / ⌘R）。</div>' +
      '  <div class="math-hint-actions">' +
      '    <button class="math-hint-ok" aria-label="我知道了">我知道了</button>' +
      '  </div>' +
      '</div>';
    document.body.appendChild(wrap);

    var close = function () {
      if (!SHOW_EVERY_TIME) markShown();
      wrap.remove();
    };
    wrap.querySelector('.math-hint-overlay').addEventListener('click', close);
    wrap.querySelector('.math-hint-ok').addEventListener('click', close);
  }

  function maybeShow() {
    if (!hasMath()) return;
    if (!SHOW_EVERY_TIME && alreadyShown()) return;
    showModal();
  }

  // 首次加载
  function installOnce() {
    setTimeout(maybeShow, DELAY);
  }
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    installOnce();
  } else {
    document.addEventListener('DOMContentLoaded', installOnce);
  }

  // 适配 MkDocs Material 的“无刷新导航”
  if (window.document$) {
    window.document$.subscribe(function () {
      setTimeout(maybeShow, DELAY);
    });
  } else {
    window.addEventListener('hashchange', function () {
      setTimeout(maybeShow, DELAY);
    });
  }
})();
