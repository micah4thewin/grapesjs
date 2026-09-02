const buildPrimitiveTopBarCss = () => `
.gjs-db-panel-top {
  display: flex;
  align-items: center;
  gap: var(--gjs-db-gap-2);
  padding: var(--gjs-db-gap-1) var(--gjs-db-gap-2);
  background-color: var(--gjs-db-panel);
  border-radius: var(--gjs-db-r-3);
  box-shadow: var(--gjs-db-lift-1);
  font-family: var(--gjs-db-font-ui);
  color: var(--gjs-db-fg);
}
.gjs-db-panel-group {
  display: flex;
  align-items: center;
  gap: var(--gjs-db-gap-1);
}
.gjs-db-panel-group + .gjs-db-panel-group {
  border-left: 1px solid var(--gjs-db-line);
  padding-left: var(--gjs-db-gap-2);
}
.gjs-db-panel-button {
  width: 2rem;
  height: 2rem;
  padding: 0;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--gjs-db-r-2);
  background-color: transparent;
  box-shadow: none;
  color: var(--gjs-db-muted);
  cursor: pointer;
  transition:
    color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    box-shadow var(--gjs-db-dur-2) var(--gjs-db-ease),
    transform var(--gjs-db-dur-2) var(--gjs-db-ease);
}
.gjs-db-panel-button svg {
  width: 1rem;
  height: 1rem;
  display: block;
  fill: none;
  stroke: currentColor;
}
.gjs-db-panel-button:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
  box-shadow: var(--gjs-db-lift-1);
  transform: translateY(-1px);
}
.gjs-db-panel-button:active {
  box-shadow: var(--gjs-db-press-1);
  transform: translateY(0);
}
.gjs-db-panel-button[aria-pressed='true'],
.gjs-db-panel-button.gjs-pn-active {
  color: var(--gjs-db-accent);
  background-color: var(--gjs-db-accent-soft);
  box-shadow: none;
  transform: none;
}
.gjs-db-status {
  display: inline-flex;
  align-items: center;
  gap: var(--gjs-db-gap-1);
  margin-left: auto;
  font-size: 0.72rem;
  color: var(--gjs-db-faint);
  white-space: nowrap;
}
`;

export default buildPrimitiveTopBarCss;
