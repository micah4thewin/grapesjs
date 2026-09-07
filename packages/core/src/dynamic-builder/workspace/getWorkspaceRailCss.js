const getWorkspaceRailCss = () => `
.gjs-db-ws-rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gjs-db-gap-1);
  padding: var(--gjs-db-gap-2) 0;
  background-color: transparent;
  border: none;
  overflow: visible;
}
.gjs-db-rail-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  min-height: var(--gjs-db-tap);
  min-width: var(--gjs-db-tap);
  padding: 0;
  border: none;
  border-radius: var(--gjs-db-r-3);
  background-color: transparent;
  box-shadow: none;
  color: var(--gjs-db-faint);
  cursor: pointer;
  transition:
    color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-2) var(--gjs-db-ease-soft),
    box-shadow var(--gjs-db-dur-2) var(--gjs-db-ease),
    transform var(--gjs-db-dur-2) var(--gjs-db-ease);
}
.gjs-db-rail-button:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
  box-shadow: var(--gjs-db-lift-1);
  transform: translateY(-1px);
}
.gjs-db-rail-button:active {
  box-shadow: var(--gjs-db-press-1);
  transform: translateY(0);
}
.gjs-db-rail-button[aria-pressed='true'],
.gjs-db-rail-button[aria-selected='true'] {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-active);
  box-shadow: var(--gjs-db-press-1);
  transform: none;
}
.gjs-db-rail-tip {
  position: absolute;
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%) translateX(-4px);
  padding: 4px 8px;
  border-radius: var(--gjs-db-r-2);
  background-color: var(--gjs-db-solid);
  box-shadow: var(--gjs-db-lift-2);
  color: var(--gjs-db-text-on-solid);
  font-size: var(--gjs-db-fs-2);
  font-weight: var(--gjs-db-w-bold);
  line-height: 1.2;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  z-index: 40;
  transition:
    opacity var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    transform var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-rail-button:hover .gjs-db-rail-tip,
.gjs-db-rail-button:focus-visible .gjs-db-rail-tip {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}
.gjs-db-rail-divider {
  width: 20px;
  height: 1px;
  margin: var(--gjs-db-gap-1) 0;
  background-color: var(--gjs-db-line);
  flex: 0 0 auto;
}
`;

export default getWorkspaceRailCss;
