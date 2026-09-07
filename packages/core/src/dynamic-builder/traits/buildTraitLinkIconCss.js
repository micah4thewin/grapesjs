const buildTraitLinkIconCss = () => `
.gjs-db-trait-icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.gjs-db-trait-icon-preview {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--gjs-db-r-2);
  background-color: var(--gjs-db-sunken);
  color: var(--gjs-db-fg);
}
.gjs-db-trait-icon-preview svg {
  fill: none;
  stroke: currentColor;
}
.gjs-db-trait-icon-choose {
  flex: 1 1 auto;
  justify-content: space-between;
  min-width: 0;
}
.gjs-db-trait-link,
.gjs-db-trait-url {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.gjs-db-trait-link-file {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
.gjs-db-trait-link-summary,
.gjs-db-trait-link-hint {
  margin: 0;
  overflow-wrap: anywhere;
}
`;

export default buildTraitLinkIconCss;
