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

export default buildBlockCategoryCss;
