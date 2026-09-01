const buildDesignKitCardsCss = () => `
.gjs-db-kit-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gjs-db-gap-3);
}
.gjs-db-kit-card {
  display: flex;
  align-items: center;
  gap: var(--gjs-db-gap-3);
  padding: var(--gjs-db-gap-3);
  border: 1px solid var(--gjs-db-line);
  border-radius: var(--gjs-db-r-3);
  background-color: var(--gjs-db-panel);
  box-shadow: var(--gjs-db-lift-1);
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
  text-align: left;
  cursor: pointer;
  transition:
    box-shadow var(--gjs-db-dur-2) var(--gjs-db-ease),
    transform var(--gjs-db-dur-2) var(--gjs-db-ease);
}
.gjs-db-kit-card:hover {
  box-shadow: var(--gjs-db-lift-2);
  transform: translateY(-2px);
}
.gjs-db-kit-card:focus-visible {
  outline: 2px solid var(--gjs-db-focus);
  outline-offset: 2px;
}
.gjs-db-kit-preview {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--gjs-db-r-2);
  background-color: var(--gjs-db-sunken);
  box-shadow: var(--gjs-db-press-1);
  font-size: 1.25rem;
  font-weight: var(--gjs-db-w-bold);
}
.gjs-db-kit-body {
  flex: 1 1 auto;
  min-width: 0;
}
.gjs-db-kit-name {
  display: block;
  font-size: 0.8rem;
  font-weight: var(--gjs-db-w-bold);
}
.gjs-db-kit-swatches {
  flex: 0 0 auto;
  display: flex;
  gap: 4px;
}
.gjs-db-kit-swatch {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid var(--gjs-db-line);
}
@media (max-width: 640px) {
  .gjs-db-kit-grid {
    grid-template-columns: 1fr;
  }
}
`;

export default buildDesignKitCardsCss;
