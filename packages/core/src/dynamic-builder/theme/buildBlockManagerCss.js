const buildBlockManagerCss = () => `
.gjs-blocks-c {
  padding: var(--gjs-db-gap-2) var(--gjs-db-gap-1);
}
.gjs-block {
  width: 42%;
  min-height: 74px;
  margin: var(--gjs-db-gap-2) 4% 0;
  padding: var(--gjs-db-gap-3) var(--gjs-db-gap-2);
  border: none;
  border-radius: var(--gjs-db-r-3);
  background-color: var(--gjs-db-panel);
  box-shadow: var(--gjs-db-lift-1);
  color: var(--gjs-db-muted);
  font-family: var(--gjs-db-font-ui);
  justify-content: center;
  gap: var(--gjs-db-gap-2);
  cursor: grab;
  transition:
    box-shadow var(--gjs-db-dur-2) var(--gjs-db-ease),
    transform var(--gjs-db-dur-2) var(--gjs-db-ease),
    color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-2) var(--gjs-db-ease-soft);
}
.gjs-block:hover {
  box-shadow: var(--gjs-db-lift-2);
  transform: translateY(-2px);
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
}
.gjs-block:active {
  box-shadow: var(--gjs-db-press-1);
  transform: none;
  cursor: grabbing;
}
.gjs-block__media {
  margin-bottom: 0;
}
.gjs-block svg[fill='none'] {
  fill: none;
  stroke: currentColor;
}
.gjs-block-svg {
  width: 42px;
}
.gjs-block-label {
  font-family: var(--gjs-db-font-ui);
  font-size: 0.68rem;
  font-weight: var(--gjs-db-w-normal);
  letter-spacing: 0.02em;
}
.gjs-block-categories {
  border: none;
}
.gjs-block-category {
  border: none;
}
.gjs-block-category .gjs-title,
.gjs-category-title {
  background-color: transparent;
  border-bottom: 1px solid var(--gjs-db-line);
  color: var(--gjs-db-faint);
  font-size: 0.68rem;
  font-weight: var(--gjs-db-w-bold);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: var(--gjs-db-gap-3) var(--gjs-db-gap-2) var(--gjs-db-gap-2) var(--gjs-db-gap-4);
  transition:
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-block-category .gjs-title:hover,
.gjs-category-title:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
}
.gjs-category-open,
.gjs-block-category.gjs-open {
  border-bottom: 1px solid var(--gjs-db-line);
}
.gjs-block-category .gjs-caret-icon {
  color: var(--gjs-db-faint);
}
`;

export default buildBlockManagerCss;
