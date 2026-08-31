const buildFormLayoutCss = () => `
.db-form {
  display: grid;
  gap: var(--db-space-4, 1rem);
  width: 100%;
  max-width: 40rem;
  font-family: var(--db-font-body, inherit);
  color: var(--db-color-text, #111827);
}
.db-form-field {
  display: grid;
  gap: var(--db-space-2, 0.5rem);
}
.db-field-label,
.db-radio-group legend {
  font-size: var(--db-type-sm, 0.9rem);
  font-weight: 600;
  line-height: 1.4;
  color: var(--db-color-text, #111827);
}
.db-field-help {
  font-size: var(--db-type-xs, 0.8rem);
  color: var(--db-color-text-muted, #5b6472);
}
.db-radio-group {
  display: grid;
  gap: var(--db-space-2, 0.5rem);
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
}
.db-radio-group legend {
  padding: 0;
  margin-bottom: var(--db-space-1, 0.25rem);
}
.db-choice-list {
  display: grid;
  gap: var(--db-space-2, 0.5rem);
}
.db-choice {
  display: flex;
  align-items: flex-start;
  gap: var(--db-space-2, 0.5rem);
  font-size: var(--db-type-sm, 0.9rem);
  line-height: 1.5;
  cursor: pointer;
}
.db-choice input {
  flex: none;
  width: 1.25rem;
  height: 1.25rem;
  margin: 0.125rem 0 0;
  accent-color: var(--db-color-brand, #4f46e5);
}
.db-choice a {
  color: var(--db-color-brand, #4f46e5);
}
.db-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
@media (max-width: 640px) {
  .db-form {
    max-width: 100%;
  }
}
`;

export default buildFormLayoutCss;
