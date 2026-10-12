/* ==========================================================================
   EDS — stories.js
   Drives the Stories page (featured "story book" + archive tiles) and the
   individual story detail page. Reads from data/stories.js. All content is
   the project's existing story data — nothing here invents people or quotes.

   Language behavior: the story shown is always in the website's current
   language (EDS.language.getLang()). There is no separate language toggle
   inside the story card or book — switching the site language via the
   navbar is what switches the story language, everywhere on the site.
   ========================================================================== */

(function(){
  function currentLang(){ return (window.EDS && EDS.language) ? EDS.language.getLang() : 'en'; }
  function esc(s){ return (s || '').replace(/"/g,'&quot;'); }
  function initials(name){
    return (name || '').split(' ').filter(Boolean).slice(0,2).map(function(w){ return w[0]; }).join('');
  }

  /* Returns { text, lang, dir } for the quote in the website's current
     language, falling back to whichever language actually has text so a
     story is never left blank. */
  function resolveQuote(s, lang){
    const q = s.quote || { ar:'', en:'' };
    if(lang === 'en'){
      if(q.en) return { text:q.en, lang:'en', dir:'ltr' };
      if(q.ar) return { text:q.ar, lang:'ar', dir:'rtl' };
      return null;
    }
    if(q.ar) return { text:q.ar, lang:'ar', dir:'rtl' };
    if(q.en) return { text:q.en, lang:'en', dir:'ltr' };
    return null;
  }

  function quoteBlock(s, lang){
    const resolved = resolveQuote(s, lang);
    if(!resolved) return '';
    return '<p class="story-book-quote" lang="' + resolved.lang + '" dir="' + resolved.dir + '">\u201C' + resolved.text + '\u201D</p>';
  }

  /* ==========================================================
     Featured story book (stories.html)
     ========================================================== */
  function initBook(){
    const book = document.getElementById('story-book');
    if(!book) return;
    const stories = window.EDS_STORIES || [];
    const dotsWrap = document.getElementById('story-book-dots');
    let index = 0;
    let animating = false;

    function buildPage(s, lang){
      const page = document.createElement('div');
      page.className = 'story-book-page';
      const hasQuote = !!resolveQuote(s, lang);
      page.innerHTML =
        '<span class="story-book-pen" aria-hidden="true">' + EDS.renderIcon('pen') + '</span>' +
        (hasQuote ? '<span class="story-book-quote-mark" aria-hidden="true">\u201C</span>' : '') +
        '<div class="story-book-quote-wrap">' + quoteBlock(s, lang) + '</div>' +
        (s.context[lang] ? '<p class="story-book-context">' + s.context[lang] + '</p>' : '') +
        (!hasQuote && s.followUp[lang] ? '<p class="story-book-context">' + s.followUp[lang] + '</p>' : '') +
        '<div class="story-book-meta">' +
          '<span class="story-book-avatar"><img src="assets/images/stories/' + s.image + '" alt="' + esc(s.name) + '" data-fallback="story" loading="lazy" onerror="this.parentElement.textContent=\'' + initials(s.name) + '\'"></span>' +
          '<div><strong>' + s.name + '</strong><span>' + (lang==='ar' ? 'متدرّبة EDS' : 'EDS Trainee') + '</span></div>' +
        '</div>' +
        '<a class="story-tile-arrow" href="story-details.html?id=' + s.slug + '" aria-label="' + (lang==='ar' ? 'اقرئي القصة كاملة' : 'Read full story') + '" style="position:static; margin-top:22px; width:auto; height:auto; padding:10px 18px; border-radius:100px; background:var(--c-paper-dim); display:inline-flex; gap:8px; align-items:center; font-weight:700; font-size:.85rem; color:var(--c-blue-deep)">' +
          (lang==='ar' ? 'اقرئي القصة كاملة \u2190' : 'Read full story \u2192') +
        '</a>';
      return page;
    }

    function renderDots(lang){
      if(!dotsWrap) return;
      dotsWrap.innerHTML = stories.map(function(_, i){
        return '<button class="dot' + (i===index?' active':'') + '" data-i="' + i + '" aria-label="' + (lang==='ar'?('القصة '+(i+1)):('Story '+(i+1))) + '"></button>';
      }).join('');
      dotsWrap.querySelectorAll('.dot').forEach(function(d){
        d.addEventListener('click', function(){
          const target = parseInt(d.getAttribute('data-i'), 10);
          go(target, target > index ? 'next' : 'prev');
        });
      });
    }

    function go(newIndex, direction){
      if(newIndex === index || newIndex < 0 || newIndex >= stories.length || animating) return;
      animating = true;
      const lang = currentLang();
      const old = book.querySelector('.story-book-page');
      if(old){
        old.classList.remove('settled');
        old.classList.add(direction === 'next' ? 'leaving-next' : 'leaving-prev');
        setTimeout(function(){ old.remove(); }, 520);
      }
      index = newIndex;
      const page = buildPage(stories[index], lang);
      page.classList.add(direction === 'next' ? 'entering-next' : 'entering-prev');
      book.appendChild(page);
      requestAnimationFrame(function(){
        requestAnimationFrame(function(){
          page.classList.remove('entering-next','entering-prev');
          page.classList.add('settled');
        });
      });
      renderDots(lang);
      document.dispatchEvent(new CustomEvent('eds:storybook', { detail:{ index: index } }));
      setTimeout(function(){ animating = false; }, 540);
    }

    function paintInitial(){
      const lang = currentLang();
      const oldPage = book.querySelector('.story-book-page');
      if(oldPage) oldPage.remove();
      const page = buildPage(stories[index], lang);
      page.classList.add('settled');
      book.appendChild(page);
      renderDots(lang);
    }

    const prevBtn = document.querySelector('.story-prev');
    const nextBtn = document.querySelector('.story-next');
    if(prevBtn) prevBtn.addEventListener('click', function(){ go((index - 1 + stories.length) % stories.length, 'prev'); });
    if(nextBtn) nextBtn.addEventListener('click', function(){ go((index + 1) % stories.length, 'next'); });

    document.addEventListener('eds:openstory', function(e){
      const target = e.detail.index;
      go(target, target > index ? 'next' : 'prev');
      book.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'center' });
    });

    if(stories.length){ paintInitial(); }
    document.addEventListener('eds:langchange', paintInitial);
  }

  /* ==========================================================
     Story archive tiles (stories.html)
     ========================================================== */
  function initArchive(){
    const grid = document.getElementById('story-archive');
    if(!grid) return;
    const stories = window.EDS_STORIES || [];

    function paint(){
      const lang = currentLang();
      grid.innerHTML = stories.map(function(s, i){
        const resolved = resolveQuote(s, lang);
        const excerptSource = (resolved && resolved.text) || s.context[lang] || s.followUp[lang] || '';
        const excerptLang = resolved ? resolved.lang : lang;
        const excerptDir = resolved ? resolved.dir : (lang==='ar' ? 'rtl' : 'ltr');
        return (
          '<a class="story-tile' + (i === 0 ? ' featured' : '') + '" href="story-details.html?id=' + s.slug + '" data-i="' + i + '">' +
            '<div class="story-tile-row">' +
              '<span class="story-tile-avatar"><img src="assets/images/stories/' + s.image + '" alt="" data-fallback="story" loading="lazy" onerror="this.parentElement.textContent=\'' + initials(s.name) + '\'"></span>' +
              '<span class="story-tile-name">' + s.name + '</span>' +
            '</div>' +
            '<span class="story-tile-line"></span>' +
            '<p class="story-tile-excerpt" lang="' + excerptLang + '" dir="' + excerptDir + '">' + excerptSource + '</p>' +
            '<span class="story-tile-arrow" aria-hidden="true">' + (lang==='ar' ? '\u2190' : '\u2192') + '</span>' +
          '</a>'
        );
      }).join('');

      grid.querySelectorAll('.story-tile').forEach(function(tile){
        tile.addEventListener('click', function(e){
          // On the stories archive, clicking scrolls the featured book to this story
          // instead of navigating away, unless the click targets the detail page directly via keyboard/middle-click.
          if(e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
          if(!document.getElementById('story-book')) return; // on other pages, let the link work normally
          e.preventDefault();
          const i = parseInt(tile.getAttribute('data-i'), 10);
          document.dispatchEvent(new CustomEvent('eds:openstory', { detail:{ index: i } }));
        });
      });

      if(window.EDS && EDS.animations) EDS.animations.initScrollReveal();
    }
    paint();
    document.addEventListener('eds:langchange', paint);
  }

  /* ==========================================================
     Story detail page (story-details.html)
     ========================================================== */
  function renderDetail(){
    const root = document.getElementById('story-detail-root');
    if(!root) return;
    const slug = EDS.getParam('id');
    const stories = window.EDS_STORIES || [];
    const story = stories.find(function(s){ return s.slug === slug; });

    function paint(){
      const lang = currentLang();
      if(!story){
        root.innerHTML = '<div class="text-center" style="padding:80px 20px">' +
          '<h2 data-en="Story not found" data-ar="لم يتم العثور على القصة">Story not found</h2>' +
          '<a class="btn btn-primary" href="stories.html" style="margin-top:20px" data-en="Back to Stories" data-ar="العودة إلى القصص">Back to Stories</a>' +
          '</div>';
        if(window.EDS && EDS.language) EDS.language.applyLang(lang, true);
        return;
      }
      const idx = stories.indexOf(story);
      const num = String(idx + 1).padStart(2, '0');
      const next = stories[(idx + 1) % stories.length];
      const resolved = resolveQuote(story, lang);

      root.innerHTML =
        '<article class="story-detail reveal in">' +
          '<span class="story-detail-kicker">' + (lang==='ar' ? ('قصة / ' + num) : ('STORY / ' + num)) + '</span>' +
          '<h1>' + story.name + '</h1>' +
          '<div class="story-detail-media clip-reveal">' +
            '<img src="assets/images/stories/' + story.image + '" alt="' + esc(story.name) + '" data-fallback="story" loading="lazy">' +
          '</div>' +
          '<div class="story-detail-body">' +
            (story.context[lang] ? '<p>' + story.context[lang] + '</p>' : '') +
            (resolved ? '<blockquote class="story-detail-pullquote" lang="' + resolved.lang + '" dir="' + resolved.dir + '">\u201C' + resolved.text + '\u201D</blockquote>' : '') +
            (story.followUp[lang] ? '<p>' + story.followUp[lang] + '</p>' : '') +
          '</div>' +
          '<div class="story-detail-meta">' +
            '<span class="story-book-avatar"><img src="assets/images/stories/' + story.image + '" alt="" data-fallback="story" loading="lazy" onerror="this.parentElement.textContent=\'' + initials(story.name) + '\'"></span>' +
            '<div><strong>' + story.name + '</strong><span style="display:block; color:var(--c-ink-soft); font-size:.88rem">' + (lang==='ar' ? 'متدرّبة EDS' : 'EDS Trainee') + '</span></div>' +
          '</div>' +
        '</article>' +
        '<nav class="journal-nav" style="max-width:680px">' +
          '<a href="stories.html" class="journal-nav-all">' + (lang==='ar' ? 'كل القصص' : 'All stories') + '</a>' +
          '<a href="story-details.html?id=' + next.slug + '">' + (lang==='ar' ? 'القصة التالية \u2190' : 'Next Story \u2192') + '</a>' +
        '</nav>';

      if(window.EDS && EDS.language) EDS.language.applyLang(lang, true);
      if(window.EDS && EDS.animations) EDS.animations.initClipReveal ? EDS.animations.initClipReveal() : null;
      document.querySelectorAll('.story-detail-media').forEach(function(el){ el.classList.add('clip-reveal','in'); });
      document.title = story.name + ' \u2014 EDS';
    }
    paint();
    document.addEventListener('eds:langchange', paint);
  }

  document.addEventListener('DOMContentLoaded', function(){
    initBook();
    initArchive();
    renderDetail();
  });
})();
