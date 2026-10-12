/* ==========================================================================
   EDS — transitions.js
   A short, editorial curtain wipe between pages. This is a true multi-page
   site (no framework), so transitions work by covering the outgoing page,
   letting the browser navigate normally, then opening the curtain on the
   incoming page. Because navigation is never intercepted for back/forward,
   language switching, downloads, or external/new-tab links, standard
   browser behavior is fully preserved.
   ========================================================================== */

(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DURATION = 480;

  function getCurtain(){ return document.querySelector('.page-transition'); }

  function openOnLoad(){
    var curtain = getCurtain();
    if(!curtain) return;
    if(reduceMotion){ curtain.classList.add('is-open'); return; }
    // Start fully covering with no transition, then open on the next frame.
    curtain.classList.add('is-instant');
    curtain.classList.remove('is-open', 'is-closing');
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        curtain.classList.remove('is-instant');
        curtain.classList.add('is-open');
      });
    });
  }

  function isInternalNavigable(a){
    if(!a || !a.href) return false;
    if(a.target && a.target !== '' && a.target !== '_self') return false;
    if(a.hasAttribute('download')) return false;
    var url;
    try{ url = new URL(a.href, window.location.href); } catch(e){ return false; }
    if(url.origin !== window.location.origin) return false;
    if(!/\.html?($|\?)/i.test(url.pathname) && url.pathname !== '/' ) {
      // allow plain html pages only (this site has no other route types)
      if(!/\.html?$/i.test(url.pathname)) return false;
    }
    if(url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return false;
    return true;
  }

  function initLinkIntercept(){
    var curtain = getCurtain();
    if(!curtain) return;

    document.addEventListener('click', function(e){
      if(e.defaultPrevented || e.button !== 0) return;
      if(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      var a = e.target.closest('a');
      if(!isInternalNavigable(a)) return;

      var href = a.href;
      e.preventDefault();

      if(reduceMotion){
        window.location.href = href;
        return;
      }

      curtain.classList.remove('is-open');
      curtain.classList.add('is-closing');
      window.setTimeout(function(){
        window.location.href = href;
      }, DURATION);
    });
  }

  // Open the curtain as soon as markup is parsed so the reveal feels instant.
  document.addEventListener('DOMContentLoaded', function(){
    openOnLoad();
    initLinkIntercept();
  });

  // If the page is restored from bfcache (back/forward), re-run the reveal.
  window.addEventListener('pageshow', function(e){
    if(e.persisted) openOnLoad();
  });
})();
