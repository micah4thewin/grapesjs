const buildNavbarEditorCanvasCss = () => `
@media (max-width: 900px) {
  .db-navbar.gjs-selected .db-navbar-panel,
  .db-navbar.gjs-selected-parent .db-navbar-panel,
  .db-navbar:hover .db-navbar-panel {
    transform: translateX(0);
    visibility: visible;
  }
  .db-navbar.gjs-selected .db-navbar-scrim,
  .db-navbar.gjs-selected-parent .db-navbar-scrim,
  .db-navbar:hover .db-navbar-scrim {
    opacity: 0;
    pointer-events: none;
  }
}
`;

export default buildNavbarEditorCanvasCss;
