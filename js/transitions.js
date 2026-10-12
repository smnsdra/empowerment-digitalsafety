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

  function initWaveMotion(){
    if(reduceMotion) return;
    var waves = document.querySelectorAll('.loader-wave');
    if(waves.length !== 2) return;

    var approachDuration = 720;
    var spiralDuration = 420;
    var orbitDuration = 2800;
    var startTime = null;
    var startAngle = Math.atan2(20, -52);
    var turn = Math.PI * 2;

    function placeWave(wave, x, y){
      wave.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ')');
    }

    function animateWaves(now){
      if(startTime === null) startTime = now;
      var elapsed = now - startTime;
      var radius;
      var angle;

      if(elapsed < approachDuration){
        var approach = elapsed / approachDuration;
        var easeInOut = approach * approach * (3 - 2 * approach);
        radius = 56 * (1 - easeInOut);
        angle = startAngle + (Math.PI - startAngle) * easeInOut;
      }else{
        var orbitElapsed = elapsed - approachDuration;
        var orbitProgress = orbitElapsed / orbitDuration;
        var spiral = Math.min(orbitElapsed / spiralDuration, 1);
        var spiralEase = spiral * spiral * (3 - 2 * spiral);
        radius = 34 * spiralEase;
        angle = Math.PI + orbitProgress * turn;
      }

      placeWave(waves[0], radius * Math.cos(angle), radius * Math.sin(angle));
      placeWave(waves[1], -radius * Math.cos(angle), -radius * Math.sin(angle));
      requestAnimationFrame(animateWaves);
    }

    requestAnimationFrame(animateWaves);
  }

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
    initWaveMotion();
    openOnLoad();
    initLinkIntercept();
  });

  // If the page is restored from bfcache (back/forward), re-run the reveal.
  window.addEventListener('pageshow', function(e){
    if(e.persisted) openOnLoad();
  });
})();
