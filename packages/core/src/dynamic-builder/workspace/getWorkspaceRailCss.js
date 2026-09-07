const getWorkspaceRailCss = () => `
.gjs-db-ws-rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gjs-db-gap-1);
  padding: var(--gjs-db-gap-2) 0;
  background-color: var(--gjs-db-bg);
  border-right: 1px solid var(--gjs-db-line);
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
  border-radius: var(--gjs-db-r-2);
  background-color: transparent;
  color: var(--gjs-db-faint);
  cursor: pointer;
  transition:
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-rail-button:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
}
.gjs-db-rail-button[aria-pressed='true'],
.gjs-db-rail-button[aria-selected='true'] {
  color: var(--gjs-db-accent);
  background-color: var(--gjs-db-accent-soft);
}
.gjs-db-rail-tip {
  position: absolute;
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%) translateX(-4px);
  padding: 4px 8px;
  border-radius: var(--gjs-db-r-1);
  background-color: var(--gjs-db-fg);
  color: var(--gjs-db-bg);
  font-size: var(--gjs-db-fs-2);
  font-weight: var(--gjs-db-w-medium);
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
