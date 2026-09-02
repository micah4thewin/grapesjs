const buildStyleManagerCss = () => `
.gjs-sm-sector {
  border: none;
  border-bottom: 1px solid var(--gjs-db-line);
  font-family: var(--gjs-db-font-ui);
}
.gjs-sm-sector-title {
  background-color: transparent;
  border: none;
  color: var(--gjs-db-faint);
  font-size: 0.68rem;
  font-weight: var(--gjs-db-w-bold);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: var(--gjs-db-gap-3) var(--gjs-db-gap-2);
  transition:
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-sm-sector-title:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
}
.gjs-sm-sector-caret {
  color: var(--gjs-db-faint);
  transition: transform var(--gjs-db-dur-2) var(--gjs-db-ease);
}
.gjs-sm-properties {
  padding: var(--gjs-db-gap-2);
}
.gjs-sm-property {
  margin-bottom: var(--gjs-db-gap-2);
}
.gjs-sm-label,
.gjs-sm-property .gjs-sm-label {
  color: var(--gjs-db-muted);
  font-size: 0.72rem;
  margin-bottom: 3px;
}
.gjs-sm-clear {
  color: var(--gjs-db-faint);
  cursor: pointer;
  transition: color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-sm-clear:hover {
  color: var(--gjs-db-fg);
}
.gjs-sm-close-btn {
  color: var(--gjs-db-faint);
}
.gjs-sm-property .gjs-sm-btn {
  background: var(--gjs-db-panel);
  border: none;
  border-radius: var(--gjs-db-r-2);
  box-shadow: var(--gjs-db-lift-1);
  color: var(--gjs-db-muted);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.72rem;
  padding: 0.45em 0.9em;
  cursor: pointer;
  text-shadow: none;
  transition:
    color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    box-shadow var(--gjs-db-dur-2) var(--gjs-db-ease);
}
.gjs-sm-property .gjs-sm-btn:hover {
  color: var(--gjs-db-fg);
  background: var(--gjs-db-hover);
  box-shadow: var(--gjs-db-lift-2);
}
.gjs-sm-property .gjs-sm-btn:active {
  box-shadow: var(--gjs-db-press-1);
  background: var(--gjs-db-active);
}
.gjs-sm-layers {
  min-height: 30px;
}
.gjs-sm-layer {
  background-color: var(--gjs-db-sunken);
  box-shadow: var(--gjs-db-press-1);
  border: none;
  border-radius: var(--gjs-db-r-2);
  margin-top: var(--gjs-db-gap-1);
  padding: var(--gjs-db-gap-1) var(--gjs-db-gap-2);
  color: var(--gjs-db-muted);
}
.gjs-sm-layer.gjs-sm-active {
  background-color: var(--gjs-db-accent-soft);
  box-shadow: none;
  color: var(--gjs-db-fg);
}
.gjs-sm-layer-preview-cnt {
  border-radius: var(--gjs-db-r-1);
  box-shadow: var(--gjs-db-lift-1);
}
.gjs-sm-stack #gjs-sm-add {
  color: var(--gjs-db-faint);
}
.gjs-sm-stack #gjs-sm-add:hover {
  color: var(--gjs-db-fg);
}
`;

export default buildStyleManagerCss;
