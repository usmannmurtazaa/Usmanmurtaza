<div align="center">

# Usman Murtaza | Developer Portfolio

**Full Stack Developer building modern, responsive web applications with React, JavaScript, and Node.js.**

[🌐 Live](https://usmanmurtaza.netlify.app) &nbsp;·&nbsp; [💼 LinkedIn](https://www.linkedin.com/in/Usmannmurtazaa/) &nbsp;·&nbsp; [💻 GitHub](https://github.com/Usmannmurtazaa) &nbsp;·&nbsp; [📄 Resume](https://drive.google.com/file/d/1zs_xeqmfLPlCOjVUCgstedOD2_oPpzoZ/view)

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=fff)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=fff)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=fff)

</div>

---

A personal portfolio built to present real, working projects - the **Maniesta ecosystem**, **ResumeAI Pro**, **Zain Real Estate**, and client work such as the **Al Falah Leather** website - through a dark, motion-led interface with focused animation, accessible components, and production-grade SEO.

The site is deliberately lightweight: compositor-only animations, no continuous JS loops on the hero, WebP assets with PNG fallback, and no router since it is a single-page scroll experience.

---

## ✨ Features

### Animated hero
- Full-bleed **Vortex particle background** (canvas, ref-driven, no React re-renders on pointer move)
- Aurora blob layer with a slow CSS drift
- **3D tilt** on the hero image driven by Framer Motion `useMotionValue` + springs
- Animated badges, typewriter role line, staggered CTAs

### Floating glass navbar
- Centered pill layout with rounded borders and backdrop blur
- Custom **animated calligraphy signature** ("Usman") with a gradient shimmer and hover glow
- Keyboard-accessible mobile drawer below the pill

### Tracing-beam timelines
- **Education** and **Experience** sections use a scroll-driven vertical beam (`framer-motion` `useScroll` + `useTransform`)
- Sticky titles on desktop, single-column on mobile
- No MUI timeline dependency

### Project cards with CometCard interaction
- Mouse-driven 3D tilt with a pointer-following radial highlight
- Featured / secondary / utility project tiers
- Filterable grid with category tags
- Full case-study modal for each project

### Certificates gallery
- Three portfolio certificates rendered as glass cards with hover-zoom thumbnails
- Full-screen modal with keyboard and click-outside dismissal
- WebP with JPG fallback

### Live background
- Slow-drifting aurora blobs behind all non-hero sections
- Transform + opacity only, disabled under `prefers-reduced-motion`

### Working contact form
- EmailJS integration with validation
- Success + error feedback via MUI Snackbar
- GA4 event on submission

### SEO & analytics
- GA4 with a single idempotent initializer
- JSON-LD structured data (`Person`, `WebSite`, `SoftwareApplication`)
- Open Graph, Twitter Cards, canonical, `robots.txt`, `sitemap.xml`
- Semantic HTML with a single `h1` per page and alt text on every image

---

## 🛠 Tech Stack

**Frontend**
React 18 · styled-components · Framer Motion · MUI (Snackbar/Alert only) · lucide-react · typewriter-effect

**Backend & services**
Node.js · Express · Firebase · MongoDB · PostgreSQL · REST APIs · EmailJS

**Tooling & deployment**
Create React App · ESLint + Prettier · Netlify

---

## 📁 Project structure

```
src/
├── components/
│   ├── common/            # Reusable primitives
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Certificate/
│   │   ├── CertificateModal/
│   │   ├── Container/
│   │   ├── Icon/
│   │   ├── LiveBackground/
│   │   ├── SectionHeader/
│   │   ├── Signature/
│   │   ├── ThreeDCard/
│   │   ├── Timeline/
│   │   └── Vortex/
│   ├── HeroSection/       # Hero + decorations + vortex layer
│   ├── Skills/            # Frontend / Backend / Tools
│   ├── Experience/        # Tracing-beam timeline + stats
│   ├── Education/         # Tracing-beam timeline + stats
│   ├── Projects/          # Featured / secondary / utility
│   ├── Certificates/      # Gallery + modal
│   ├── Contact/           # Form + info cards
│   ├── Navbar/            # Floating pill + signature
│   ├── Footer/
│   └── Cards/             # ProjectCard, ExperienceCard, EducationCard
├── data/
│   └── constants.js       # Single source of truth for all content
├── hooks/
│   └── useScrollAnimation.js
├── styles/
│   └── global.css         # Design tokens + utilities
├── utils/
│   ├── analytics.js
│   ├── image.js           # WebP / srcset helpers
│   ├── schema.js
│   └── seo.js
├── App.js
└── index.js
```

