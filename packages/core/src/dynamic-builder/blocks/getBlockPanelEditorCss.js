const getBlockPanelEditorCss = () => `
.gjs-block:focus-visible {
  outline: 2px solid var(--gjs-db-focus);
  outline-offset: 2px;
  border-color: var(--gjs-db-accent-soft);
  color: var(--gjs-db-fg);
}
.gjs-block .gjs-block-label {
  min-height: 0;
  padding-bottom: 2px;
}
.gjs-block .gjs-db-block-hint {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  margin: 0;
  padding: 0 var(--gjs-db-gap-2) var(--gjs-db-gap-2);
  text-align: center;
}
.gjs-block .gjs-db-block-keywords {
  display: none;
}
.gjs-block-category .gjs-title {
  cursor: pointer;
}
.gjs-block-category .gjs-title:focus-visible {
  outline: 2px solid var(--gjs-db-focus);
  outline-offset: -2px;
  color: var(--gjs-db-fg);
}
.gjs-db-template-modal .gjs-mdl-dialog {
  width: min(760px, 94vw);
}
.gjs-db-template-chooser {
  display: flex;
  flex-direction: column;
  gap: var(--gjs-db-gap-3);
}
.gjs-db-template-preview-frame {
  position: relative;
  max-height: 340px;
  overflow: auto;
  border: 1px solid var(--gjs-db-line);
  border-radius: var(--gjs-db-r-3);
  background-color: var(--gjs-db-sunken);
}
.gjs-db-template-preview-stage {
  position: relative;
  overflow: hidden;
}
.gjs-db-template-preview {
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
  background: #ffffff;
  transform-origin: 0 0;
  pointer-events: none;
}
@media (pointer: coarse) {
  .gjs-block-category .gjs-title {
    display: flex;
    align-items: center;
    min-height: 44px;
  }
  .gjs-db-block-search {
    min-height: 44px;
  }
  .gjs-block-label {
    font-size: 0.78rem;
  }
  .gjs-block .gjs-db-block-hint {
    font-size: 0.7rem;
  }
}
`;

export default getBlockPanelEditorCss;
