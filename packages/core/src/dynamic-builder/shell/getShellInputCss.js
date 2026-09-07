import getPaletteChromeCss from './getPaletteChromeCss.js';

const getShellInputCss = () =>
  getPaletteChromeCss() +
  `

.gjs-db-keys {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}
.gjs-db-key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.7em;
  height: 1.7em;
  padding: 0 0.42em;
  border-radius: var(--gjs-db-r-1, 4px);
  background-color: var(--gjs-db-sunken);
  box-shadow: var(--gjs-db-press-1);
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.68rem;
  font-weight: var(--gjs-db-w-bold, 600);
  line-height: 1;
  letter-spacing: 0;
  text-transform: none;
  white-space: nowrap;
}
.gjs-db-key-join {
  margin: 0 5px;
  color: var(--gjs-db-faint);
  font-size: 0.68rem;
}
.gjs-db-shortcut-list {
  display: grid;
  grid-template-columns: minmax(9rem, auto) 1fr;
  gap: var(--gjs-db-gap-2) var(--gjs-db-gap-3);
  align-items: center;
  margin: 0;
}
.gjs-db-shortcut-keys,
.gjs-db-shortcut-label {
  margin: 0;
}
.gjs-db-shortcut-label {
  color: var(--gjs-db-fg);
}
.gjs-db-shortcut-note {
  margin: 0;
  color: var(--gjs-db-faint);
  font-size: 0.74rem;
}
.gjs-db-menu-section-title {
  padding: 5px 9px 2px;
  color: var(--gjs-db-faint);
  font-size: 0.62rem;
  font-weight: var(--gjs-db-w-bold, 600);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.gjs-db-palette-trigger {
  gap: 0.45em;
}
.gjs-db-palette-trigger-label {
  font-size: 0.78rem;
  white-space: nowrap;
}
.gjs-db-palette-trigger .gjs-db-keys {
  opacity: 0.85;
}
@media (max-width: 1180px) {
  .gjs-db-palette-trigger-label,
  .gjs-db-palette-trigger .gjs-db-keys {
    display: none;
  }
}
`;

export default getShellInputCss;
