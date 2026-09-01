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
  z-index: 60;
  pointer-events: none;
}
.gjs-db-toast {
  padding: 9px 16px;
  border: 1px solid var(--gjs-db-line);
  border-radius: var(--gjs-db-r-pill);
  background-color: var(--gjs-db-panel);
  box-shadow: var(--gjs-db-lift-3);
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.8rem;
  white-space: nowrap;
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
.gjs-db-toast-error {
  border-color: var(--gjs-db-error);
}
@media (prefers-reduced-motion: reduce) {
  .gjs-db-toast {
    transition: opacity var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
    transform: none;
  }
}
`;

export default buildToastCss;
