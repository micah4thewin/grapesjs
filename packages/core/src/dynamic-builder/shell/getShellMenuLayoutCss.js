const getShellMenuLayoutCss = () => `
.gjs-db-menu-host {
  position: relative;
}
.gjs-db-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 240px;
  max-height: 70vh;
  overflow-y: auto;
  z-index: 40;
}
.gjs-db-menu-align-end {
  left: auto;
  right: 0;
}
.gjs-db-pages-menu {
  min-width: 320px;
}
.gjs-db-menu-row {
  display: flex;
  align-items: center;
  gap: 2px;
}
.gjs-db-menu-item-grow {
  flex: 1 1 auto;
  min-width: 0;
}
.gjs-db-menu-item-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1 1 auto;
  line-height: 1.25;
}
.gjs-db-menu-item-grow .gjs-db-menu-item-label,
.gjs-db-menu-item-meta {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gjs-db-menu-item-meta {
  font-size: 0.68rem;
  color: var(--gjs-db-faint);
}
.gjs-db-menu-home-badge {
  margin-left: auto;
}
.gjs-db-menu-hint {
  padding: 6px 9px 2px;
  font-size: 0.66rem;
  color: var(--gjs-db-faint);
  line-height: 1.4;
}
@media (max-width: 600px) {
  .gjs-db-shell-host .gjs-db-menu {
    position: fixed;
    top: auto;
    left: 8px;
    right: 8px;
    bottom: 8px;
    max-height: 60vh;
    min-width: 0;
  }
  .gjs-db-shell-host .gjs-db-menu-hint {
    display: none;
  }
}
`;

export default getShellMenuLayoutCss;
