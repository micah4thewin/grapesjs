const getPaletteChromeCss = () => `
.gjs-db-palette-modal .gjs-mdl-header {
  display: none;
}
.gjs-db-palette-modal .gjs-mdl-content {
  padding: 0;
}
.gjs-db-palette-list:focus {
  outline: none;
}
.gjs-db-palette-group {
  padding: 0.6em var(--gjs-db-gap-3) 0.25em;
  color: var(--gjs-db-faint);
  font-size: 0.64rem;
  font-weight: var(--gjs-db-w-bold, 600);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: default;
}
.gjs-db-palette-item-label {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gjs-db-palette-hint,
.gjs-db-palette-keys {
  flex: 0 0 auto;
}
.gjs-db-palette-footer {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gjs-db-gap-3);
  padding: 0.45em var(--gjs-db-gap-2) 0;
  border-top: 1px solid var(--gjs-db-line);
  color: var(--gjs-db-faint);
  font-size: 0.7rem;
}
.gjs-db-palette-footer span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
`;

export default getPaletteChromeCss;
