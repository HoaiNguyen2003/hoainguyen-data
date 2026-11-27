/* CV / Portfolio - progressive enhancement only; page content is fully readable without JS. */
(() => {
  'use strict';

  const root = document.documentElement;
  const LANGS = ['vi', 'en'];
  const TITLES = {
    vi: 'Nguyễn Thanh Hoài | Data Engineer',
    en: 'Nguyen Thanh Hoai | Data Engineer',
  };

  /* ---------- Language toggle ---------- */
  function setLang(lang, persist) {
    if (!LANGS.includes(lang)) lang = 'vi';
    root.setAttribute('data-lang', lang);
    root.lang = lang;
    document.title = TITLES[lang];

    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.setLang === lang));
    });
    document.querySelectorAll(`[data-alt-${lang}]`).forEach((el) => {
      el.alt = el.getAttribute(`data-alt-${lang}`);
    });
    document.querySelectorAll(`[data-label-${lang}]`).forEach((el) => {
      el.setAttribute('aria-label', el.getAttribute(`data-label-${lang}`));
    });

    if (persist) {
      try { localStorage.setItem('lang', lang); } catch (e) { /* storage blocked: ignore */ }
      try {
        const url = new URL(location.href);
        if (url.searchParams.has('lang')) {
          url.searchParams.set('lang', lang);
          history.replaceState(null, '', url);
        }
      } catch (e) { /* replaceState can throw on file:// in some browsers */ }
    }
  }

  setLang(root.getAttribute('data-lang'), false); // head script already resolved URL/storage
  document.querySelectorAll('[data-set-lang]').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.setLang, true));
  });

  /* ---------- Gallery lightbox (native <dialog>: focus trap + Esc built in) ---------- */
  const dialog = document.getElementById('lightbox');
  const items = Array.from(document.querySelectorAll('.gallery__btn'));
  if (dialog && items.length && typeof dialog.showModal === 'function') {
    const img = dialog.querySelector('.lightbox__img');
    const caption = dialog.querySelector('.lightbox__caption');
    let index = 0;
    let opener = null;

    const show = (i) => {
      index = (i + items.length) % items.length;
      const item = items[index];
      const thumb = item.querySelector('img');
      img.src = item.getAttribute('href');
      img.alt = thumb ? thumb.alt : '';
      const figcaption = item.closest('figure').querySelector('figcaption');
      caption.innerHTML = figcaption ? figcaption.innerHTML : ''; // static, author-controlled markup
    };

    items.forEach((item, i) => {
      item.addEventListener('click', (event) => {
        event.preventDefault(); // without JS the link simply opens the full image
        opener = item;
        show(i);
        dialog.showModal();
      });
    });

    dialog.addEventListener('click', (event) => {
      const action = event.target.closest('[data-lb]');
      if (action) {
        const type = action.dataset.lb;
        if (type === 'close') dialog.close();
        else show(index + (type === 'next' ? 1 : -1));
      } else if (event.target === dialog) {
        dialog.close(); // click on the dark backdrop area
      }
    });

    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') show(index + 1);
      if (event.key === 'ArrowLeft') show(index - 1);
    });

    dialog.addEventListener('close', () => {
      img.removeAttribute('src');
      if (opener) opener.focus();
    });
  }

  /* ---------- Highlight the nav link of the section in view ---------- */
  const links = new Map(
    Array.from(document.querySelectorAll('.nav a[href^="#"]')).map((a) => [a.getAttribute('href').slice(1), a])
  );
  if ('IntersectionObserver' in window && links.size) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        const active = links.get(entry.target.id);
        if (active) active.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    links.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
