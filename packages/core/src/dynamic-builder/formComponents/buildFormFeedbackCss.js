const buildFormFeedbackCss = () => `
.db-form-field[data-db-required='true'] .db-field-label::after {
  content: ' *';
  color: var(--db-color-danger, #b91c1c);
}
.db-field-invalid {
  border-color: var(--db-color-danger, #b91c1c);
  box-shadow: 0 0 0 1px var(--db-color-danger, #b91c1c);
}
.db-choice input.db-field-invalid {
  box-shadow: none;
  outline: 2px solid var(--db-color-danger, #b91c1c);
  outline-offset: 2px;
}
.db-field-error {
  display: block;
  margin-top: var(--db-space-1, 0.25rem);
  font-size: var(--db-type-xs, 0.8rem);
  font-weight: 600;
  color: var(--db-color-danger, #b91c1c);
}
.db-field-error:empty {
  display: none;
}
.db-form-status {
  margin: 0;
  padding: var(--db-space-3, 0.75rem) var(--db-space-4, 1rem);
  border: 1px solid transparent;
  border-radius: var(--db-radius-md, 0.5rem);
  font-size: var(--db-type-sm, 0.9rem);
  font-weight: 600;
}
.db-form-status:empty {
  display: none;
}
.db-form-status-success {
  border-color: var(--db-color-success, #15803d);
  color: var(--db-color-success, #15803d);
  background: var(--db-color-surface-alt, #f4f6fa);
}
.db-form-status-error {
  border-color: var(--db-color-danger, #b91c1c);
  color: var(--db-color-danger, #b91c1c);
  background: var(--db-color-surface-alt, #f4f6fa);
}
.db-honeypot {
  position: absolute !important;
  left: -9999px !important;
  top: auto !important;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
`;

export default buildFormFeedbackCss;
