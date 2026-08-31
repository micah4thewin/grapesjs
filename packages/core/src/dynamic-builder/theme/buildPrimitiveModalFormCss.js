const buildPrimitiveModalFormCss = () => `
.gjs-db-modal {
  display: flex;
  flex-direction: column;
  gap: var(--gjs-db-gap-3);
  padding: var(--gjs-db-gap-1);
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.83rem;
  line-height: 1.55;
  max-height: 70vh;
  overflow-y: auto;
}
.gjs-db-form {
  display: flex;
  flex-direction: column;
  gap: var(--gjs-db-gap-3);
}
.gjs-db-field {
  display: flex;
  flex-direction: column;
  gap: var(--gjs-db-gap-1);
}
.gjs-db-field-label {
  font-size: 0.7rem;
  font-weight: var(--gjs-db-w-bold);
  color: var(--gjs-db-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.gjs-db-field-input {
  width: 100%;
  padding: 0.55em 0.85em;
  border: none;
  border-radius: var(--gjs-db-r-2);
  background-color: var(--gjs-db-sunken);
  box-shadow: var(--gjs-db-press-1);
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.83rem;
  transition: box-shadow var(--gjs-db-dur-2) var(--gjs-db-ease-soft);
}
.gjs-db-field-input::placeholder {
  color: var(--gjs-db-faint);
}
.gjs-db-field-input:focus,
.gjs-db-field-input:focus-visible {
  outline: none;
  box-shadow: var(--gjs-db-press-1), 0 0 0 2px var(--gjs-db-focus);
}
textarea.gjs-db-field-input {
  resize: vertical;
  min-height: 4.5rem;
  line-height: 1.6;
}
select.gjs-db-field-input {
  cursor: pointer;
}
select.gjs-db-field-input option {
  background-color: var(--gjs-db-panel);
  color: var(--gjs-db-fg);
}
input[type='checkbox'].gjs-db-field-input {
  width: 1.05rem;
  height: 1.05rem;
  padding: 0;
  box-shadow: none;
  accent-color: var(--gjs-db-fg);
  cursor: pointer;
}
.gjs-db-field-help {
  font-size: 0.72rem;
  color: var(--gjs-db-faint);
  line-height: 1.5;
}
.gjs-db-grid-two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gjs-db-gap-3);
}
.gjs-db-section-title {
  font-size: 0.9rem;
  font-weight: var(--gjs-db-w-bold);
  color: var(--gjs-db-fg);
  margin-top: var(--gjs-db-gap-2);
  padding-bottom: var(--gjs-db-gap-1);
  border-bottom: 1px solid var(--gjs-db-line);
}
.gjs-db-section-title:first-child {
  margin-top: 0;
}
.gjs-db-muted {
  color: var(--gjs-db-faint);
  font-size: 0.78rem;
}
`;

export default buildPrimitiveModalFormCss;
