const getShellCompactCss = () => `
[data-db-panel='db-top'][data-db-compact='1'] .gjs-db-shell-brand,
[data-db-panel='db-top'][data-db-compact='2'] .gjs-db-shell-brand,
[data-db-panel='db-top'][data-db-compact='3'] .gjs-db-shell-brand {
  display: none;
}
[data-db-panel='db-top'][data-db-compact='1'] .gjs-db-device-group,
[data-db-panel='db-top'][data-db-compact='2'] .gjs-db-device-group,
[data-db-panel='db-top'][data-db-compact='3'] .gjs-db-device-group {
  display: none;
}
[data-db-panel='db-top'][data-db-compact='1'] .gjs-db-device-menu-host,
[data-db-panel='db-top'][data-db-compact='2'] .gjs-db-device-menu-host,
[data-db-panel='db-top'][data-db-compact='3'] .gjs-db-device-menu-host {
  display: flex;
}
[data-db-panel='db-top'][data-db-compact='1'] .gjs-db-download-label,
[data-db-panel='db-top'][data-db-compact='2'] .gjs-db-download-label,
[data-db-panel='db-top'][data-db-compact='3'] .gjs-db-download-label {
  display: none;
}
[data-db-panel='db-top'][data-db-compact='1'] .gjs-db-download-button,
[data-db-panel='db-top'][data-db-compact='2'] .gjs-db-download-button,
[data-db-panel='db-top'][data-db-compact='3'] .gjs-db-download-button {
  width: 2rem;
  padding: 0;
}
[data-db-panel='db-top'][data-db-compact='2'] [data-db-command='core:component-outline'],
[data-db-panel='db-top'][data-db-compact='2'] [data-db-command='core:fullscreen'],
[data-db-panel='db-top'][data-db-compact='3'] [data-db-command='core:component-outline'],
[data-db-panel='db-top'][data-db-compact='3'] [data-db-command='core:fullscreen'],
[data-db-panel='db-top'][data-db-compact='2'] [data-db-sound-toggle],
[data-db-panel='db-top'][data-db-compact='3'] [data-db-sound-toggle],
[data-db-panel='db-top'][data-db-compact='2'] [data-db-snapshot-button],
[data-db-panel='db-top'][data-db-compact='3'] [data-db-snapshot-button] {
  display: none;
}
[data-db-panel='db-top'][data-db-compact='3'] .gjs-db-shell-brand-group,
[data-db-panel='db-top'][data-db-compact='3'] [data-db-theme-toggle],
[data-db-panel='db-top'][data-db-compact='3'] [data-db-command='core:undo'],
[data-db-panel='db-top'][data-db-compact='3'] [data-db-command='core:redo'],
[data-db-panel='db-top'][data-db-compact='3'] .gjs-db-status-button,
[data-db-panel='db-top'][data-db-compact='3'] [data-db-menu-trigger='tools'] .gjs-db-menu-trigger-label,
[data-db-panel='db-top'][data-db-compact='3'] [data-db-menu-trigger='devices'] .gjs-db-menu-trigger-label {
  display: none;
}
[data-db-panel='db-top'][data-db-compact='3'] .gjs-db-panel-group + .gjs-db-panel-group {
  padding-left: var(--gjs-db-gap-1);
}
[data-db-panel='db-top'][data-db-compact='3'] [data-db-pages-label] {
  max-width: 6rem;
}
`;

export default getShellCompactCss;
