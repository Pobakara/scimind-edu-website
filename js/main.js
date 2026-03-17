/* ═══════════════════════════════════════════════
   SciMind Education – main.js
   Handles: Navbar scroll, mobile menu, tabs,
            modals, scroll animations, forms
═══════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────
   1. NAVBAR – scroll behaviour
   Three states:
   • Default  : subtle tint (at top)
   • .scrolled : frosted dark glass (scrolled down)
   • .scroll-up: near-solid dark (scrolling back up)
────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = window.scrollY;

  const onScroll = () => {
    const currentY  = window.scrollY;
    const atTop     = currentY <= 40;
    const goingUp   = currentY < lastScrollY;

    if (atTop) {
      // Back at the top: clear everything, use base style only
      navbar.classList.remove('scrolled', 'scroll-up');
    } else if (goingUp) {
      // Scrolling upward: most opaque so body content never shows through
      navbar.classList.add('scrolled', 'scroll-up');
    } else {
      // Scrolling downward (or stationary mid-page): standard frosted glass
      navbar.classList.add('scrolled');
      navbar.classList.remove('scroll-up');
    }

    lastScrollY = currentY;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


/* ──────────────────────────────────
   2. MOBILE MENU – toggle
────────────────────────────────── */
(function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu   = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Close on any nav link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => menu.classList.add('hidden'));
  });
})();


/* ──────────────────────────────────
   3. LEARNING HUB – tab switching
────────────────────────────────── */
(function initHubTabs() {
  const tabs     = document.querySelectorAll('.hub-tab');
  const contents = document.querySelectorAll('.tab-content');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update tab active state
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update content visibility
      contents.forEach(c => {
        c.classList.remove('active');
        if (c.id === `tab-${target}`) c.classList.add('active');
      });
    });
  });
})();


/* ──────────────────────────────────
   4. SCROLL ANIMATIONS – fade-in-up
────────────────────────────────── */
(function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-up');
  if (!elements.length) return;

  const reveal = (el) => {
    const delay = el.style.getPropertyValue('--delay') || '0ms';
    setTimeout(() => el.classList.add('visible'), parseInt(delay) || 0);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  elements.forEach(el => {
    // If already in viewport on page load, reveal immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal(el);
    } else {
      observer.observe(el);
    }
  });
})();


/* ──────────────────────────────────
   5. VIDEO MODAL
────────────────────────────────── */
function openVideoModal(videoId, title, subtitle) {
  const modal    = document.getElementById('videoModal');
  const frame    = document.getElementById('videoFrame');
  const titleEl  = document.getElementById('videoModalTitle');
  const subEl    = document.getElementById('videoModalSub');
  if (!modal) return;

  titleEl.textContent = title    || '';
  subEl.textContent   = subtitle || '';
  frame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}


/* ──────────────────────────────────
   6. PORTAL MODAL
────────────────────────────────── */
const PORTAL_CONFIG = {
  student: {
    title: 'Student Portal',
    desc:  'Welcome to the SciMind Student Portal. Access your timetable, learning materials, progress reports, and assignment submissions. Use your enrolled student credentials to log in.',
    url:   'https://student.scimindeducation.com.au',  // Replace with real URL
    label: 'Launch Student Portal',
  },
  parent: {
    title: 'Parent Dashboard',
    desc:  'Monitor your child\'s progress, view upcoming sessions, receive teacher reports, and manage billing through Vinsara. Log in with the parent account credentials provided at enrolment.',
    url:   'https://parent.scimindeducation.com.au',   // Replace with real URL
    label: 'Launch Parent Dashboard',
  },
  admin: {
    title: 'Internal Admin Portal',
    desc:  'This portal is restricted to SciMind Education staff only. It is hosted on Google Cloud and requires your staff credentials. If you require access, contact the administration team.',
    url:   'https://admin.scimindeducation.com.au',    // Replace with real URL
    label: 'Launch Admin Portal',
  },
};

function openPortalModal(type) {
  const config = PORTAL_CONFIG[type];
  if (!config) return;

  const modal   = document.getElementById('portalModal');
  const titleEl = document.getElementById('portalModalTitle');
  const descEl  = document.getElementById('portalModalDesc');
  const linkEl  = document.getElementById('portalModalLink');
  if (!modal) return;

  titleEl.textContent = config.title;
  descEl.textContent  = config.desc;
  linkEl.href         = config.url;
  linkEl.textContent  = config.label + ' →';

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}


/* ──────────────────────────────────
   7. PREMIUM MODAL
────────────────────────────────── */
function openPremiumModal() {
  const modal = document.getElementById('premiumModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}


/* ──────────────────────────────────
   8. CLOSE MODAL (generic)
────────────────────────────────── */
function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Stop video playback when closing video modal
  if (id === 'videoModal') {
    const frame = document.getElementById('videoFrame');
    if (frame) frame.src = '';
  }
}

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    ['videoModal', 'portalModal', 'premiumModal'].forEach(closeModal);
  }
});


/* ──────────────────────────────────
   9. TOAST NOTIFICATION
────────────────────────────────── */
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  const msg   = document.getElementById('toastMsg');
  if (!toast || !msg) return;

  msg.textContent = message;
  toast.classList.remove('translate-y-16', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-16', 'opacity-0', 'pointer-events-none');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, duration);
}


/* ──────────────────────────────────
   10. ENROLMENT FORM
────────────────────────────────── */
function handleEnrol(event) {
  event.preventDefault();
  const form = event.target;

  // In production, replace this with a fetch() call to your backend / Google Form / Formspree
  // e.g. POST to https://formspree.io/f/YOUR_FORM_ID

  const name    = form.querySelector('[type="text"]').value;
  const email   = form.querySelector('[type="email"]').value;
  const program = form.querySelector('select').value;

  console.log('Enrolment submitted:', { name, email, program });

  form.reset();
  showToast('Enrolment submitted! We will be in touch soon.');
}


/* ──────────────────────────────────
   11. SMOOTH ANCHOR SCROLL (fallback for older Safari)
────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const id = this.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();


/* ──────────────────────────────────
   12. ACTIVE NAV LINK HIGHLIGHT
────────────────────────────────── */
(function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('text-mint');
            link.classList.add('text-white/70');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('text-mint');
              link.classList.remove('text-white/70');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(section => observer.observe(section));
})();

/* ──────────────────────────────────
   13. LOGIN DROPDOWN
────────────────────────────────── */
window.toggleLoginDropdown = function () {
  const dd      = document.getElementById('loginDropdown');
  const chevron = document.getElementById('loginChevron');
  if (!dd) return;
  const isHidden = dd.classList.toggle('hidden');
  if (chevron) chevron.style.transform = isHidden ? '' : 'rotate(180deg)';
};

// Close when clicking outside the dropdown container
document.addEventListener('click', function (e) {
  const container = document.getElementById('loginDropdownContainer');
  if (container && !container.contains(e.target)) {
    const dd = document.getElementById('loginDropdown');
    const chevron = document.getElementById('loginChevron');
    if (dd && !dd.classList.contains('hidden')) {
      dd.classList.add('hidden');
      if (chevron) chevron.style.transform = '';
    }
  }
});
