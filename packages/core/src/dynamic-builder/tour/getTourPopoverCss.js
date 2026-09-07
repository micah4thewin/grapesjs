const getTourPopoverCss = () => `
.gjs-db-tour-popover,
.driver-popover.gjs-db-tour-popover {
  position: fixed;
  box-sizing: border-box;
  width: 320px;
  max-width: calc(100vw - 24px);
  padding: 16px;
  border: 1px solid var(--gjs-db-line, #e4e0da);
  border-radius: var(--gjs-db-r-3, 12px);
  background-color: var(--gjs-db-panel, #fbfaf8);
  box-shadow: 0 2px 6px var(--gjs-db-shade, rgba(0, 0, 0, 0.14)), 0 20px 56px var(--gjs-db-shade, rgba(0, 0, 0, 0.14));
  color: var(--gjs-db-fg, #1c1a17);
  font-family: var(--gjs-db-font-ui, system-ui, sans-serif);
  pointer-events: auto;
}
.driver-popover.gjs-db-tour-popover * {
  font-family: var(--gjs-db-font-ui, system-ui, sans-serif);
}
.gjs-db-tour-progress,
.gjs-db-tour-popover .driver-popover-progress-text {
  margin: 0 0 6px;
  color: var(--gjs-db-muted, #5d574f);
  font-size: var(--gjs-db-fs-1, 11px);
  font-weight: var(--gjs-db-w-medium, 500);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.gjs-db-tour-title,
.gjs-db-tour-popover .driver-popover-title {
  margin: 0 0 6px;
  color: var(--gjs-db-fg, #1c1a17);
  font-size: var(--gjs-db-fs-5, 18px);
  font-weight: var(--gjs-db-w-bold, 600);
  line-height: var(--gjs-db-lh-tight, 1.35);
}
.gjs-db-tour-text,
.gjs-db-tour-popover .driver-popover-description {
  margin: 0;
  color: var(--gjs-db-muted, #5d574f);
  font-size: var(--gjs-db-fs-3, 13px);
  line-height: var(--gjs-db-lh, 1.55);
}
.gjs-db-tour-actions,
.gjs-db-tour-popover .driver-popover-footer {
  display: flex;
  align-items: center;
  gap: var(--gjs-db-gap-2, 8px);
  margin-top: 14px;
}
.gjs-db-tour-spacer {
  flex: 1 1 auto;
}
.gjs-db-tour-popover .driver-popover-navigation-btns {
  gap: var(--gjs-db-gap-2, 8px);
  margin-left: auto;
}
.gjs-db-tour-popover .driver-popover-arrow {
  border-color: transparent;
}
.gjs-db-tour-popover .driver-popover-close-btn {
  width: var(--gjs-db-tap, 32px);
  height: var(--gjs-db-tap, 32px);
  color: var(--gjs-db-muted, #5d574f);
}
`;

export default getTourPopoverCss;
