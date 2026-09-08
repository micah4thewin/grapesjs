// Visual styles for the navbar, switched from the Style setting. Layout
// (where the links sit) is a separate setting so the two can be combined.
const buildNavbarStyleCss = () => `
.db-navbar[data-db-style="underline"] .db-navbar-link {
  margin: 0 var(--db-space-2);
  padding-left: var(--db-space-1);
  padding-right: var(--db-space-1);
  border-radius: 0;
}
.db-navbar[data-db-style="underline"] .db-navbar-link::after {
  content: "";
  position: absolute;
  left: var(--db-space-1);
  right: var(--db-space-1);
  bottom: 0.55rem;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 180ms ease;
}
.db-navbar[data-db-style="underline"] .db-navbar-link:hover,
.db-navbar[data-db-style="underline"] .db-navbar-link[aria-current="page"] {
  background: transparent;
}
.db-navbar[data-db-style="underline"] .db-navbar-link:hover::after,
.db-navbar[data-db-style="underline"] .db-navbar-link[aria-current="page"]::after {
  transform: scaleX(1);
}
.db-navbar[data-db-style="pill"] .db-navbar-links {
  padding: 0.25rem;
  border-radius: var(--db-radius-pill);
  background: var(--db-color-surface-alt);
}
.db-navbar[data-db-style="pill"] .db-navbar-link {
  min-height: 2.25rem;
  border-radius: var(--db-radius-pill);
}
.db-navbar[data-db-style="pill"] .db-navbar-link:hover,
.db-navbar[data-db-style="pill"] .db-navbar-link[aria-current="page"] {
  background: var(--db-color-surface);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.12);
}
.db-navbar[data-db-style="floating"] {
  padding: var(--db-space-3) var(--db-space-4);
  background: transparent;
  border-bottom: 0;
}
.db-navbar[data-db-style="floating"] .db-navbar-nav {
  max-width: 68rem;
  padding: var(--db-space-2) var(--db-space-4);
  border-radius: 1rem;
  background: var(--db-color-surface);
  box-shadow:
    0 12px 32px rgba(15, 23, 42, 0.12),
    0 1px 2px rgba(15, 23, 42, 0.06);
}
.db-navbar[data-db-style="minimal"] {
  background: transparent;
  border-bottom: 0;
}
.db-navbar[data-db-style="minimal"] .db-navbar-link {
  font-weight: 400;
}
.db-navbar[data-db-style="minimal"] .db-navbar-link:hover,
.db-navbar[data-db-style="minimal"] .db-navbar-link[aria-current="page"] {
  background: transparent;
  text-decoration: underline;
  text-underline-offset: 0.35em;
}
.db-navbar[data-db-style="dark"],
.db-navbar[data-db-style="brand"] {
  --db-nav-bg: var(--db-color-text);
  --db-nav-fg: var(--db-color-surface);
  background: var(--db-nav-bg);
  color: var(--db-nav-fg);
  border-bottom-color: rgba(255, 255, 255, 0.12);
}
.db-navbar[data-db-style="brand"] {
  --db-nav-bg: var(--db-color-brand);
  --db-nav-fg: var(--db-color-brand-contrast);
}
.db-navbar[data-db-style="dark"] .db-navbar-nav,
.db-navbar[data-db-style="brand"] .db-navbar-nav {
  --db-color-text: var(--db-nav-fg);
  --db-color-surface: var(--db-nav-bg);
  --db-color-surface-alt: rgba(255, 255, 255, 0.12);
  --db-color-text-muted: rgba(255, 255, 255, 0.78);
  --db-color-line: rgba(255, 255, 255, 0.18);
}
.db-navbar[data-db-style="dark"] .db-navbar-link[aria-current="page"],
.db-navbar[data-db-style="brand"] .db-navbar-link[aria-current="page"] {
  color: var(--db-nav-fg);
  text-decoration: underline;
  text-underline-offset: 0.35em;
}
.db-navbar[data-db-style="brand"] .db-navbar-cta {
  background: var(--db-nav-fg);
  color: var(--db-nav-bg);
}
.db-navbar[data-db-style="dark"] .db-navbar-scrim,
.db-navbar[data-db-style="brand"] .db-navbar-scrim {
  background: rgba(0, 0, 0, 0.55);
}
`;

export default buildNavbarStyleCss;
