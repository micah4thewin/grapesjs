const getWorkspaceDockCss = () => `
.gjs-db-dock-head {
  flex: 0 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gjs-db-gap-2);
  padding: var(--gjs-db-gap-4) var(--gjs-db-gap-4) var(--gjs-db-gap-3);
  border-bottom: 1px solid var(--gjs-db-line);
}
.gjs-db-dock-title {
  flex: 1 1 auto;
  margin: 0;
  font-size: var(--gjs-db-fs-3);
  font-weight: var(--gjs-db-w-bold);
  letter-spacing: 0;
  color: var(--gjs-db-fg);
}
.gjs-db-dock-hint {
  flex: 1 1 100%;
  margin: 0;
  font-size: var(--gjs-db-fs-2);
  color: var(--gjs-db-faint);
  line-height: var(--gjs-db-lh-tight);
}
.gjs-db-dock-search {
  flex: 1 1 100%;
  min-width: 0;
}
.gjs-db-dock-search:empty {
  display: none;
}
.gjs-db-dock-action {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gjs-db-gap-1);
  min-height: var(--gjs-db-tap);
  padding: 0 var(--gjs-db-gap-2);
  border: 1px solid var(--gjs-db-line);
  border-radius: var(--gjs-db-r-1);
  background-color: transparent;
  color: var(--gjs-db-muted);
  font-family: var(--gjs-db-font-ui);
  font-size: var(--gjs-db-fs-2);
  cursor: pointer;
  transition:
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-dock-action:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
}
.gjs-db-dock-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: var(--gjs-db-gap-5);
}
.gjs-db-dock-pane {
  display: none;
}
.gjs-db-dock-pane[data-db-pane-active='1'] {
  display: block;
  animation: gjs-db-fade-in var(--gjs-db-dur-2) var(--gjs-db-ease-soft);
}
@keyframes gjs-db-fade-in {
  from {
    opacity: 0;
    transform: translateY(3px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.gjs-db-ws-dock .gjs-db-block-search {
  margin: 0;
  width: 100%;
}
.gjs-db-ws-dock .gjs-blocks-cs,
.gjs-db-ws-dock .gjs-layers {
  padding: var(--gjs-db-gap-2) var(--gjs-db-gap-3);
}
`;

export default getWorkspaceDockCss;
