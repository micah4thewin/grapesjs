const buildLayerManagerCss = () => `
.gjs-layers {
  background-color: transparent;
}
.gjs-layer {
  background-color: transparent;
  border: none;
  color: var(--gjs-db-muted);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.78rem;
}
.gjs-layer-item {
  border: none;
  border-radius: var(--gjs-db-r-1);
  background-color: transparent;
  padding-right: var(--gjs-db-gap-2);
  transition:
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-layer-title {
  background-color: transparent;
  border: none;
  padding: 0.34em 0;
}
.gjs-layer.gjs-hovered .gjs-layer-item {
  background-color: var(--gjs-db-hover);
  color: var(--gjs-db-fg);
}
.gjs-layer.gjs-selected .gjs-layer-item {
  background-color: var(--gjs-db-accent-soft);
  box-shadow: none;
  color: var(--gjs-db-fg);
  font-weight: var(--gjs-db-w-medium);
}
.gjs-layer-caret {
  color: var(--gjs-db-faint);
  transition: transform var(--gjs-db-dur-2) var(--gjs-db-ease);
}
.gjs-layer-vis,
.gjs-layer-move {
  color: var(--gjs-db-faint);
  cursor: pointer;
  transition: color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-layer-vis:hover,
.gjs-layer-move:hover {
  color: var(--gjs-db-fg);
}
.gjs-layer__icon svg,
.gjs-layer-vis svg,
.gjs-layer-move svg,
.gjs-layer-caret svg {
  fill: currentColor;
}
.gjs-layer-name {
  font-size: 0.78rem;
}
.gjs-layer-name--no-edit {
  cursor: default;
}
.gjs-layer-count {
  color: var(--gjs-db-faint);
  font-size: 0.68rem;
  font-family: var(--gjs-db-font-mono);
}
.gjs-layer.gjs-opac50 {
  opacity: 0.5;
}
`;

export default buildLayerManagerCss;
