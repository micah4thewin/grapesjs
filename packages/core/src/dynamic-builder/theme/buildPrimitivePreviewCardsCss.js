const buildPrimitivePreviewCardsCss = () => `
.gjs-db-preview-card {
  display: flex;
  flex-direction: column;
  gap: var(--gjs-db-gap-1);
  padding: var(--gjs-db-gap-3);
  border-radius: var(--gjs-db-r-3);
  background-color: var(--gjs-db-sunken);
  box-shadow: var(--gjs-db-press-1);
  font-family: var(--gjs-db-font-ui);
}
.gjs-db-preview-title {
  font-size: 0.95rem;
  font-weight: var(--gjs-db-w-bold);
  color: var(--gjs-db-fg);
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gjs-db-preview-url {
  font-size: 0.7rem;
  font-family: var(--gjs-db-font-mono);
  color: var(--gjs-db-muted);
  word-break: break-all;
}
.gjs-db-preview-description {
  font-size: 0.78rem;
  color: var(--gjs-db-faint);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`;

export default buildPrimitivePreviewCardsCss;
