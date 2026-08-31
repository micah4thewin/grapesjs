const buildAccordionInteractiveCss = () => `
.db-accordion {
  display: grid;
  gap: var(--db-space-2);
  font-family: var(--db-font-body);
}
.db-accordion-item {
  background: var(--db-color-surface);
  border: 1px solid var(--db-color-line);
  border-radius: var(--db-radius-md);
  overflow: hidden;
}
.db-accordion-header {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
}
.db-accordion-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--db-space-3);
  width: 100%;
  padding: var(--db-space-4);
  background: transparent;
  border: 0;
  cursor: pointer;
  font-family: inherit;
  font-size: var(--db-type-base);
  font-weight: 600;
  color: var(--db-color-text);
  text-align: left;
}
.db-accordion-trigger:hover {
  background: var(--db-color-surface-alt);
}
.db-accordion-chevron {
  display: inline-flex;
  flex-shrink: 0;
  color: var(--db-color-text-muted);
}
.db-accordion-trigger[aria-expanded="true"] .db-accordion-chevron {
  transform: rotate(180deg);
}
.db-accordion-panel {
  padding: 0 var(--db-space-4) var(--db-space-4);
  font-size: var(--db-type-base);
  color: var(--db-color-text-muted);
}
.db-accordion-panel > p {
  margin: 0;
}
`;

export default buildAccordionInteractiveCss;
