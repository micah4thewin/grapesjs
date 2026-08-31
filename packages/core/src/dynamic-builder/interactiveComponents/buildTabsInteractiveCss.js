const buildTabsInteractiveCss = () => `
.db-tabs {
  font-family: var(--db-font-body);
  color: var(--db-color-text);
}
.db-tab-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--db-space-1);
  border-bottom: 1px solid var(--db-color-line);
}
.db-tab-button {
  padding: var(--db-space-3) var(--db-space-4);
  background: transparent;
  border: 0;
  border-bottom: 2px solid transparent;
  border-radius: var(--db-radius-sm) var(--db-radius-sm) 0 0;
  cursor: pointer;
  font-family: inherit;
  font-size: var(--db-type-sm);
  font-weight: 600;
  color: var(--db-color-text-muted);
}
.db-tab-button:hover {
  color: var(--db-color-text);
  background: var(--db-color-surface-alt);
}
.db-tab-button[aria-selected="true"] {
  color: var(--db-color-brand);
  border-bottom-color: var(--db-color-brand);
}
.db-tab-panel {
  padding: var(--db-space-4) 0;
  font-size: var(--db-type-base);
  color: var(--db-color-text-muted);
}
.db-tab-panel > p {
  margin: 0;
}
.db-tabs[data-db-orientation="vertical"] {
  display: grid;
  grid-template-columns: minmax(9rem, 14rem) 1fr;
  gap: var(--db-space-4);
}
.db-tabs[data-db-orientation="vertical"] .db-tab-list {
  flex-direction: column;
  align-items: stretch;
  border-bottom: 0;
  border-right: 1px solid var(--db-color-line);
}
.db-tabs[data-db-orientation="vertical"] .db-tab-button {
  text-align: left;
  border-bottom: 0;
  border-right: 2px solid transparent;
  border-radius: var(--db-radius-sm) 0 0 var(--db-radius-sm);
}
.db-tabs[data-db-orientation="vertical"] .db-tab-button[aria-selected="true"] {
  border-right-color: var(--db-color-brand);
}
.db-tabs[data-db-orientation="vertical"] .db-tab-panel {
  padding: 0;
}
@media (max-width: 640px) {
  .db-tabs[data-db-orientation="vertical"] {
    display: block;
  }
  .db-tab-list,
  .db-tabs[data-db-orientation="vertical"] .db-tab-list {
    flex-direction: column;
    align-items: stretch;
    gap: var(--db-space-1);
    border: 0;
  }
  .db-tab-button,
  .db-tabs[data-db-orientation="vertical"] .db-tab-button {
    text-align: left;
    border: 0;
    border-left: 2px solid transparent;
    border-radius: var(--db-radius-sm);
  }
  .db-tab-button[aria-selected="true"],
  .db-tabs[data-db-orientation="vertical"] .db-tab-button[aria-selected="true"] {
    border-left-color: var(--db-color-brand);
    background: var(--db-color-surface-alt);
  }
  .db-tab-panel {
    padding: var(--db-space-3) 0;
  }
}
`;

export default buildTabsInteractiveCss;
