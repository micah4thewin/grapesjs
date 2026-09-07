const buildNavbarScrollCss = () => `
.db-navbar[data-db-scroll="hide"][data-db-sticky="true"][data-db-scrolled="true"][data-db-scroll-dir="down"]:not([data-db-open="true"]) {
  transform: translateY(-100%);
}
.db-navbar[data-db-scroll="shrink"][data-db-scrolled="true"] .db-navbar-nav {
  padding-top: var(--db-space-1);
  padding-bottom: var(--db-space-1);
}
.db-navbar[data-db-scroll="shrink"][data-db-scrolled="true"] .db-navbar-logo {
  height: 1.6rem;
}
.db-navbar[data-db-scroll="transparent"][data-db-sticky="true"]:not([data-db-scrolled="true"]) {
  background: transparent;
  border-bottom-color: transparent;
}
@media (prefers-reduced-motion: no-preference) {
  .db-navbar[data-db-scroll="hide"] {
    transition: transform 240ms ease;
  }
  .db-navbar[data-db-scroll="shrink"] .db-navbar-nav,
  .db-navbar[data-db-scroll="shrink"] .db-navbar-logo {
    transition:
      padding 200ms ease,
      height 200ms ease;
  }
  .db-navbar[data-db-scroll="transparent"] {
    transition:
      background-color 200ms ease,
      border-color 200ms ease;
  }
}
`;

export default buildNavbarScrollCss;
