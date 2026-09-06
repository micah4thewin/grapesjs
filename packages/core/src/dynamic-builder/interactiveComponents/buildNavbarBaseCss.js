const buildNavbarBaseCss = () => `
.db-navbar {
  position: relative;
  z-index: 40;
  font-family: var(--db-font-body);
  background: var(--db-color-surface);
  border-bottom: 1px solid var(--db-color-line);
}
.db-navbar[data-db-sticky="true"] {
  position: sticky;
  top: 0;
  backdrop-filter: blur(10px);
  background: var(--db-color-surface);
}
.db-navbar-nav {
  display: flex;
  align-items: center;
  gap: var(--db-space-4);
  max-width: 72rem;
  margin: 0 auto;
  padding: var(--db-space-3) var(--db-space-4);
  padding-left: max(var(--db-space-4), env(safe-area-inset-left));
  padding-right: max(var(--db-space-4), env(safe-area-inset-right));
}
.db-navbar-brand {
  display: inline-flex;
  align-items: center;
  gap: var(--db-space-2);
  font-family: var(--db-font-display);
  font-size: var(--db-type-lg);
  font-weight: 700;
  line-height: 1.1;
  color: var(--db-color-text);
  text-decoration: none;
}
.db-navbar-logo {
  display: block;
  width: auto;
  height: 2.1rem;
  max-width: 10rem;
  object-fit: contain;
}
.db-navbar-links {
  display: flex;
  align-items: center;
  gap: var(--db-space-1);
  margin: 0;
  padding: 0;
  list-style: none;
}
.db-navbar-link {
  display: block;
  position: relative;
  padding: var(--db-space-2) var(--db-space-3);
  border-radius: var(--db-radius-sm);
  font-size: var(--db-type-sm);
  font-weight: 500;
  color: var(--db-color-text-muted);
  text-decoration: none;
  transition: color 160ms ease, background-color 160ms ease;
}
.db-navbar-link:hover {
  color: var(--db-color-text);
  background: var(--db-color-surface-alt);
}
.db-navbar-link[aria-current="page"] {
  color: var(--db-color-brand);
  font-weight: 600;
}
.db-navbar-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0 var(--db-space-4);
  border-radius: var(--db-radius-pill);
  background: var(--db-color-brand);
  color: var(--db-color-brand-contrast);
  font-size: var(--db-type-sm);
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 160ms ease;
}
.db-navbar-cta:hover {
  opacity: 0.9;
}
.db-navbar[data-db-cta="false"] .db-navbar-cta {
  display: none;
}
`;

export default buildNavbarBaseCss;
