const getTourButtonCss = () => `
.gjs-db-tour-button,
.gjs-db-tour-skip,
.gjs-db-tour-popover .driver-popover-footer button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--gjs-db-tap, 32px);
  padding: 0 14px;
  border: 1px solid var(--gjs-db-line, #e4e0da);
  border-radius: var(--gjs-db-r-2, 8px);
  background-color: var(--gjs-db-panel, #fbfaf8);
  color: var(--gjs-db-fg, #1c1a17);
  font-family: var(--gjs-db-font-ui, system-ui, sans-serif);
  font-size: var(--gjs-db-fs-3, 13px);
  font-weight: var(--gjs-db-w-medium, 500);
  text-shadow: none;
  line-height: 1.3;
  cursor: pointer;
}
.gjs-db-tour-button:hover,
.gjs-db-tour-skip:hover,
.gjs-db-tour-popover .driver-popover-footer button:hover {
  background-color: var(--gjs-db-hover, #f0eeea);
}
.gjs-db-tour-button:focus-visible,
.gjs-db-tour-skip:focus-visible,
.gjs-db-tour-popover .driver-popover-footer button:focus-visible {
  outline: 2px solid var(--gjs-db-focus, #9d4a26);
  outline-offset: 2px;
}
.gjs-db-tour-next,
.gjs-db-tour-popover .driver-popover-next-btn {
  border-color: var(--gjs-db-accent, #9d4a26);
  background-color: var(--gjs-db-accent, #9d4a26);
  color: var(--gjs-db-accent-fg, #ffffff);
}
.gjs-db-tour-next:hover,
.gjs-db-tour-popover .driver-popover-next-btn:hover {
  background-color: var(--gjs-db-accent, #9d4a26);
  filter: brightness(1.08);
}
.gjs-db-tour-skip,
.gjs-db-tour-popover .gjs-db-tour-skip {
  border-color: transparent;
  background-color: transparent;
  color: var(--gjs-db-muted, #5d574f);
  padding-left: 0;
  padding-right: 10px;
  margin-right: auto;
  text-decoration: underline;
}
.gjs-db-tour-skip:hover,
.gjs-db-tour-popover .gjs-db-tour-skip:hover {
  background-color: transparent;
  color: var(--gjs-db-accent, #9d4a26);
}
.gjs-db-tour-popover .driver-popover-btn-disabled {
  display: none;
}
`;

export default getTourButtonCss;
