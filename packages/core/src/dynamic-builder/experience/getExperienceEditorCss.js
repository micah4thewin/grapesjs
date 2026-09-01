const getExperienceEditorCss = () => `
.gjs-db-block-search {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin: 8px 8px 2px;
  padding: 0 10px;
  border: 1px solid var(--gjs-db-line);
  border-radius: var(--gjs-db-r-pill);
  background-color: var(--gjs-db-sunken);
  color: var(--gjs-db-muted);
  box-shadow: var(--gjs-db-press-1);
}
.gjs-db-block-search:focus-within {
  color: var(--gjs-db-fg);
  outline: 2px solid var(--gjs-db-focus);
  outline-offset: -1px;
}
.gjs-db-block-search-input {
  flex: 1 1 auto;
  min-width: 0;
  padding: 8px 0;
  border: none;
  background: transparent;
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.8rem;
}
.gjs-db-block-search-input:focus {
  outline: none;
}
.gjs-db-block-hint {
  display: block;
  margin-top: 2px;
  color: var(--gjs-db-faint);
  font-size: 0.64rem;
  line-height: 1.35;
}
.gjs-block {
  cursor: grab;
}
.gjs-block:active {
  cursor: grabbing;
}
@media (pointer: coarse) {
  .gjs-db-panel-button,
  .gjs-db-menu-icon-button {
    width: 2.6rem;
    height: 2.6rem;
  }
  .gjs-db-menu-item,
  .gjs-db-menu-trigger {
    min-height: 44px;
  }
  .gjs-block {
    min-height: 84px;
  }
  .gjs-layer-title {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
`;

export default getExperienceEditorCss;
