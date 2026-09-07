const getTourOverlayCss = () => `
.gjs-db-tour-root {
  position: fixed;
  inset: 0;
  z-index: 100000;
  pointer-events: none;
}
.gjs-db-tour-hole {
  position: fixed;
  border-radius: var(--gjs-db-r-2, 8px);
  box-shadow:
    0 0 0 2px var(--gjs-db-accent, #9d4a26),
    0 0 0 9999px var(--gjs-db-overlay, rgba(28, 26, 23, 0.45)),
    0 0 0 9999px var(--gjs-db-overlay, rgba(28, 26, 23, 0.45));
  transition: all var(--gjs-db-dur-3, 220ms) var(--gjs-db-ease, ease);
  pointer-events: none;
}
.gjs-db-tour-help {
  position: absolute;
  left: 14px;
  bottom: 14px;
  z-index: 58;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--gjs-db-tap, 32px);
  height: var(--gjs-db-tap, 32px);
  padding: 0;
  border: 1px solid var(--gjs-db-line, #e4e0da);
  border-radius: var(--gjs-db-r-pill, 999px);
  background-color: var(--gjs-db-panel, #fbfaf8);
  box-shadow: var(--gjs-db-lift-2, 0 2px 8px rgba(0, 0, 0, 0.16));
  color: var(--gjs-db-muted, #5d574f);
  font-family: var(--gjs-db-font-ui, system-ui, sans-serif);
  cursor: pointer;
  transition:
    color var(--gjs-db-dur-1, 120ms) var(--gjs-db-ease-soft, ease),
    background-color var(--gjs-db-dur-1, 120ms) var(--gjs-db-ease-soft, ease);
}
.gjs-db-tour-help:hover {
  color: var(--gjs-db-accent, #9d4a26);
  background-color: var(--gjs-db-hover, #f0eeea);
}
.gjs-db-tour-help:focus-visible {
  outline: 2px solid var(--gjs-db-focus, #9d4a26);
  outline-offset: 2px;
}
.gjs-db-tour-help-mark {
  font-size: 17px;
  font-weight: var(--gjs-db-w-bold, 600);
  line-height: 1;
}
.gjs-db-previewing .gjs-db-tour-help {
  display: none;
}
@media (prefers-reduced-motion: reduce) {
  .gjs-db-tour-hole {
    transition: none;
  }
}
`;

export default getTourOverlayCss;
