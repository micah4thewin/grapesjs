const buildPrimitiveButtonsCss = () => `
.gjs-db-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gjs-db-gap-2);
  padding: 0.5em 1.05em;
  border: none;
  border-radius: var(--gjs-db-r-2);
  background-color: var(--gjs-db-panel);
  box-shadow: var(--gjs-db-lift-1);
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.8rem;
  line-height: 1.3;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition:
    box-shadow var(--gjs-db-dur-2) var(--gjs-db-ease),
    transform var(--gjs-db-dur-2) var(--gjs-db-ease),
    background-color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    opacity var(--gjs-db-dur-2) var(--gjs-db-ease-soft);
}
.gjs-db-button svg {
  width: 1em;
  height: 1em;
  fill: none;
  stroke: currentColor;
}
.gjs-db-button:hover:not(:disabled) {
  background-color: var(--gjs-db-hover);
  box-shadow: var(--gjs-db-lift-2);
  transform: translateY(-1px);
}
.gjs-db-button:active:not(:disabled) {
  background-color: var(--gjs-db-active);
  box-shadow: var(--gjs-db-press-1);
  transform: translateY(0);
  transition-duration: var(--gjs-db-dur-1);
}
.gjs-db-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
  background-color: var(--gjs-db-sunken);
  transform: none;
}
.gjs-db-button-primary {
  background-color: var(--gjs-db-accent);
  color: var(--gjs-db-accent-fg);
  font-weight: var(--gjs-db-w-medium);
}
.gjs-db-button-primary:hover:not(:disabled) {
  background-color: var(--gjs-db-accent);
  color: var(--gjs-db-accent-fg);
  opacity: 0.9;
}
.gjs-db-button-primary:active:not(:disabled) {
  background-color: var(--gjs-db-accent);
  color: var(--gjs-db-accent-fg);
}
.gjs-db-button-danger {
  color: var(--gjs-db-error);
  font-weight: var(--gjs-db-w-bold);
}
.gjs-db-button-danger:hover:not(:disabled) {
  color: var(--gjs-db-error);
}
.gjs-db-button-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: var(--gjs-db-gap-2);
  padding-top: var(--gjs-db-gap-2);
}
`;

export default buildPrimitiveButtonsCss;
