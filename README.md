# SciMind Education — Website

Static website for **SciMind Education**, a specialist science tutoring centre in Melbourne, Victoria. Partnered with Vinsara Institute of Education.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage — hero, programs overview, testimonials, FAQ, Learning Hub teaser, partnership |
| `pages/about.html` | About us — team, philosophy, tutor profiles |
| `pages/programs.html` | All programs overview |
| `pages/vce-biology.html` | VCE Biology program detail |
| `pages/vce-chemistry.html` | VCE Chemistry program detail |
| `pages/year7-10-science.html` | Year 7–10 Science program detail |
| `pages/year4-6-science.html` | Year 4–6 Science program detail |
| `pages/learning-hub.html` | Learning Hub — coming Term 2 2026 |
| `pages/enrol.html` | Enrolment & contact form |

## Stack

- **HTML5** — static, no build step required
- **Tailwind CSS** — via CDN
- **Alpine.js 3.14.1** — via CDN (accordions, mobile nav, multi-step form)
- **Google Fonts** — Inter & Poppins
- **Custom CSS** — `css/custom.css`
- **Custom JS** — `js/main.js`

## Project Structure

```
SciMind_WebPage/
├── index.html
├── assets/
│   └── images/          # Logo SVGs and partner images
├── css/
│   └── custom.css       # Global styles, glassmorphic theme
├── js/
│   └── main.js          # Scroll behaviour, modals, form handling
└── pages/
    ├── about.html
    ├── enrol.html
    ├── learning-hub.html
    ├── programs.html
    ├── vce-biology.html
    ├── vce-chemistry.html
    ├── year4-6-science.html
    └── year7-10-science.html
```

## Design

- **Colour palette:** Navy `#003a7d` · Teal `#0b81a2` · Mint `#59a89c` · Dark bg `#020d1a`
- **Theme:** Dark glassmorphic with light (`section-light`) and grey (`section-grey`) section alternation
- **Fonts:** Poppins (headings) · Inter (body)

## Deployment

This is a fully static site — no server or build process required. It can be deployed to:

- **GitHub Pages** — push to `main`, enable Pages from `/ (root)`
- **Netlify** — drag-and-drop the folder or connect the repo
- **Any static host** — upload all files as-is

## Content Placeholders

Several items require real content before the public launch:

- Phone number — replace `(03) XXXX XXXX`
- Physical address — update from "Melbourne, Victoria"
- Tutor names, photos, and bios (currently AI-generated placeholders)
- Real testimonials
- Session pricing
- Form submission endpoint — see comment in `js/main.js` (`// Replace with Formspree`)
- Portal URLs — see `PORTAL_CONFIG` in `js/main.js`

See `DOCUMENTATION.md` for the full content checklist and site structure reference.

## Partner

[Vinsara Institute of Education](https://www.vinsara.edu.au)
