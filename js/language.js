/* ==========================================================================
   EDS — language.js
   Handles English / Arabic switching, RTL/LTR direction, and persistence.
   Any element with data-en / data-ar attributes gets its text swapped.
   Use data-en-html / data-ar-html when the string needs inline markup.
   Use data-en-placeholder / data-ar-placeholder for form placeholders.
   ========================================================================== */

(function(){
  const STORAGE_KEY = 'eds-lang';
  const DEFAULT_LANG = 'en';

  function getLang(){
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function applyLang(lang, silent){
    document.documentElement.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    document.querySelectorAll('[data-en],[data-ar]').forEach(function(el){
      const text = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if(text !== null) el.textContent = text;
    });

    document.querySelectorAll('[data-en-html],[data-ar-html]').forEach(function(el){
      const html = lang === 'ar' ? el.getAttribute('data-ar-html') : el.getAttribute('data-en-html');
      if(html !== null) el.innerHTML = html;
    });

    document.querySelectorAll('[data-en-placeholder],[data-ar-placeholder]').forEach(function(el){
      const ph = lang === 'ar' ? el.getAttribute('data-ar-placeholder') : el.getAttribute('data-en-placeholder');
      if(ph !== null) el.setAttribute('placeholder', ph);
    });

    document.querySelectorAll('[data-en-aria],[data-ar-aria]').forEach(function(el){
      const label = lang === 'ar' ? el.getAttribute('data-ar-aria') : el.getAttribute('data-en-aria');
      if(label !== null) el.setAttribute('aria-label', label);
    });

    document.querySelectorAll('.lang-switch button').forEach(function(btn){
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    moveIndicators();

    // `silent` is used when a page re-applies translations after injecting
    // new DOM (e.g. after rendering dynamic content) — it must NOT re-dispatch
    // eds:langchange, or any listener that also calls applyLang() would recurse.
    if(!silent){
      document.dispatchEvent(new CustomEvent('eds:langchange', { detail:{ lang: lang } }));
    }
  }

  function moveIndicators(){
    document.querySelectorAll('.lang-switch').forEach(function(wrap){
      const indicator = wrap.querySelector('.lang-switch-indicator');
      const active = wrap.querySelector('button.active');
      if(!indicator || !active) return;
      indicator.style.width = active.offsetWidth + 'px';
      indicator.style.transform = 'translateX(' + active.offsetLeft + 'px)';
    });
  }

  function injectIndicators(){
    document.querySelectorAll('.lang-switch').forEach(function(wrap){
      if(wrap.querySelector('.lang-switch-indicator')) return;
      const indicator = document.createElement('span');
      indicator.className = 'lang-switch-indicator';
      indicator.setAttribute('aria-hidden', 'true');
      wrap.insertBefore(indicator, wrap.firstChild);
    });
  }

  function setLang(lang){
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  function initLanguage(){
    injectIndicators();
    applyLang(getLang());
    document.querySelectorAll('.lang-switch button').forEach(function(btn){
      btn.addEventListener('click', function(){
        setLang(btn.getAttribute('data-lang'));
      });
    });
    window.addEventListener('resize', moveIndicators);
  }

  window.EDS = window.EDS || {};
  window.EDS.language = { getLang: getLang, setLang: setLang, applyLang: applyLang, init: initLanguage };

  document.addEventListener('DOMContentLoaded', initLanguage);
})();
