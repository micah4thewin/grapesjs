const buildListContentCss = () => `
.db-list {
  margin: 0 0 var(--db-space-4, 1rem);
  padding: 0 0 0 var(--db-space-5, 1.5rem);
  font-size: var(--db-type-base, 1rem);
  line-height: 1.65;
  color: var(--db-color-text, #111827);
}
.db-list > li {
  margin: 0 0 var(--db-space-2, 0.5rem);
  padding-left: var(--db-space-1, 0.25rem);
  overflow-wrap: break-word;
}
.db-list > li:last-child {
  margin-bottom: 0;
}
.db-list > li::marker {
  color: var(--db-color-brand, #4f46e5);
}
ol.db-list > li::marker {
  font-weight: 600;
}
.db-list[data-db-spacing='tight'] > li {
  margin-bottom: var(--db-space-1, 0.25rem);
}
.db-list[data-db-spacing='loose'] > li {
  margin-bottom: var(--db-space-3, 0.75rem);
}
.db-list[data-db-spacing='tight'] > li:last-child,
.db-list[data-db-spacing='loose'] > li:last-child {
  margin-bottom: 0;
}
`;

export default buildListContentCss;
