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
  }
  .db-navbar[data-db-open="true"] .db-navbar-panel {
    transform: translateX(0);
    visibility: visible;
  }
  .db-navbar-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: var(--db-space-2);
    right: max(var(--db-space-2), env(safe-area-inset-right));
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    background: transparent;
    border: 0;
    border-radius: var(--db-radius-sm);
    color: var(--db-color-text);
    cursor: pointer;
  }
  .db-navbar-close:hover {
    background: var(--db-color-surface-alt);
  }
  .db-navbar[data-db-layout] .db-navbar-links {
    flex-direction: column;
    margin: 0;
    align-items: stretch;
    gap: var(--db-space-1);
  }
  .db-navbar-link {
    min-height: 3rem;
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
