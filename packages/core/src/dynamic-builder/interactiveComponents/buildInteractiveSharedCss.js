const buildInteractiveSharedCss = () => `
.db-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
.db-accordion-trigger:focus-visible,
.db-tab-button:focus-visible,
.db-tab-panel:focus-visible,
.db-navbar-brand:focus-visible,
.db-navbar-burger:focus-visible,
.db-navbar-links a:focus-visible,
.db-breadcrumb a:focus-visible,
.db-social-link:focus-visible,
.db-announcement-close:focus-visible {
  outline: 2px solid var(--db-color-focus-ring);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: no-preference) {
  .db-accordion-chevron {
    transition: transform var(--db-motion-duration-base) var(--db-motion-ease);
  }
  .db-tab-button,
  .db-navbar-links a,
  .db-breadcrumb a,
  .db-social-link,
  .db-announcement-close {
    transition:
      color var(--db-motion-duration-fast) var(--db-motion-ease),
      background-color var(--db-motion-duration-fast) var(--db-motion-ease),
      border-color var(--db-motion-duration-fast) var(--db-motion-ease);
  }
}
`;

export default buildInteractiveSharedCss;
