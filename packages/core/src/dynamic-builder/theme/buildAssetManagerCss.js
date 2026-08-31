const buildAssetManagerCss = () => `
.gjs-am-assets-cont {
  background-color: transparent;
  padding: var(--gjs-db-gap-2);
}
.gjs-am-assets-header {
  padding: var(--gjs-db-gap-2);
}
.gjs-am-asset {
  border: none;
  border-radius: var(--gjs-db-r-3);
  background-color: var(--gjs-db-panel);
  box-shadow: var(--gjs-db-lift-1);
  margin-bottom: var(--gjs-db-gap-2);
  padding: var(--gjs-db-gap-2);
  font-family: var(--gjs-db-font-ui);
  transition:
    box-shadow var(--gjs-db-dur-2) var(--gjs-db-ease),
    transform var(--gjs-db-dur-2) var(--gjs-db-ease);
}
.gjs-am-asset:hover {
  box-shadow: var(--gjs-db-lift-2);
  transform: translateY(-1px);
}
.gjs-am-highlight {
  background-color: var(--gjs-db-active);
  box-shadow: var(--gjs-db-press-1);
  transform: none;
}
.gjs-am-preview-cont {
  border-radius: var(--gjs-db-r-2);
  overflow: hidden;
  box-shadow: var(--gjs-db-press-1);
}
.gjs-am-meta {
  color: var(--gjs-db-muted);
  font-size: 0.74rem;
}
.gjs-am-name {
  color: var(--gjs-db-fg);
}
.gjs-am-dimensions {
  color: var(--gjs-db-faint);
  font-size: 0.68rem;
  font-family: var(--gjs-db-font-mono);
}
.gjs-am-close {
  color: var(--gjs-db-faint);
  cursor: pointer;
  transition: color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-am-close:hover {
  color: var(--gjs-db-error);
}
.gjs-am-add-asset .gjs-am-add-field {
  background-color: var(--gjs-db-sunken);
  box-shadow: var(--gjs-db-press-1);
  border: none;
  border-radius: var(--gjs-db-r-2);
  padding: 0.5em 0.8em;
  color: var(--gjs-db-fg);
}
.gjs-am-file-uploader > form {
  background-color: var(--gjs-db-sunken);
  box-shadow: var(--gjs-db-press-1);
  border: 2px dashed var(--gjs-db-line);
  border-radius: var(--gjs-db-r-3);
  transition: border-color var(--gjs-db-dur-2) var(--gjs-db-ease-soft);
}
.gjs-am-file-uploader > form.gjs-am-hover {
  border-color: var(--gjs-db-focus);
}
.gjs-am-file-uploader #gjs-am-title {
  color: var(--gjs-db-muted);
  font-family: var(--gjs-db-font-ui);
}
.gjs-dropzone {
  border: 2px dashed var(--gjs-db-line);
  background-color: var(--gjs-db-overlay);
  color: var(--gjs-db-muted);
}
`;

export default buildAssetManagerCss;
