/* ==========================================================================
   EDS — exhibition.js
   A general, continuously moving visual archive of EDS activities (not tied
   to any single workshop or program). Two rows drift in opposite directions
   at different speeds; hover pauses motion; click opens a lightbox.
   Placeholder images — replace the files in assets/images/general/ to update.
   ========================================================================== */

(function(){
  const ITEMS = [
    { file:'img32.jpg', size:'md', caption:{ en:'Women learning together', ar:'نساء يتعلّمن معاً' } },
    { file:'img33.jpg', size:'lg', caption:{ en:'A training session in progress', ar:'جلسة تدريبية قيد التنفيذ' } },
    { file:'img34.jpg', size:'sm', caption:{ en:'Practicing new digital skills', ar:'التدرّب على مهارات رقمية جديدة' } },
    { file:'img35.jpg', size:'md', caption:{ en:'A moment of confidence', ar:'لحظة من الثقة' } },
    { file:'img20.jpg', size:'sm', caption:{ en:'Presenting a first project', ar:'عرض أول مشروع' } },
    { file:'img36.jpg', size:'lg', caption:{ en:'Community and connection', ar:'المجتمع والتواصل' } },
    { file:'img37.jpg', size:'md', caption:{ en:'Hands-on learning', ar:'تعلّم عملي' } },
    { file:'img24.jpg', size:'sm', caption:{ en:'A shared learning space', ar:'مساحة تعلّم مشتركة' } }
  ];

  function currentLang(){ return (window.EDS && EDS.language) ? EDS.language.getLang() : 'en'; }
  function esc(s){ return (s || '').replace(/"/g,'&quot;'); }

  function itemHtml(item, lang){
    return (
      '<figure class="exhibition-item sz-' + item.size + '">' +
        '<img src="assets/images/general/' + item.file + '" alt="' + esc(item.caption[lang]) + '" data-fallback="general" loading="lazy">' +
        '<figcaption class="exhibition-caption">' + item.caption[lang] + '</figcaption>' +
      '</figure>'
    );
  }

  function initExhibition(){
    const rowA = document.querySelector('.exhibition-row.row-a');
    const rowB = document.querySelector('.exhibition-row.row-b');
    if(!rowA || !rowB) return;
    const lightbox = document.getElementById('gallery-lightbox');

    function paint(){
      const lang = currentLang();
      const half = Math.ceil(ITEMS.length / 2);
      const setA = ITEMS.slice(0, half);
      const setB = ITEMS.slice(half);
      // Duplicate each row's content once for a seamless CSS-only loop.
      rowA.innerHTML = setA.map(function(i){ return itemHtml(i, lang); }).join('') + setA.map(function(i){ return itemHtml(i, lang); }).join('');
      rowB.innerHTML = setB.map(function(i){ return itemHtml(i, lang); }).join('') + setB.map(function(i){ return itemHtml(i, lang); }).join('');

      if(lightbox){
        document.querySelectorAll('.exhibition-item').forEach(function(el){
          el.addEventListener('click', function(){
            const img = el.querySelector('img');
            const cap = el.querySelector('figcaption');
            lightbox.querySelector('.lightbox-img').src = img.src;
            lightbox.querySelector('.lightbox-img').alt = img.alt;
            lightbox.querySelector('.lightbox-caption').textContent = cap ? cap.textContent : '';
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
          });
        });
      }
    }
    paint();
    document.addEventListener('eds:langchange', paint);

    if(lightbox){
      const close = function(){ lightbox.classList.remove('open'); document.body.style.overflow = ''; };
      lightbox.querySelector('.lightbox-close').addEventListener('click', close);
      lightbox.querySelector('.lightbox-backdrop').addEventListener('click', close);
      const prevBtn = lightbox.querySelector('.lightbox-prev');
      const nextBtn = lightbox.querySelector('.lightbox-next');
      if(prevBtn) prevBtn.style.display = 'none';
      if(nextBtn) nextBtn.style.display = 'none';
      document.addEventListener('keydown', function(e){ if(e.key === 'Escape') close(); });
    }
  }

  document.addEventListener('DOMContentLoaded', initExhibition);
})();
