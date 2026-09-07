const buildBlockCategoryCss = () => `
.gjs-block-categories {
  border: none;
}
.gjs-block-category {
  border: none;
}
.gjs-block-category .gjs-title,
.gjs-category-title {
  background-color: transparent;
  border-bottom: 1px solid var(--gjs-db-line-soft);
  color: var(--gjs-db-fg);
  font-size: var(--gjs-db-fs-3);
  font-weight: var(--gjs-db-w-bold);
  letter-spacing: 0;
  padding: var(--gjs-db-gap-3) var(--gjs-db-gap-2) var(--gjs-db-gap-3) var(--gjs-db-gap-3);
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

export default buildBlockCategoryCss;
