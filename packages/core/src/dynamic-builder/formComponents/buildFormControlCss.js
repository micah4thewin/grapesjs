const buildFormControlCss = () => `
.db-field-control {
  box-sizing: border-box;
  width: 100%;
  min-height: 44px;
  padding: var(--db-space-2, 0.5rem) var(--db-space-3, 0.75rem);
  border: 1px solid var(--db-color-line, #dfe3ea);
  border-radius: var(--db-radius-md, 0.5rem);
  background: var(--db-color-surface, #ffffff);
  color: var(--db-color-text, #111827);
  font-family: var(--db-font-body, inherit);
  font-size: var(--db-type-base, 1rem);
  line-height: 1.4;
}
.db-field-control::placeholder {
  color: var(--db-color-text-muted, #5b6472);
  opacity: 1;
}
textarea.db-field-control {
  min-height: 7rem;
  resize: vertical;
}
select.db-field-control {
  cursor: pointer;
}
input[type='file'].db-field-control {
  padding: var(--db-space-2, 0.5rem);
  cursor: pointer;
}
.db-field-control:focus-visible,
.db-choice input:focus-visible {
  outline: 2px solid var(--db-color-focus-ring, #6366f1);
  outline-offset: 2px;
}
.db-field-control:disabled,
.db-field-control[readonly] {
  background: var(--db-color-surface-alt, #f4f6fa);
}
.db-field-control:disabled {
  cursor: not-allowed;
}
.db-form .db-submit-button {
  justify-self: start;
}
.db-submit-button[aria-busy='true'] {
  opacity: 0.85;
  cursor: progress;
}
.db-submit-button[aria-busy='true']::before {
  content: '';
  display: inline-block;
  width: 0.9em;
  height: 0.9em;
  margin-right: 0.5em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  vertical-align: -0.1em;
  animation: db-form-spin 0.8s linear infinite;
}
@keyframes db-form-spin {
  to {
    transform: rotate(360deg);
  }
}
@media (prefers-reduced-motion: reduce) {
  .db-submit-button[aria-busy='true']::before {
    animation-duration: 2s;
  }
}
`;

export default buildFormControlCss;
