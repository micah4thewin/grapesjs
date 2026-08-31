const buildPrimitivePaletteCss = () => `
.gjs-db-palette {
  display: flex;
  flex-direction: column;
  gap: var(--gjs-db-gap-2);
  padding: var(--gjs-db-gap-3);
  background-color: var(--gjs-db-panel);
  border-radius: var(--gjs-db-r-4);
  box-shadow: var(--gjs-db-lift-4);
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
}
.gjs-db-palette-input {
  width: 100%;
  padding: 0.6em 0.9em;
  border: none;
  border-radius: var(--gjs-db-r-2);
  background-color: var(--gjs-db-sunken);
  box-shadow: var(--gjs-db-press-1);
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.9rem;
  transition: box-shadow var(--gjs-db-dur-2) var(--gjs-db-ease-soft);
}
.gjs-db-palette-input::placeholder {
  color: var(--gjs-db-faint);
}
.gjs-db-palette-input:focus,
.gjs-db-palette-input:focus-visible {
  outline: none;
  box-shadow: var(--gjs-db-press-1), 0 0 0 2px var(--gjs-db-focus);
}
.gjs-db-palette-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
  overflow-y: auto;
  max-height: 46vh;
  overscroll-behavior: contain;
}
.gjs-db-palette-item {
  display: flex;
  align-items: center;
  gap: var(--gjs-db-gap-2);
  padding: 0.5em var(--gjs-db-gap-3);
  border-radius: var(--gjs-db-r-2);
  color: var(--gjs-db-muted);
  font-size: 0.83rem;
  cursor: pointer;
  transition:
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-palette-item svg {
  flex: 0 0 auto;
  width: 1em;
  height: 1em;
  fill: none;
  stroke: currentColor;
}
.gjs-db-palette-item:hover {
  background-color: var(--gjs-db-hover);
  color: var(--gjs-db-fg);
}
.gjs-db-palette-item[aria-selected='true'] {
  background-color: var(--gjs-db-active);
  box-shadow: var(--gjs-db-press-1);
  color: var(--gjs-db-fg);
  font-weight: var(--gjs-db-w-bold);
}
`;

export default buildPrimitivePaletteCss;
