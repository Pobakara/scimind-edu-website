# SciMind Education — Website Documentation

> **Last updated:** March 2026  
> **Stack:** Static HTML · Tailwind CSS (CDN) · Alpine.js 3.14.1 (CDN) · Custom CSS · Vanilla JS  
> **Author / Agency:** Internal build

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [File & Folder Structure](#2-file--folder-structure)
3. [Tech Stack & Dependencies](#3-tech-stack--dependencies)
4. [Brand & Design System](#4-brand--design-system)
5. [Site Navigation & Links](#5-site-navigation--links)
6. [Page-by-Page Breakdown](#6-page-by-page-breakdown)
7. [CSS Architecture — `custom.css`](#7-css-architecture--customcss)
8. [JavaScript — `main.js`](#8-javascript--mainjs)
9. [Image Assets](#9-image-assets)
10. [Third-Party Integrations](#10-third-party-integrations)
11. [SEO & Structured Data](#11-seo--structured-data)
12. [Responsiveness & Breakpoints](#12-responsiveness--breakpoints)
13. [Interactive Components (Alpine.js)](#13-interactive-components-alpinejs)
14. [Forms & Enrolment Flow](#14-forms--enrolment-flow)
15. [Partnership — Vinsara Institute](#15-partnership--vinsara-institute)
16. [Maintenance Notes](#16-maintenance-notes)

---

## 1. Project Overview

**SciMind Education** is a Melbourne-based science tutoring provider. This is a fully static marketing website (no server, no database) built to:

- Showcase VCE and secondary science tutoring programs
- Attract enrolment enquiries via a multi-step form
- Communicate the SciMind–Vinsara educational partnership
- Provide a student/parent resource hub (Learning Hub)

The site uses a **dark glassmorphic theme** across all pages, with alternating light/grey sections for contrast and readability.

---

## 2. File & Folder Structure

```
SciMind_WebPage/
│
├── index.html                  ← Homepage (main entry point)
│
├── pages/
│   ├── about.html              ← About Us (team, mission, partners)
│   ├── programs.html           ← All Programs overview
│   ├── vce-biology.html        ← VCE Biology program detail
│   ├── vce-chemistry.html      ← VCE Chemistry program detail
│   ├── year7-10-science.html   ← Year 7–10 Science program detail
│   ├── year4-6-science.html    ← Year 4–6 Science program detail
│   ├── learning-hub.html       ← Student Learning Hub (videos, notes, portals)
│   └── enrol.html              ← Enrolment & Contact page
│
├── css/
│   └── custom.css              ← All custom styles (version-tagged: ?v=12)
│
├── js/
│   └── main.js                 ← All custom JavaScript
│
└── assets/
    └── images/
        ├── H - White and Color.svg       ← SciMind horizontal logo (used in navbar/footer)
        ├── V - White and Color.svg       ← Vinsara small V logo (used in partner sections)
        └── Vinsara - Logo - Vertical.png ← Vinsara vertical logo (used in partnership section)
```

> **Path convention for pages/\*.html:** All references to CSS, JS, and images use `../` to step up from `pages/` to the root. For example: `../css/custom.css`, `../js/main.js`, `../assets/images/`.

---

## 3. Tech Stack & Dependencies

| Dependency | Version | How Loaded | Purpose |
|---|---|---|---|
| **Tailwind CSS** | CDN (latest) | `<script src="https://cdn.tailwindcss.com">` | Utility-first CSS framework |
| **Alpine.js** | 3.14.1 | `<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js">` | Reactive UI without build step |
| **Google Fonts — Inter** | — | `fonts.googleapis.com` | Body / UI font |
| **Google Fonts — Poppins** | — | `fonts.googleapis.com` | Display / heading font |
| **Custom CSS** | v12 | `../css/custom.css?v=12` | Brand styles, components, animations |
| **Custom JS** | — | `../js/main.js` | Navbar, mobile menu, tabs, modals, forms |

### Tailwind Config (inline in each page `<head>`)

```js
tailwind.config = {
  theme: { extend: {
    colors: {
      navy:  { DEFAULT: '#003a7d', light: '#0050b0', dark: '#002558' },
      teal:  { DEFAULT: '#0b81a2', light: '#0d9ac2', dark: '#086882' },
      mint:  { DEFAULT: '#59a89c', light: '#6bbfb3', dark: '#448a7e' },
    },
    fontFamily: {
      sans:    ['Inter', 'system-ui', 'sans-serif'],
      display: ['Poppins', 'system-ui', 'sans-serif'],
    },
  }}
}
```

---

## 4. Brand & Design System

### 4.1 Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `--navy` | `#003a7d` | Primary brand colour, deep backgrounds, buttons |
| `--teal` | `#0b81a2` | Accent — links, icons, borders, gradients |
| `--mint` | `#59a89c` | Secondary accent — hover states, active nav, gradients |
| `--bg` | `#020d1a` | Page dark background |
| Section light | `#f8fafc` | `.section-light` alternating sections |
| Section grey | `#f1f5f9` | `.section-grey` alternating sections |

### 4.2 Typography

| Role | Font | Weight | Class |
|---|---|---|---|
| Body / UI | Inter | 300–700 | `font-sans` (default) |
| Headings / Display | Poppins | 400, 600, 700, 800 | `font-display` |

**Heading sizes used (Tailwind):**
- H1 heroes: `text-5xl md:text-6xl xl:text-7xl`
- Section titles: `text-4xl md:text-5xl`
- Card headings: `text-xl` – `text-2xl`

### 4.3 Section Theming

Two alternating light-background themes used when breaking up the dark page flow:

```css
.section-light  { background: #f8fafc; color: #1e293b }
.section-grey   { background: #f1f5f9; color: #1e293b }
```

On light/grey sections, all child elements (`.glass-card`, headings, `.section-badge`, text) are automatically overridden via scoped CSS to render in dark text / adjusted colours.

### 4.4 Glass Morphism

```css
.glass-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(16px);
}
```

On light sections, `.glass-card` is overridden:
```css
/* within .section-light / .section-grey */
.glass-card { background: #ffffff; border: 1px solid #e2e8f0; box-shadow: ...; backdrop-filter: none; }
```

### 4.5 Button Components

| Class | Style | Usage |
|---|---|---|
| `.btn-primary` | Gradient navy→teal, white text, pill rounded | Primary CTAs ("Enrol Now", "Get Started") |
| `.btn-secondary` | Glass border, teal text, hover fill | Secondary actions ("Learn More", "View Programs") |
| `.btn-ghost` | Transparent, subtle border | Tertiary / nav actions |

### 4.6 Background Decorations (Hero Sections)

All hero/dark header areas use:
- `.blob.blob-1` / `.blob-2` / `.blob-3` — soft radial coloured blobs (position: absolute)
- `.grid-overlay` — subtle grid-line pattern, low opacity
- `.bg-hero-glow` (inline or utility) — radial navy glow behind hero text

### 4.7 Animations

| Class | Behaviour |
|---|---|
| `.fade-in-up` | Slides up + fades in on scroll (IntersectionObserver) |
| `.animate-pulse-slow` | Slow pulsing (3s ease-in-out, infinite) |
| `.animate-ping-slow` | Slow ping ripple (2.5s, infinite) |
| `.gradient-text` | Animated gradient text: navy→teal→mint→navy |
| `.hero-cinema-fade` | Cross-fade slideshow for hero images |

---

## 5. Site Navigation & Links

### 5.1 Nav Menu Items (All Pages)

| Label | Destination | Notes |
|---|---|---|
| Home | `index.html` (or `../index.html` from pages/) | Logo also links here |
| About | `about.html` / `pages/about.html` | |
| Programs | `programs.html` / `pages/programs.html` | |
| Learning Hub | `learning-hub.html` / `pages/learning-hub.html` | |
| Partnership | `index.html#partner` / `../index.html#partner` | Anchor to homepage section |
| Contact | `enrol.html` / `pages/enrol.html` | Active highlight: `text-mint` |
| **Enrol Now** (button) | `enrol.html` / `pages/enrol.html` | `.btn-primary` in navbar |

### 5.2 Homepage Anchor Sections (for direct deep-links)

| Anchor | Section |
|---|---|
| `#hero` | Hero / slideshow |
| `#programs` | Programs overview grid |
| `#hub` | Learning Hub tab panel |
| `#partner` | Vinsara Partnership section |
| `#contact` | Inline contact form (legacy — Enrol Now buttons now redirect to `pages/enrol.html`) |

### 5.3 Internal Link Map

```
index.html
  ├── → pages/about.html
  ├── → pages/programs.html
  ├── → pages/learning-hub.html
  ├── → pages/enrol.html           (Contact / Enrol Now)
  ├── → pages/vce-biology.html
  ├── → pages/vce-chemistry.html
  ├── → pages/year7-10-science.html
  └── → pages/year4-6-science.html

pages/programs.html
  ├── → vce-biology.html           (relative — same folder)
  ├── → vce-chemistry.html
  ├── → year7-10-science.html
  ├── → year4-6-science.html
  └── → enrol.html

pages/vce-biology.html
  └── → enrol.html  (all CTAs)

pages/vce-chemistry.html
  └── → enrol.html  (all CTAs)

pages/year7-10-science.html
  └── → enrol.html  (all CTAs)

pages/year4-6-science.html
  └── → enrol.html  (all CTAs)

pages/about.html
  └── → enrol.html  (all CTAs)

pages/learning-hub.html
  └── → enrol.html  (all CTAs, previously ../index.html#contact)

pages/enrol.html
  └── self-contained (form destination)
```

### 5.4 Footer Links (present in each page footer)

**Programs column:** VCE Biology · VCE Chemistry · Year 7–10 · Year 4–6  
**Quick Links column:** Home · About Us · All Programs · Learning Hub · Partnership · Enrol / Contact

---

## 6. Page-by-Page Breakdown

---

### 6.1 `index.html` — Homepage

**Theme:** Dark throughout, with alternating `.section-light` / `.section-grey` for middle sections.

| # | Section | ID / Aria | Theme | Key Content |
|---|---|---|---|---|
| 1 | Navbar | `#navbar` | Dark glass (fixed) | 3-state scroll: default → `.scrolled` → `.scroll-up` |
| 2 | Hero | `#hero` | Dark | Headline "Master Science. Achieve More." · 3-image dissolving crossfade slideshow · Floating stat chips · Tag pills · Dual CTA buttons |
| 3 | Trust Builder | — | `.section-light` | 4 stat cards (200+ students, 98% score, 5+ years, 4.9★) |
| 4 | Programs | `#programs` | `.section-grey` | 4 program cards with icons, descriptions, links to detail pages |
| 5 | Teaching Approach | — | Dark | 3-panel icon grid (Small Groups, Exam Focus, Expert Tutors) |
| 6 | Learning Journey | — | `.section-light` | 5-column horizontal progress grid: Join → Build → Deep → Exam → Results |
| 7 | Student Results | — | Dark | Achievement statistic display |
| 8 | Testimonials | — | `.section-grey` | Student/parent quote cards |
| 9 | FAQ | — | Dark | Alpine.js accordion (5 questions, `x-data="{active:null}"`) |
| 10 | Learning Hub | `#hub` | `.section-grey` | Tabbed panel: Videos · Notes · Student Portal · Parent Portal |
| 11 | Partnership | `#partner` | `.partner-section` | Vinsara branding, SciMind+Vinsara dual cards, join CTA |
| 12 | Contact (inline) | `#contact` | `.section-light` | Enrolment form, contact info, newsletter, fee enquiry cards |
| 13 | Footer | — | Dark | 4-column: Logo+desc · Programs · Quick Links · (reserved) |

**JS on this page:** full `main.js` (navbar scroll, mobile menu toggle `#menuToggle`, tab switching `#tab-videos`, modals `#premiumModal`, scroll animations, form `handleEnrol()`)

---

### 6.2 `pages/about.html` — About Us

**Theme:** Alternates dark / `.section-light` / dark / `.section-grey` / dark / dark

| # | Section | Theme | Key Content |
|---|---|---|---|
| 1 | Hero | Dark | 2-col: left headline + 4 stat bubbles (200+, 5+, 98, 100%) · Right: image collage with floating badges |
| 2 | Mission & Philosophy | `.section-light` | Left: 3 paragraphs · Right: 3 pillar glass-cards |
| 3 | Meet the Tutors | Dark | 3 `.tutor-card`: Dr. Anika Sharma (Biology & Chemistry), James Weller (Chemistry), Priya Naidoo (Biology & Junior) |
| 4 | Vinsara Partners | `.section-grey` | Banner + 2 `.partner-tutor-card`: Ravi Krishnamurthy (Maths), Tara Elsworth (Physics) |
| 5 | Why Choose SciMind | Dark | 4 `.pillar-card`: Small Groups · 1-on-1 · Exam Methodology · Vinsara Collab |
| 6 | CTA Banner | Dark | Social proof row: 200+ students · 98 ATAR · 4.9★ · 5+ years |

**Custom CSS classes (defined inline in this page):**  
`.tutor-card`, `.tutor-img-wrap`, `.cred-pill`, `.pillar-card`, `.partner-tutor-card`, `.stat-bubble`

---

### 6.3 `pages/programs.html` — All Programs

**Theme:** Dark hero → Dark program cards → `.section-light` → `.section-grey` → Dark FAQ → Dark CTA

| # | Section | Theme | Key Content |
|---|---|---|---|
| 1 | Hero | Dark | 2-col: headline + image collage (picsum seeds) · Breadcrumb |
| 2 | Program Cards | Dark | 4 `.prog-summary-card` articles: VCE Bio · VCE Chem · Yr7-10 · Yr4-6 (each links to detail page) |
| 3 | Teaching Approach | `.section-light` | 3-panel approach cards |
| 4 | Program Comparison | `.section-grey` | Feature comparison table / card matrix |
| 5 | FAQ | Dark | Alpine.js accordion |
| 6 | CTA Banner | Dark | Dual CTAs: Enrol Now + Contact Us |

---

### 6.4 `pages/vce-biology.html` — VCE Biology

**Theme:** Dark hero → alternating sections → Dark CTA

| # | Section | Key Content |
|---|---|---|
| 1 | Hero | Program intro, VCAA pill badge, enrol button, image collage |
| 2 | What You'll Learn | Topic breakdown by Unit (Units 1–4) |
| 3 | Pricing / Format | Format options card (Small Group, 1-on-1), timetable info |
| 4 | Teaching Approach | Methodology cards |
| 5 | Resources Included | Worksheet, video, exam paper cards |
| 6 | FAQ | Alpine.js accordion (5 questions) |
| 7 | CTA Banner | Enrol Now + Get in Touch buttons |

---

### 6.5 `pages/vce-chemistry.html` — VCE Chemistry

Same structure as `vce-biology.html` with Chemistry-specific content (Units 1–4, VCAA Chemistry exam focus).

---

### 6.6 `pages/year7-10-science.html` — Year 7–10 Science

Same structure with secondary science content. Hero accent colour overrides to mint-leaning gradient.

---

### 6.7 `pages/year4-6-science.html` — Year 4–6 Science

Same structure for primary science. Hero and accent buttons use mint→teal gradient (`background: linear-gradient(135deg,#59a89c,#0b81a2)`).

---

### 6.8 `pages/learning-hub.html` — Learning Hub

**Theme:** Dark

| # | Section | Key Content |
|---|---|---|
| 1 | Hero | "Your Learning Hub" headline, subtitle, search/filter |
| 2 | Tabbed Content | **Videos** · **Notes** · **Student Portal** · **Parent Portal** tabs — locked content triggers `#premiumModal` |
| 3 | CTA Banner | Enrol to unlock premium content |

**JS dependencies:** Tab switching (`.hub-tab`), modal trigger (`openModal('premiumModal')`).

---

### 6.9 `pages/enrol.html` — Enrolment & Contact

**Theme:** Dark hero → `.section-light` main → Dark "What Happens Next" → `.section-grey` FAQ → Dark footer

| # | Section | Key Content |
|---|---|---|
| 1 | Hero | Headline "Start Your Science Journey." · Quick contact strip |
| 2 | Multi-Step Form | Alpine.js 3-step form (see §14) + Sidebar |
| 3 | What Happens Next | 4-step horizontal process: Submit → We Reach Out → Confirmed → First Session |
| 4 | Enrolment FAQs | Alpine.js accordion (5 questions) |
| 5 | Footer | Standard site footer |

---

## 7. CSS Architecture — `custom.css`

File: `css/custom.css` (loaded as `custom.css?v=12`)  
Total lines: ~1309

### Component Classes Reference

| Class | Description |
|---|---|
| `.glass-nav` | Navbar background: dark frosted glass |
| `.glass-card` | Dark glass card (auto overridden in light sections) |
| `.blob`, `.blob-1/2/3` | Animated radial background colour blobs |
| `.grid-overlay` | Subtle background grid pattern |
| `.hero-cinema-wrap` | Hero dissolve slideshow container |
| `.hero-slide` | Individual hero image slide |
| `.hero-cinema-fade` | Active cross-fade animation |
| `.hero-slide-dots` | Animated dot indicators below slideshow |
| `.hero-dot--1/2/3` | Per-dot pulse animation (12s cycle, offset by 4s) |
| `.hero-float-chip` | Floating stat/info chip on hero |
| `.hero-float-chip--teal` | Teal variant chip |
| `.hero-tag-pill` | Program tag pills in hero |
| `.gradient-text` | Animated gradient text effect |
| `.glass-chip` | Small glass pill/chip element |
| `.section-badge` | Small uppercase label above section titles |
| `.section-title` | Large section heading |
| `.section-subtitle` | Section descriptive text below title |
| `.btn-primary` | Gradient primary button |
| `.btn-secondary` | Glass border secondary button |
| `.btn-ghost` | Transparent ghost button |
| `.tag` | Inline topic/keyword tag |
| `.stat-card` | Statistic display card |
| `.program-card` | Homepage program grid card |
| `.program-icon` | Program icon wrapper |
| `.card-link` | Hover-animated card link wrapper |
| `.hub-tab` | Learning Hub tab button |
| `.tab-content` | Tab panel content (hidden/shown) |
| `.video-card` | Video resource card |
| `.video-thumb` | Video thumbnail wrapper |
| `.video-overlay` | Dark overlay on video thumb |
| `.play-btn` | Play button circle over video |
| `.video-badge` | Free/locked badge on video |
| `.notes-card` | Study notes download card |
| `.portal-card` | Student/Parent portal card |
| `.portal-card-glow` | Glow decoration on portal card |
| `.portal-icon` | Portal card icon circle |
| `.partner-banner` | Vinsara partnership banner strip |
| `.partner-section` | Partnership section dark background |
| `.vinsara-gold-text` | Gold gradient text for Vinsara branding |
| `.partner-check-gold` | Gold checkmark in partner lists |
| `.partner-logo-card` | Logo display card in partnership section |
| `.scimind-card` / `.vinsara-card` | Side-by-side partner summary cards |
| `.form-input` | Dark-theme form input field |
| `.modal-overlay` | Full-screen modal backdrop |
| `.modal-box` | Modal dialog container |
| `.fade-in-up` | Scroll-triggered fade+rise animation |
| `.animate-pulse-slow` | 3s pulsing animation |
| `.animate-ping-slow` | 2.5s ping/ripple animation |
| `.no-scroll` | Hide scrollbar |
| `.login-dropdown-menu` | Login dropdown panel |
| `.login-dropdown-item` | Row item inside login dropdown |
| `.section-light` | Light background section override (#f8fafc) |
| `.section-grey` | Grey background section override (#f1f5f9) |

### CSS Variables

```css
:root {
  --navy:        #003a7d;
  --teal:        #0b81a2;
  --mint:        #59a89c;
  --bg:          #020d1a;
  --glass:       rgba(255,255,255,0.05);
  --glass-border:rgba(255,255,255,0.08);
}
```

### Navbar States

| State | Class | Trigger |
|---|---|---|
| Default (at top) | base styles only | `scrollY ≤ 40` |
| Scrolled | `.scrolled` | Scrolled down |
| Scroll-up | `.scrolled.scroll-up` | Scrolling back toward top |

---

## 8. JavaScript — `main.js`

File: `js/main.js` (336 lines)

### Modules / IIFEs

| Function | Elements Targeted | Behaviour |
|---|---|---|
| `initNavbar()` | `#navbar` | 3-state scroll class management (passive scroll listener) |
| `initMobileMenu()` | `#menuToggle`, `#mobileMenu` | Toggle `.hidden` on mobile nav; auto-close on link click |
| `initTabs()` | `.hub-tab`, `.tab-content` | Activate/deactivate Learning Hub tab panels |
| `initModals()` | `.open-modal`, `#premiumModal` | Open/close premium content modal |
| `initScrollAnimations()` | `.fade-in-up` | IntersectionObserver – add `.visible` class to trigger CSS animation |
| `handleEnrol(event)` | `#contact` form | Prevent default, basic validation, show success state |
| `initLoginDropdown()` | `#loginDropdownContainer`, `#loginDropdown` | Toggle login dropdown with outside-click close |

### Key Global Functions

```js
openModal(id)   // shows modal overlay + modal-box by ID
closeModal(id)  // hides modal overlay + modal-box by ID
handleEnrol(e)  // called by onsubmit on the homepage #contact form
```

> **Note:** The dedicated `enrol.html` multi-step form is handled entirely by Alpine.js (`x-data`) and does not call `handleEnrol()`. That function only applies to the inline `#contact` form on `index.html`.

---

## 9. Image Assets

All images live in `assets/images/`.

| File | Used In | Purpose |
|---|---|---|
| `H - White and Color.svg` | Navbar + Footer (all pages) | SciMind horizontal logo — white text, colour atom icon |
| `V - White and Color.svg` | Partner sections, enrol.html sidebar | Vinsara V-mark icon |
| `Vinsara - Logo - Vertical.png` | Partnership section (`index.html#partner`) | Vinsara full vertical logo |

### Hero / Scene Images

Hero and decorative scene images are loaded from two external sources:  
- **Picsum Photos** — `https://picsum.photos/seed/[seed]/[width]/[height]`  
  Seeds used: `scimind-lab`, `scimind-micro`, `scimind-class`, `scimind-vce`
- **Pravatar** — `https://i.pravatar.cc/400?u=[seed]`  
  Used for tutor profile photos in `about.html`

All `<img>` tags include `onerror` fallbacks that display a styled placeholder `<div>` if the external service is unavailable.

---

## 10. Third-Party Integrations

| Service | Used For | Notes |
|---|---|---|
| **Tailwind CDN** | CSS framework | No build step — CDN-only |
| **Alpine.js CDN** | Reactive UI (dropdowns, accordions, forms) | v3.14.1 |
| **Google Fonts CDN** | Typography (Inter, Poppins) | Preconnect links added |
| **Picsum Photos** | Placeholder hero/scene images | Swap with real photos when available |
| **Pravatar** | Placeholder tutor avatars | Swap with real staff photos when available |
| **Vinsara Institute** | Billing, fee management, partner tutors | External — not a technical integration |

---

## 11. SEO & Structured Data

Every page includes:

```html
<meta name="description" content="…"/>
<meta name="keywords"    content="…"/>
<meta name="robots"      content="index, follow"/>
<link rel="canonical"    href="https://www.scimindeducation.com.au/…"/>

<!-- Open Graph -->
<meta property="og:type"        content="website"/>
<meta property="og:title"       content="…"/>
<meta property="og:description" content="…"/>
<meta property="og:url"         content="…"/>
<meta property="og:site_name"   content="SciMind Education"/>
```

### JSON-LD Structured Data (per page)

| Page | Schema Type | Key Fields |
|---|---|---|
| `index.html` | `EducationalOrganization` | name, url, description, address |
| `about.html` | `AboutPage` + `EducationalOrganization` | team info |
| `programs.html` | `ItemList` of `Course` | course name, description, provider |
| `vce-biology.html` | `Course` | name, description, provider, courseCode |
| `vce-chemistry.html` | `Course` | same |
| `year7-10-science.html` | `Course` | same |
| `year4-6-science.html` | `Course` | same |
| `learning-hub.html` | `WebPage` | name, description |
| `enrol.html` | `ContactPage` + `EducationalOrganization` | email, telephone, address |

---

## 12. Responsiveness & Breakpoints

Uses Tailwind's default breakpoints:

| Breakpoint | Width | Notes |
|---|---|---|
| (mobile default) | `< 768px` | Single-column layouts, hamburger menu |
| `md:` | `≥ 768px` | Desktop nav visible, 2-col layouts activate |
| `lg:` | `≥ 1024px` | 3-col layouts, wider grids |
| `xl:` | `≥ 1280px` | Larger hero text, max-width constraints |

### Custom responsive overrides in `custom.css`

```css
@media (min-width: 768px)  { #programs, #hub, #partner, #contact { padding-left: 3rem;  padding-right: 3rem;  } }
@media (min-width: 1024px) { #programs, #hub, #partner, #contact { padding-left: 5rem;  padding-right: 5rem;  } }
@media (min-width: 1280px) { #programs, #hub, #partner, #contact { padding-left: 8rem;  padding-right: 8rem;  } }
```

Mobile-specific layout overrides:
```css
@media (max-width: 767px) {
  #contact .grid { grid-template-columns: 1fr !important; }
}
```

---

## 13. Interactive Components (Alpine.js)

Alpine.js is used on multiple pages (loaded via CDN on every page).

### Components in Use

| Page(s) | Component | `x-data` State |
|---|---|---|
| All pages (pages/) | **Mobile nav** | `{ mobileOpen: false }` on `<nav>` — `@click` toggles menu |
| `index.html` | **FAQ Accordion** | `{ active: null }` — click to set active question |
| `vce-biology.html` | **FAQ Accordion** | same pattern |
| `vce-chemistry.html` | **FAQ Accordion** | same pattern |
| `year7-10-science.html` | **FAQ Accordion** | same pattern |
| `year4-6-science.html` | **FAQ Accordion** | same pattern |
| `programs.html` | **FAQ Accordion** | same pattern |
| `about.html` | **Mobile nav** | `{ mobileOpen: false }` |
| `enrol.html` | **Multi-step form** | `{ step:1, submitted:false, form:{…} }` — full 3-step wizard |
| `enrol.html` | **FAQ Accordion** | `{ open: null }` |

### Enrolment Form State (`enrol.html`)

```js
{
  step: 1,              // 1 | 2 | 3
  submitted: false,
  form: {
    parentName: '',
    email: '',
    phone: '',
    studentName: '',
    yearLevel: '',       // 'Year 4' … 'Year 12 (VCE Unit 3/4)'
    program: '',         // 'vce-bio' | 'vce-chem' | 'yr7-10' | 'yr4-6'
    format: '',          // 'small-group' | 'one-on-one' | 'online'
    days: [],            // array of 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'
    message: ''
  },
  // Computed getters:
  programLabel,          // human-readable program name
  formatLabel,           // human-readable format name
  daysLabel              // joined days string
}
```

---

## 14. Forms & Enrolment Flow

### Homepage Inline Form (`index.html#contact`)

- **Fields:** Full Name, Email, Program of Interest (select), Phone (optional), Message  
- **Handler:** `onsubmit="handleEnrol(event)"` → `main.js`  
- **Action:** Client-side only (no backend). Shows success message in-page.

### Dedicated Enrolment Page (`pages/enrol.html`)

- **Technology:** Alpine.js 3-step wizard (no `main.js` form handler)  
- **Step 1 — Your Details:** Parent name, Email, Phone, Student name, Year level  
- **Step 2 — Program Preferences:** Program (radio cards), Format (radio toggles), Preferred days (checkbox pills), Notes textarea  
- **Step 3 — Review & Send:** Summary table of all entered data → submit triggers success state  
- **Success state:** Animated checkmark + personalised confirmation message  
- **Backend:** None currently (static site). To connect to a backend, add `action=""` and `method="POST"` to the form, or wire Alpine.js `submit()` to a `fetch()` call.

---

## 15. Partnership — Vinsara Institute

SciMind Education operates in a formal educational partnership with **Vinsara Institute of Education**.

### Where Vinsara Appears

| Location | Element |
|---|---|
| `index.html#partner` | Full partnership section — dual logo cards, shared values, CTA to join |
| `pages/about.html` | "Vinsara Partners" section — 2 partner tutor cards (Ravi + Tara) |
| `pages/enrol.html` | Sidebar card — "Fee & Invoice Enquiries via Vinsara Institute" |
| All pages (FAQs) | Referenced in FAQ answers about fees and billing |
| All footers | "In partnership with Vinsara Institute of Education" note |

### Vinsara Assets

- `V - White and Color.svg` — small V-mark, used inline
- `Vinsara - Logo - Vertical.png` — full logo, used in partnership section

### Billing Note

All fee and invoice management is handled externally by Vinsara Institute. The website directs billing enquiries to them — there is no payment gateway or fee calculator on this site.

---

## 16. Maintenance Notes

### Updating Content

| Task | File(s) to Edit |
|---|---|
| Change homepage hero headline | `index.html` — look for `Master Science.` inside `#hero` |
| Add/change a tutor | `pages/about.html` — find the `.tutor-card` block for that tutor |
| Add a new Learning Hub video | `pages/learning-hub.html` + `index.html #hub` — duplicate a `.video-card` |
| Update contact phone/email | `pages/enrol.html` sidebar + `index.html#contact` + footer in each page |
| Change the program list | `index.html#programs` + `pages/programs.html` + update nav links if needed |
| Add a new page | Create in `pages/`, copy nav from `about.html`, add links in all navs |

### Replacing Placeholder Images

| Replace | Source | With |
|---|---|---|
| Hero scene images | `picsum.photos/seed/…` | Real photography — upload to `assets/images/` |
| Tutor portraits | `i.pravatar.cc/400?u=…` | Staff headshots — upload to `assets/images/staff/` |
| Vinsara logos | Already real SVG/PNG files | ✅ Already in place |

### CSS Cache Busting

The custom CSS is version-tagged: `custom.css?v=12`  
When making CSS changes, increment the version number in the `<link>` tag **on every HTML file**:
```html
<link rel="stylesheet" href="../css/custom.css?v=13"/>
```

### Adding Backend to the Enrolment Form

The enrol page form currently has no backend. To wire it up:

**Option A — Formspree / Netlify Forms:**
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

**Option B — Custom fetch in Alpine.js:**
```js
async submit() {
  const res = await fetch('/api/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(this.form)
  });
  if (res.ok) this.submitted = true;
}
```

### Tailwind CDN Note

Currently uses CDN Tailwind. If the site scales consider migrating to a build step (Tailwind CLI or Vite) for:
- Purging unused CSS (reduced file size)
- JIT compilation
- Custom plugin support

---

*End of documentation — SciMind Education website, March 2026*
