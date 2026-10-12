/* ==========================================================================
   EDS — main.js
   Shared bootstrapping used on every page: image fallbacks, icon rendering,
   copyright year, and small cross-page utilities.
   ========================================================================== */

(function(){
  window.EDS = window.EDS || {};

  /* ---- Elegant fallback when a placeholder image file is missing ---- */
  function initImageFallbacks(){
    document.querySelectorAll('img[data-fallback]').forEach(function(img){
      img.addEventListener('error', function(){
        const wrap = document.createElement('div');
        wrap.className = 'img-fallback ' + (img.getAttribute('data-fallback') || '');
        wrap.setAttribute('role', 'img');
        wrap.setAttribute('aria-label', img.getAttribute('alt') || 'EDS image');
        wrap.innerHTML = '<svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="70" cy="70" r="46" fill="rgba(255,255,255,.35)"/><path d="M20 170 C50 110 150 110 180 170 Z" fill="rgba(255,255,255,.25)"/></svg>';
        if(img.parentElement){ img.parentElement.replaceChild(wrap, img); }
      }, { once:true });
    });
  }

  /* ---- Icon set (inline SVG, currentColor) used across cards ---- */
  const ICONS = {
    computer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
    legal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v18M5 7l-3 6a4 4 0 0 0 6 0l-3-6Zm14 0l-3 6a4 4 0 0 0 6 0l-3-6ZM5 7h14M8 21h8"/></svg>',
    support: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2.5 4.5-9.5 9-9.5 9Z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z"/><path d="M9 12l2 2 4-4"/></svg>',
    health: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-8-4.9-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.1-8 11-8 11Z"/><path d="M9 11h2v2h2v-2h2M11 9v2m2 0v2"/></svg>',
    compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M15 9l-2 6-4 2 2-6 4-2Z"/></svg>',
    horizon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="10" r="4"/><path d="M2 18c3-2 7-2 10 0s7 2 10 0"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/></svg>',
    hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4a1.5 1.5 0 0 1 3 0v7M14 12V6a1.5 1.5 0 0 1 3 0v9c0 3.5-2.5 6-6 6h-1c-2 0-3-.7-4.2-2.2L3 14.8c-.6-.9-.2-1.9.7-2.2.6-.2 1.2 0 1.6.5L8 16"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>',
    growth: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21h18M6 21V10l4-3 4 4 4-6v16"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-7.2-7-12a7 7 0 0 1 14 0c0 4.8-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6.5 3h3l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2L21 14.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M4 7l8 6 8-6"/></svg>',
    design: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3a9 9 0 1 0 9 9c0-1.5-1-2-2-2h-2.6a2.4 2.4 0 0 1-2-3.7c.3-.5.3-1.1 0-1.6C13.8 3.6 13 3 12 3Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="9.5" cy="7.5" r="1"/><circle cx="14" cy="6.5" r="1"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.6L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.4L12 2Zm7 12l.9 2.6L22 17l-2.1.8L19 20l-.9-2.2L16 17l2.1-.4L19 14ZM5 14l.8 2.4L8 17l-2.2.7L5 20l-.8-2.3L2 17l2.2-.6L5 14Z"/></svg>',
    quote: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 7C6.5 8.2 5 10.3 5 13c0 2.2 1.5 3.5 3.2 3.5A2.8 2.8 0 0 0 11 13.7c0-1.5-1-2.5-2.3-2.7.3-1.2 1.4-2.2 2.8-2.8L9.5 7Zm8 0c-3 1.2-4.5 3.3-4.5 6 0 2.2 1.5 3.5 3.2 3.5a2.8 2.8 0 0 0 2.8-2.8c0-1.5-1-2.5-2.3-2.7.3-1.2 1.4-2.2 2.8-2.8L17.5 7Z"/></svg>',
    lightbulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9V16h5v-.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3Z"/></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 21V4M5 4h13l-3 4 3 4H5"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>'
  };

  function initIcons(){
    document.querySelectorAll('[data-icon]').forEach(function(el){
      const key = el.getAttribute('data-icon');
      if(ICONS[key]) el.innerHTML = ICONS[key];
    });
  }
  window.EDS.renderIcon = function(key){ return ICONS[key] || ''; };

  function initYear(){
    document.querySelectorAll('[data-year]').forEach(function(el){
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---- Read a query string param, e.g. ?id=computer-skills ---- */
  window.EDS.getParam = function(name){
    return new URLSearchParams(window.location.search).get(name);
  };

  document.addEventListener('DOMContentLoaded', function(){
    initImageFallbacks();
    initIcons();
    initYear();
  });
})();