---

## 🚀 Getting started

**Requirements:** Node ≥ 16, npm ≥ 8

```bash
# Clone
git clone https://github.com/Usmannmurtazaa/Usmanmurtaza.git
cd Usmanmurtaza

# Install
npm install

# Configure environment
echo "REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX" > .env

# Dev server (http://localhost:3000)
npm start

# Production build → /build
npm run build

# Lint + format
npm run lint
npm run format
```

If `REACT_APP_GA_MEASUREMENT_ID` is not set, analytics silently disables - nothing else breaks.

---

## 🎨 Design system

All design tokens live in `src/styles/global.css` as CSS custom properties:

- **Colors** - `--bg-primary`, `--bg-glass`, `--text-primary`, `--text-secondary`, `--accent-glow`, `--accent-gradient`
- **Shadows** - `--shadow-sm`, `--shadow-md`, `--shadow-glow`
- **Spacing / radius / transitions** - `--space-*`, `--radius-*`, `--transition-*`

Components reference these tokens directly; there is no second JS theme object. New sections should follow the same pattern.

Motion lives in `src/motionConfig.js` - the shared `fadeInUpVariants`, `staggerContainer`, and `springTransition` are consumed everywhere, so an animation tweak stays in one place. All animations respect `prefers-reduced-motion`.

---

## ⚡ Performance notes

The portfolio was deliberately tuned for a small initial payload and a smooth mobile experience:

- **Code splitting** - below-the-fold sections are `React.lazy`-loaded. The modal lives in its own `Suspense` boundary so opening a project never re-suspends the page.
- **Images** - WebP is preferred via `<picture><source>` where it matters; PNG/JPG fallbacks are preserved. Hero image is preloaded with `fetchpriority="high"` and given explicit dimensions to prevent CLS.
- **Backdrop blur** - reserved for high-value surfaces (navbar, modal, one featured card per section). Full-page blurs were removed.
- **No requestAnimationFrame loops** that call `setState`. The Vortex uses a single canvas `rAF` loop and consumes pointer state via refs.
- **Backdrop-filter animations** were replaced with transform / opacity-only effects.

---

## 🔍 SEO

- **On-page** - semantic HTML, one `h1`, hierarchical headings, alt text on every image, canonical URLs, `robots.txt`, `sitemap.xml`
- **Structured data** - `Person`, `WebSite`, and an `ItemList` of `SoftwareApplication` entries generated from the projects array
- **Social** - Open Graph and Twitter Card metadata in `public/index.html`
- **Analytics** - GA4 events on CTAs (`click_hire_me`, `click_view_projects`, `view_project`, `filter_projects`, `submit_contact`, etc.) via a single `trackEvent` helper

---

## 📜 License

MIT - see [LICENSE](LICENSE) for details.

---

## 📬 Contact

**Usman Murtaza** | Full Stack Developer

- Portfolio: [usmanmurtaza.netlify.app](https://usmanmurtaza.netlify.app)
- Email: [usmanmurtazaportfolio@gmail.com](mailto:usmanmurtazaportfolio@gmail.com)
- LinkedIn: [linkedin.com/in/usmannmurtazaa](https://linkedin.com/in/usmannmurtazaa)
- GitHub: [github.com/usmannmurtazaa](https://github.com/usmannmurtazaa)

<div align="center">

If this portfolio is useful or impressive, a star means a lot. ⭐

</div>
