const buildFormEditorCanvasCss = () => `
.db-form:not([data-db-recipe='message']):not([data-db-recipe='netlify']):not([action])::before,
.db-form:not([data-db-recipe='message']):not([data-db-recipe='netlify'])[action='']::before {
  content: 'Not connected: choose where submissions go in the settings panel';
  justify-self: start;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: #fef3c7;
  color: #92400e;
  font: 600 0.72rem/1.4 system-ui, sans-serif;
  letter-spacing: 0.02em;
}
.db-form-status:empty {
  display: block;
  border: 1px dashed var(--db-color-line, #dfe3ea);
  color: inherit;
  opacity: 0.7;
  background: transparent;
}
.db-form-status:empty::before {
  content: 'Success or error message appears here after sending';
  font-weight: 500;
}
form[data-db-form] .db-honeypot {
  position: static !important;
  left: auto !important;
  width: auto;
  height: auto;
  overflow: visible;
}
.db-honeypot::before,
.db-hidden-field::before {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border: 1px dashed currentColor;
  border-radius: 999px;
  font: 500 0.72rem/1.4 system-ui, sans-serif;
  opacity: 0.7;
}
.db-honeypot::before {
  content: 'Spam trap: hidden from visitors, catches bots';
}
.db-honeypot label {
  display: none;
}
.db-hidden-field {
  display: block;
}
.db-hidden-field::before {
  content: 'Hidden field: ' attr(data-db-name) ' = ' attr(data-db-value);
}
.db-form-step {
  outline: 1px dashed var(--db-color-line, #dfe3ea);
  outline-offset: 8px;
  border-radius: 4px;
}
.db-form-progress-bar {
  width: 40%;
}
.db-form-sent > :not(.db-form-status) {
  display: revert;
}
`;

export default buildFormEditorCanvasCss;
