const buildBlockManagerCss = () => `
.gjs-blocks-c {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  gap: var(--gjs-db-gap-2);
  box-sizing: border-box;
  width: 100%;
  padding: var(--gjs-db-gap-3) var(--gjs-db-gap-2) var(--gjs-db-gap-4);
}
.gjs-block,
.gjs-block * {
  box-sizing: border-box;
}
.gjs-block {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: auto;
  min-width: 0;
  min-height: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: var(--gjs-db-r-3);
  background-color: var(--gjs-db-panel);
  box-shadow: var(--gjs-db-lift-1);
  color: var(--gjs-db-muted);
  font-family: var(--gjs-db-font-ui);
  cursor: grab;
  transition:
    box-shadow var(--gjs-db-dur-2) var(--gjs-db-ease),
    transform var(--gjs-db-dur-2) var(--gjs-db-ease),
    border-color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    color var(--gjs-db-dur-2) var(--gjs-db-ease-soft);
}
.gjs-block:hover {
  box-shadow: var(--gjs-db-lift-2);
  transform: translateY(-2px);
  border-color: var(--gjs-db-accent-soft);
  color: var(--gjs-db-fg);
}
.gjs-block:active {
  box-shadow: var(--gjs-db-press-1);
  transform: none;
  cursor: grabbing;
}
.gjs-block__media {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 62px;
  margin: 0;
  padding: 6px;
  border-radius: 0;
  background-color: var(--gjs-db-sunken);
  box-shadow: none;
  color: var(--gjs-db-fg);
}
.gjs-block__media > svg {
  width: 100%;
  height: 100%;
}
.gjs-db-block-preview {
  display: block;
  color: var(--gjs-db-fg);
}
.gjs-block svg[fill='none'] {
  fill: none;
  stroke: currentColor;
}
.gjs-block-svg {
  width: 100%;
}
.gjs-block-label {
  display: block;
  width: 100%;
  padding: var(--gjs-db-gap-2) var(--gjs-db-gap-2) calc(var(--gjs-db-gap-2) + 1px);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.7rem;
  font-weight: var(--gjs-db-w-bold);
  line-height: 1.3;
  letter-spacing: 0.005em;
  text-align: center;
  color: var(--gjs-db-fg);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  min-height: 2.6em;
}
.gjs-block:hover .gjs-block__media {
  background-color: var(--gjs-db-accent-soft);
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
