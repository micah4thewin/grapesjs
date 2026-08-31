const buildSelectorManagerCss = () => `
.gjs-clm-tags {
  padding: var(--gjs-db-gap-2);
  font-family: var(--gjs-db-font-ui);
}
.gjs-clm-header {
  color: var(--gjs-db-muted);
  font-size: 0.74rem;
}
.gjs-clm-header-status {
  color: var(--gjs-db-faint);
}
.gjs-clm-tag {
  background-color: var(--gjs-db-sunken);
  box-shadow: var(--gjs-db-press-1);
  border: none;
  border-radius: var(--gjs-db-r-pill);
  color: var(--gjs-db-fg);
  font-size: 0.72rem;
  padding: 0.2em 0.4em 0.2em 0.75em;
  margin: 0 var(--gjs-db-gap-1) var(--gjs-db-gap-1) 0;
}
.gjs-clm-tag-status,
.gjs-clm-tag-close {
  color: var(--gjs-db-faint);
  cursor: pointer;
  transition: color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-clm-tag-status:hover,
.gjs-clm-tag-close:hover {
  color: var(--gjs-db-fg);
}
.gjs-clm-tag svg {
  fill: currentColor;
}
#gjs-clm-add-tag,
.gjs-clm-tags-btn {
  background-color: var(--gjs-db-panel);
  box-shadow: var(--gjs-db-lift-1);
  border: none;
  border-radius: var(--gjs-db-r-2);
  color: var(--gjs-db-muted);
  cursor: pointer;
  transition:
    color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    box-shadow var(--gjs-db-dur-2) var(--gjs-db-ease);
}
#gjs-clm-add-tag:hover,
.gjs-clm-tags-btn:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
  box-shadow: var(--gjs-db-lift-2);
}
.gjs-clm-tags-btn svg {
  fill: currentColor;
}
.gjs-clm-sels-info {
  color: var(--gjs-db-faint);
  font-size: 0.72rem;
  margin-top: var(--gjs-db-gap-2);
}
.gjs-clm-sel-id {
  font-family: var(--gjs-db-font-mono);
  font-size: 0.72rem;
  color: var(--gjs-db-muted);
}
.gjs-clm-label-sel {
  color: var(--gjs-db-muted);
}
#gjs-clm-sel {
  color: var(--gjs-db-fg);
  font-style: normal;
}
#gjs-clm-checkbox {
  color: var(--gjs-db-faint);
}
`;

export default buildSelectorManagerCss;
