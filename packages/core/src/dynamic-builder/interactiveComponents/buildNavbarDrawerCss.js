const buildNavbarDrawerCss = () => `
@media (max-width: 900px) {
  .db-navbar-nav {
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  .db-navbar-burger {
    display: inline-flex;
  }
  .db-navbar[data-db-layout] .db-navbar-panel {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 60;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: var(--db-space-3);
    width: min(21rem, 84vw);
    padding: var(--db-space-8) var(--db-space-5) var(--db-space-6);
    padding-right: max(var(--db-space-5), env(safe-area-inset-right));
    padding-bottom: max(var(--db-space-6), env(safe-area-inset-bottom));
    background: var(--db-color-surface);
    box-shadow: -18px 0 44px rgba(15, 18, 22, 0.18);
    overflow-y: auto;
    overscroll-behavior: contain;
    transform: translateX(100%);
    visibility: hidden;
    transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), visibility 260ms;
  }
  .db-navbar[data-db-open="true"] .db-navbar-panel {
    transform: translateX(0);
    visibility: visible;
  }
  .db-navbar[data-db-layout] .db-navbar-links {
    flex-direction: column;
    margin: 0;
    align-items: stretch;
    gap: var(--db-space-1);
  }
  .db-navbar-link {
    min-height: 3rem;
    display: flex;
    align-items: center;
    padding: var(--db-space-3);
    font-size: var(--db-type-base);
    border-bottom: 1px solid var(--db-color-line);
    border-radius: 0;
  }
  .db-navbar-item:last-child .db-navbar-link {
    border-bottom: 0;
  }
  .db-navbar-cta {
    margin-top: var(--db-space-3);
    min-height: 3rem;
  }
  .db-navbar-scrim {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 55;
    background: rgba(12, 14, 18, 0.45);
    opacity: 0;
    pointer-events: none;
    transition: opacity 220ms ease;
  }
  .db-navbar[data-db-open="true"] .db-navbar-scrim {
    opacity: 1;
    pointer-events: auto;
  }
  .db-navbar[data-db-open="true"] .db-navbar-burger-bars span:first-child {
    transform: translateY(7px) rotate(45deg);
  }
  .db-navbar[data-db-open="true"] .db-navbar-burger-bars span:nth-child(2) {
    opacity: 0;
  }
  .db-navbar[data-db-open="true"] .db-navbar-burger-bars span:last-child {
    transform: translateY(-7px) rotate(-45deg);
  }
}
`;

export default buildNavbarDrawerCss;
