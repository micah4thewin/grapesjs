const footerButton = '.driver-popover.gjs-db-tour-popover .driver-popover-footer button';

const getTourButtonCss = () => `
.gjs-db-tour-button,
.gjs-db-tour-skip,
${footerButton} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--gjs-db-tap, 32px);
  padding: 7px 14px;
  text-align: center;
  border: 1px solid var(--gjs-db-line, #e4e0da);
  border-radius: var(--gjs-db-r-2, 8px);
  background-color: var(--gjs-db-panel, #fbfaf8);
  color: var(--gjs-db-fg, #1c1a17);
  font-family: var(--gjs-db-font-ui, system-ui, sans-serif);
  font-size: var(--gjs-db-fs-3, 13px);
  font-weight: var(--gjs-db-w-medium, 500);
  text-shadow: none;
  line-height: 1.35;
  white-space: nowrap;
  cursor: pointer;
}
.gjs-db-tour-button:hover,
.gjs-db-tour-skip:hover,
${footerButton}:hover {
  background-color: var(--gjs-db-hover, #f0eeea);
}
.gjs-db-tour-button:focus-visible,
.gjs-db-tour-skip:focus-visible,
${footerButton}:focus-visible {
  outline: 2px solid var(--gjs-db-focus, #9d4a26);
  outline-offset: 2px;
}
.gjs-db-tour-next,
${footerButton}.driver-popover-next-btn {
  border-color: var(--gjs-db-accent, #9d4a26);
  background-color: var(--gjs-db-accent, #9d4a26);
  color: var(--gjs-db-accent-fg, #ffffff);
}
.gjs-db-tour-next:hover,
${footerButton}.driver-popover-next-btn:hover {
  background-color: var(--gjs-db-accent, #9d4a26);
  filter: brightness(1.08);
}
.gjs-db-tour-skip,
${footerButton}.gjs-db-tour-skip {
  border-color: transparent;
  background-color: transparent;
  color: var(--gjs-db-muted, #5d574f);
  padding-left: 0;
  padding-right: 10px;
  margin-right: auto;
  text-decoration: underline;
}
.gjs-db-tour-skip:hover,
${footerButton}.gjs-db-tour-skip:hover {
  background-color: transparent;
  color: var(--gjs-db-accent, #9d4a26);
}
.gjs-db-tour-button:disabled,
${footerButton}.driver-popover-btn-disabled {
  border-color: transparent;
  background-color: transparent;
  color: var(--gjs-db-muted, #5d574f);
  opacity: 0.45;
  cursor: default;
}
.driver-popover.gjs-db-tour-popover .driver-popover-progress-text {
  margin: 0 10px 0 0;
}
`;

export default getTourButtonCss;
