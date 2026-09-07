const buildToastCss = () => `
.gjs-db-toast-host {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gjs-db-gap-2);
  max-width: calc(100% - 32px);
  z-index: 60;
  pointer-events: none;
}
.gjs-db-toast {
  display: inline-flex;
  align-items: center;
  gap: var(--gjs-db-gap-2);
  max-width: 100%;
  padding: 9px 16px;
  border: 1px solid var(--gjs-db-line);
  border-radius: var(--gjs-db-r-pill);
  background-color: var(--gjs-db-panel);
  box-shadow: var(--gjs-db-lift-3);
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.8rem;
  white-space: nowrap;
  pointer-events: auto;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity var(--gjs-db-dur-3) var(--gjs-db-ease),
    transform var(--gjs-db-dur-3) var(--gjs-db-ease);
}
.gjs-db-toast-visible {
  opacity: 1;
  transform: translateY(0);
}
.gjs-db-toast-success {
  border-color: var(--gjs-db-success);
}
.gjs-db-toast-warning {
  border-color: var(--gjs-db-warning);
}
.gjs-db-toast-error {
  border-color: var(--gjs-db-error);
}
.gjs-db-toast-actionable {
  padding-right: 6px;
  white-space: normal;
}
.gjs-db-toast-text {
  min-width: 0;
  overflow-wrap: anywhere;
}
.gjs-db-toast-action,
.gjs-db-toast-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  min-height: 32px;
  border: none;
  border-radius: var(--gjs-db-r-pill);
  background-color: transparent;
  color: var(--gjs-db-accent);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.78rem;
  font-weight: var(--gjs-db-w-bold);
  cursor: pointer;
  transition: background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-toast-action {
  padding: 0 12px;
}
.gjs-db-toast-close {
  width: 32px;
  color: var(--gjs-db-muted);
}
.gjs-db-toast-close svg {
  fill: none;
  stroke: currentColor;
}
.gjs-db-toast-action:hover,
.gjs-db-toast-close:hover {
  background-color: var(--gjs-db-hover);
}
.gjs-db-toast-action:focus-visible,
.gjs-db-toast-close:focus-visible {
  outline: 2px solid var(--gjs-db-focus);
  outline-offset: -2px;
}
@media (prefers-reduced-motion: reduce) {
  .gjs-db-toast {
    transition: opacity var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
    transform: none;
  }
}
`;

export default buildToastCss;
