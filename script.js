(() => {
  // Mobile viewport height helper (improves resize + rotation behaviour).
  const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  };
  setVh();
  window.addEventListener('resize', setVh);
  window.addEventListener('orientationchange', setVh);

  // Smooth scrolling (desktop only).
  let lenis = null;
  try {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (!prefersReduced && !isCoarsePointer && typeof Lenis !== 'undefined') {
      lenis = new Lenis({ smoothWheel: true, smoothTouch: false });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      window.addEventListener('resize', () => {
        try {
          if (lenis && typeof lenis.resize === 'function') lenis.resize();
        } catch (_) {}
      });
    }
  } catch (_) {}

  // Custom cursor.
  const cursor = document.getElementById('cursor');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      if (typeof gsap !== 'undefined') {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.12, overwrite: true });
      } else {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    });
  }

  // Hero text interaction (index page).
  const letters = document.querySelectorAll('.letter');
  const danceZone = document.getElementById('hero-text');
  if (danceZone && letters.length > 0 && typeof gsap !== 'undefined') {
    danceZone.addEventListener('mouseenter', () => {
      letters.forEach((l) => {
        gsap.to(l, {
          x: gsap.utils.random(-20, 20),
          y: gsap.utils.random(-30, 30),
          rotation: gsap.utils.random(-15, 15),
          color: '#FF0033',
          duration: 0.6,
        });
      });
      if (cursor) gsap.to(cursor, { scale: 8, mixBlendMode: 'difference', backgroundColor: 'white', duration: 0.25 });
    });

    danceZone.addEventListener('mouseleave', () => {
      gsap.to(letters, { x: 0, y: 0, rotation: 0, color: 'white', duration: 0.6 });
      if (cursor) gsap.to(cursor, { scale: 1, mixBlendMode: 'normal', backgroundColor: '#FF0033', duration: 0.25 });
    });
  }

  // Mobile nav.
  const navToggle = document.querySelector('.nav-toggle');
  const navDrawer = document.querySelector('.nav-drawer');
  const navBackdrop = document.querySelector('.nav-backdrop');
  const desktopLinks = document.querySelector('nav .nav-links');

  function setNavOpen(open) {
    if (!navToggle || !navDrawer || !navBackdrop) return;

    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navDrawer.hidden = !open;
    navBackdrop.hidden = !open;

    document.documentElement.style.overflow = open ? 'hidden' : '';
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (navToggle && navDrawer && navBackdrop) {
    // Populate drawer with nav links (clone) if empty.
    if (navDrawer.childElementCount === 0 && desktopLinks) {
      const clone = desktopLinks.cloneNode(true);
      clone.style.display = 'block';
      // Remove container div styles by moving anchors.
      navDrawer.innerHTML = '';
      clone.querySelectorAll('a').forEach((a) => navDrawer.appendChild(a));
    }

    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      setNavOpen(!open);
    });

    navBackdrop.addEventListener('click', () => setNavOpen(false));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setNavOpen(false);
    });

    // Close drawer when clicking a link.
    navDrawer.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t.tagName === 'A') setNavOpen(false);
    });
  }

  // Work archive data + rendering.
  const workList = document.getElementById('work-list');
  if (workList) {
    const PROJECTS = [
      // 2023
      {
        year: 2023,
        title: 'Black Conversations',
        detail: 'Castle Milk Stout (S2–S3)',
        client: 'Mzansi Magic • Castle Milk Stout • DStv',
        category: 'Branded',
        summary:
          'Culture-led panel series delivered as an African Film Project (AFP) — premium visuals, clear editorial arcs, and broadcast-ready finishing.',
        writeup:
          'A flagship culture conversation series built with Castle Milk Stout in partnership with Mzansi Magic and DStv. We deliver end-to-end production (field + studio), editorial shaping, and finishing — designed to serve both broadcaster standards and brand impact.',
        caseStudy: 'project-black-conversations.html',
        links: [
          { label: 'Campaign page', url: 'https://www.castlemilkstout.co.za/landing/black-conversations' },
          { label: 'YouTube playlist', url: 'https://www.youtube.com/playlist?list=PLOjiFB_FyP5U0EWghZkTAThoHMQFFajMP' },
        ],
      },
      {
        year: 2023,
        title: 'Widows Unveiled',
        detail: 'Showmax Original (S1)',
        client: 'Showmax',
        category: 'TV',
        summary:
          'Premium follow-reality storytelling with a docu tone — built around access, emotion and a tight post pipeline.',
        writeup:
          'A Showmax Original exploring the lives and journeys of widows navigating public loss and personal reinvention. We focus on intimate, character-led coverage and a premium finishing approach suited to streaming audiences.',
        caseStudy: 'project-widows-unveiled.html',
        links: [
          { label: 'Showmax page', url: 'https://stories.showmax.com/ke/originals/widows-unveiled' },
          { label: 'Trailer playlist', url: 'https://www.youtube.com/playlist?list=PLrC3R2F_ZzImYN5rJo3GWq5ojLfYS1-Jj' },
          { label: 'IMDb listing', url: 'https://www.imdb.com/title/tt31079869/' },
        ],
      },
      {
        year: 2023,
        title: 'Married Our Way',
        detail: 'Wedding Reality (S1)',
        client: 'SABC 2',
        category: 'TV',
        summary:
          'A wedding reality format celebrating distinctive couples and unique ceremonies — delivered with broadcast discipline.',
        writeup:
          'A celebration of couples getting married on their own terms — diverse aesthetics, traditions and venues across South Africa. We deliver structured coverage for each episode, shaped for clean broadcast delivery and repeatable turnaround.',
        caseStudy: 'project-married-our-way.html',
        links: [
          { label: 'Teasers (TVSA)', url: 'https://www.tvsa.co.za/user/blogs/viewblogpost.aspx?blogpostid=55810' },
          { label: 'Press (Sunday World)', url: 'https://sundayworld.co.za/celebrity-news/entertainment/abundance-of-drama-twists-and-turns-in-married-our-way/' },
        ],
      },
      {
        year: 2023,
        title: 'Uthando Nes\'thembu',
        detail: 'S7',
        client: 'Mzansi Magic',
        category: 'TV',
        summary:
          'Multi-season follow-reality franchise delivery with consistent schedule discipline, field production and story shaping in post.',
        writeup:
          'One of South Africa\'s most-watched follow-reality franchises. We contribute to the long-running production engine — field coverage, story shaping, and delivery aligned to broadcaster standards and tight turnaround cycles.',
        caseStudy: 'project-uthando-nesthembu.html',
        links: [
          { label: 'IMDb listing', url: 'https://www.imdb.com/title/tt36106195/' },
          { label: 'Awards listing (TVSA)', url: 'https://www.tvsa.co.za/shows/viewshowseasons.aspx?season=17&showId=2394' },
        ],
      },
      {
        year: 2023,
        title: 'DStv Delicious Festival',
        detail: 'Aftermovie 2023',
        client: 'Channel O • Sanlam',
        category: 'Events',
        summary:
          'High-energy festival recap capturing performances, crowd moments and brand integration — shot and finished for multi-platform use.',
        caseStudy: 'project-dstv-delicious.html',
        links: [
          { label: 'Festival Instagram', url: 'https://www.instagram.com/dstvdeliciousfestival/' },
          { label: 'Festival videos', url: 'https://www.youtube.com/hashtag/dstvdeliciousfestival' },
        ],
      },
      {
        year: 2023,
        title: 'An Intimate Night With Gregory Porter',
        detail: 'Concert Special',
        client: 'Mzansi Magic Music • Sanlam',
        category: 'Events',
        summary:
          'Concert special captured with a cinematic multi-camera approach and polished broadcast-ready finishing.',
      },

      // 2022
      {
        year: 2022,
        title: 'Black Conversations',
        detail: 'Castle Milk Stout (S1)',
        client: 'Mzansi Magic • Castle Milk Stout • DStv',
        category: 'Branded',
        summary:
          'Season one AFP delivery built for both brand resonance and broadcaster requirements, with premium visuals and narrative cohesion.',
        caseStudy: 'project-black-conversations.html',
        links: [
          { label: 'Campaign page', url: 'https://www.castlemilkstout.co.za/landing/black-conversations' },
          { label: 'YouTube playlist', url: 'https://www.youtube.com/playlist?list=PLOjiFB_FyP5U0EWghZkTAThoHMQFFajMP' },
        ],
      },
      {
        year: 2022,
        title: 'Uthando Nes\'thembu',
        detail: 'S6',
        client: 'Mzansi Magic',
        category: 'TV',
        summary:
          'Broadcast-standard follow-reality production delivered with repeatable systems and reliable turnaround.',
        caseStudy: 'project-uthando-nesthembu.html',
        links: [
          { label: 'IMDb listing', url: 'https://www.imdb.com/title/tt36106195/' },
        ],
      },
      {
        year: 2022,
        title: 'Inhlawulo: The Damages',
        detail: 'S1–S2',
        client: 'e.TV',
        category: 'TV',
        summary:
          'Reality format combining relationship dynamics with cultural context — produced for broadcast compliance and fast post turnaround.',
      },
      {
        year: 2022,
        title: 'Love & Conflict',
        detail: 'S1',
        client: 'e.TV',
        category: 'TV',
        summary:
          'Reality series produced with a character-first approach, balancing drama beats with clean coverage and strong post shaping.',
      },
      {
        year: 2022,
        title: 'DStv Delicious Festival',
        detail: 'Aftermovie 2022',
        client: 'Channel O',
        category: 'Events',
        summary:
          'Festival aftermovie capturing headline moments, fashion and atmosphere — optimised for digital release and cutdowns.',
        caseStudy: 'project-dstv-delicious.html',
        links: [
          { label: 'Festival Instagram', url: 'https://www.instagram.com/dstvdeliciousfestival/' },
          { label: 'Channel O', url: 'https://www.dstv.com/channelo/en-za/home' },
        ],
      },
      {
        year: 2022,
        title: 'Macufe Festival',
        detail: 'Aftermovie 2022',
        client: 'Channel O',
        category: 'Events',
        summary:
          'Event recap combining performance coverage with audience energy and sponsor visibility, delivered as digital-first content.',
      },
      {
        year: 2022,
        title: '2022 World Cup Aftermovie',
        detail: 'Event Film',
        client: 'Channel O • SuperSport',
        category: 'Events',
        summary:
          'Sports-event recap delivering highlight-driven storytelling and atmosphere coverage for multi-platform distribution.',
      },

      // 2021
      {
        year: 2021,
        title: 'Uthando Nes\'thembu',
        detail: 'S5',
        client: 'Mzansi Magic',
        category: 'TV',
        summary:
          'Season delivery within a long-running franchise, combining strong field production with efficient post workflows.',
        caseStudy: 'project-uthando-nesthembu.html',
        links: [
          { label: 'IMDb listing', url: 'https://www.imdb.com/title/tt36106195/' },
        ],
      },
      {
        year: 2021,
        title: 'The Madiba Do Up',
        detail: 'S1',
        client: 'Mzansi Magic • SuperSport',
        category: 'TV',
        summary:
          'Reality series produced for a broad broadcast audience with tight schedule management and repeatable production systems.',
      },
      {
        year: 2021,
        title: 'Dare Lie To Me',
        detail: 'S1',
        client: 'e.TV',
        category: 'TV',
        summary:
          'Studio/reality format produced with controlled lighting, clear coverage plans and decisive editorial finishing.',
      },
      {
        year: 2021,
        title: 'TEDx Johannesburg',
        detail: 'Insert & Documentary',
        client: 'TEDx',
        category: 'Film/Doc',
        summary:
          'Insert and documentary coverage capturing speaker moments and event storytelling with clean audio and cinematic visuals.',
      },

      // 2020
      {
        year: 2020,
        title: 'Uthando Nes\'thembu',
        detail: 'S4',
        client: 'Mzansi Magic',
        category: 'TV',
        summary:
          'Follow-reality season delivered under broadcast constraints with consistent quality and turnaround.',
        caseStudy: 'project-uthando-nesthembu.html',
        links: [
          { label: 'IMDb listing', url: 'https://www.imdb.com/title/tt36106195/' },
        ],
      },

      // 2019
      {
        year: 2019,
        title: 'Abobaba',
        detail: 'S1',
        client: 'Mzansi Magic',
        category: 'TV',
        summary:
          'Reality series produced for prime-time audiences, focusing on character arcs and crisp episodic pacing.',
      },
      {
        year: 2019,
        title: 'The Award Ceremony',
        detail: 'Short Film',
        client: 'Independent',
        category: 'Film/Doc',
        summary:
          'Independent short film production with festival-ready finishing and cinematic storytelling.',
      },
      {
        year: 2019,
        title: 'Sugarbird Summer Campaign',
        detail: 'TVC',
        client: 'Sugarbird Gin',
        category: 'Branded',
        summary:
          'Brand commercial campaign delivering premium lifestyle visuals for high-impact brand communications.',
      },

      // 2018
      {
        year: 2018,
        title: 'Marry Me Now SA',
        detail: 'S1',
        client: '1Magic (DStv)',
        category: 'TV',
        summary:
          'Relationship-led reality series produced for broadcast, focused on strong participant storytelling and rewatch value.',
      },
      {
        year: 2018,
        title: 'DStv Delicious Festival',
        detail: 'Aftermovie 2018',
        client: 'Channel O',
        category: 'Events',
        summary:
          'Festival aftermovie capturing the energy of live performance and culture moments for digital distribution.',
        caseStudy: 'project-dstv-delicious.html',
        links: [
          { label: 'Festival Instagram', url: 'https://www.instagram.com/dstvdeliciousfestival/' },
          { label: 'Festival videos', url: 'https://www.youtube.com/hashtag/dstvdeliciousfestival' },
        ],
      },
      {
        year: 2018,
        title: 'Uthando Nes\'thembu',
        detail: 'S3',
        client: 'Mzansi Magic',
        category: 'TV',
        summary:
          'Early-season delivery on a flagship follow-reality franchise, building production discipline that scaled into multi-season work.',
        caseStudy: 'project-uthando-nesthembu.html',
        links: [
          { label: 'IMDb listing', url: 'https://www.imdb.com/title/tt36106195/' },
        ],
      },
    ];

    const searchInput = document.getElementById('work-search');
    const filterSelect = document.getElementById('work-filter');
    const clearBtn = document.getElementById('work-clear');

    const backdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalYear = document.getElementById('modal-year');
    const modalClient = document.getElementById('modal-client');
    const modalCategory = document.getElementById('modal-category');

    const modalLinksWrap = document.getElementById('modal-links');
    const modalLinksList = document.getElementById('modal-links-list');
    const modalActions = document.getElementById('modal-actions');
    const modalCase = document.getElementById('modal-case');

    function normalize(s) {
      return String(s || '').toLowerCase().trim();
    }

    // Some browsers treat the `hidden` attribute as a low-specificity rule.
    // Because we intentionally style modals/nav with explicit `display`, we
    // hard-toggle both `hidden` and `style.display` so hidden UI never leaks.
    function hardHide(el) {
      if (!el) return;
      el.hidden = true;
      el.setAttribute('aria-hidden', 'true');
      el.style.display = 'none';
    }

    function hardShow(el, displayValue) {
      if (!el) return;
      el.hidden = false;
      el.removeAttribute('aria-hidden');
      el.style.display = displayValue || '';
    }

    function openModal(p) {
      if (!backdrop || !modal) return;
      modalTitle.textContent = p.title;
      modalBody.textContent = p.writeup || p.summary;
      modalYear.textContent = `${p.year} • ${p.detail}`;
      modalClient.textContent = p.client;
      modalCategory.textContent = p.category;
      
      // Links
      try {
        if (modalLinksList) modalLinksList.innerHTML = '';
        if (modalLinksWrap) modalLinksWrap.hidden = !(p.links && p.links.length);
        if (p.links && p.links.length && modalLinksList) {
          p.links.forEach((l) => {
            if (!l || !l.url) return;
            const a = document.createElement('a');
            a.className = 'modal-link';
            a.href = l.url;
            a.target = '_blank';
            a.rel = 'noopener';
            a.innerHTML = `<span>${l.label || 'Open link'}</span><span style="opacity:.6;">↗</span>`;
            modalLinksList.appendChild(a);
          });
        }
      } catch (_) {}

      // Actions
      try {
        if (modalActions) modalActions.hidden = false;
        if (modalCase) {
          if (p.caseStudy) {
            modalCase.href = p.caseStudy;
            modalCase.hidden = false;
          } else {
            modalCase.hidden = true;
          }
        }
      } catch (_) {}

      hardShow(backdrop, 'block');
      hardShow(modal, 'grid');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!backdrop || !modal) return;
      hardHide(backdrop);
      hardHide(modal);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    // Ensure modal is never visible on first paint.
    closeModal();

    if (backdrop) backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    function render() {
      const q = normalize(searchInput ? searchInput.value : '');
      const cat = filterSelect ? filterSelect.value : 'all';

      const items = PROJECTS
        .slice()
        .sort((a, b) => b.year - a.year)
        .filter((p) => {
          const inCat = cat === 'all' ? true : normalize(p.category) === normalize(cat);
          if (!inCat) return false;
          if (!q) return true;
          const hay = normalize(`${p.title} ${p.detail} ${p.client} ${p.category} ${p.summary}`);
          return hay.includes(q);
        });

      workList.innerHTML = '';

      if (items.length === 0) {
        const empty = document.createElement('div');
        empty.style.padding = '18px';
        empty.style.opacity = '0.7';
        empty.textContent = 'No projects found. Try a different search or category.';
        workList.appendChild(empty);
        return;
      }

      items.forEach((p) => {
        const row = document.createElement('div');
        row.className = 'work-row';
        row.tabIndex = 0;
        row.setAttribute('role', 'button');
        row.setAttribute('aria-label', `Open details for ${p.title}`);

        row.innerHTML = `
          <div class="work-year">${p.year}</div>
          <div>
            <div class="work-title">${p.title}</div>
            <div class="work-sub">${p.detail} • ${p.client}</div>
          </div>
          <div class="work-meta">${p.category}</div>
        `;

        row.addEventListener('click', () => openModal(p));
        row.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') openModal(p);
        });

        workList.appendChild(row);
      });
    }

    if (searchInput) searchInput.addEventListener('input', render);
    if (filterSelect) filterSelect.addEventListener('change', render);
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (filterSelect) filterSelect.value = 'all';
        render();
        if (searchInput) searchInput.focus();
      });
    }

    render();
  }
})();
