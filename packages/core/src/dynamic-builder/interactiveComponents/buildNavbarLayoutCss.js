const buildNavbarLayoutCss = () => `
.db-navbar-panel {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: var(--db-space-4);
}
.db-navbar[data-db-layout="end"] .db-navbar-panel {
  justify-content: flex-end;
}
.db-navbar[data-db-layout="split"] .db-navbar-links {
  margin: 0 auto;
}
.db-navbar[data-db-layout="center"] .db-navbar-nav {
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}
.db-navbar[data-db-layout="center"] .db-navbar-panel {
  flex-basis: 100%;
  justify-content: center;
}
.db-navbar-burger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  margin-left: auto;
  padding: 0;
  background: transparent;
  border: 0;
  border-radius: var(--db-radius-sm);
  color: var(--db-color-text);
  cursor: pointer;
}
.db-navbar-burger-bars {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 22px;
}
.db-navbar-burger-bars span {
  display: block;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 220ms ease, opacity 160ms ease;
}
.db-navbar-scrim {
  display: none;
}
@media (min-width: 901px) and (max-width: 1180px) {
  .db-navbar-nav {
    gap: var(--db-space-3);
  }
  .db-navbar-link {
    padding: var(--db-space-2);
  }
}
@media (prefers-reduced-motion: reduce) {
  .db-navbar-panel,
  .db-navbar-burger-bars span {
    transition: none;
  }
}
`;

export default buildNavbarLayoutCss;
