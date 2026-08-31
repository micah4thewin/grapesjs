const buildInputFieldsCss = () => `
.gjs-field {
  background-color: var(--gjs-db-sunken);
  box-shadow: var(--gjs-db-press-1);
  border: none;
  border-radius: var(--gjs-db-r-2);
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.78rem;
  transition: box-shadow var(--gjs-db-dur-2) var(--gjs-db-ease-soft);
}
.gjs-field:focus-within {
  box-shadow: var(--gjs-db-press-1), 0 0 0 2px var(--gjs-db-focus);
}
.gjs-field input,
.gjs-field select,
.gjs-field textarea {
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
}
.gjs-field input::placeholder,
.gjs-field textarea::placeholder {
  color: var(--gjs-db-faint);
}
.gjs-field input:focus,
.gjs-field select:focus,
.gjs-field textarea:focus {
  outline: none;
}
.gjs-select option,
.gjs-field-select option,
.gjs-clm-select option,
.gjs-sm-select option,
.gjs-fields option,
.gjs-sm-unit option {
  background-color: var(--gjs-db-panel);
  color: var(--gjs-db-fg);
}
.gjs-label {
  color: var(--gjs-db-muted);
}
.gjs-field .gjs-sel-arrow,
.gjs-field .gjs-d-s-arrow,
.gjs-sm-field .gjs-sm-sel-arrow,
.gjs-sm-field .gjs-sm-d-s-arrow {
  color: var(--gjs-db-muted);
}
.gjs-field-arrow-u {
  border-bottom-color: var(--gjs-db-muted);
}
.gjs-field-arrow-d {
  border-top-color: var(--gjs-db-muted);
}
.gjs-field-arrows:hover .gjs-field-arrow-u {
  border-bottom-color: var(--gjs-db-fg);
}
.gjs-field-arrows:hover .gjs-field-arrow-d {
  border-top-color: var(--gjs-db-fg);
}
.gjs-input-unit,
.gjs-field-unit {
  color: var(--gjs-db-muted);
  font-size: 0.7rem;
}
.gjs-field-color-picker {
  border-radius: 0 var(--gjs-db-r-2) var(--gjs-db-r-2) 0;
  box-shadow: var(--gjs-db-lift-1);
}
.gjs-field-colorp {
  border-left: 1px solid var(--gjs-db-line);
}
.gjs-radio-item {
  border: none;
  transition:
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-radio-item:hover {
  background-color: var(--gjs-db-hover);
}
.gjs-radio-item input:checked + .gjs-radio-item-label {
  background-color: var(--gjs-db-active);
  box-shadow: var(--gjs-db-press-1);
  color: var(--gjs-db-fg);
  font-weight: var(--gjs-db-w-bold);
}
.gjs-radio-item-label {
  color: var(--gjs-db-muted);
  cursor: pointer;
  border-radius: var(--gjs-db-r-1);
}
.gjs-field-checkbox input {
  accent-color: var(--gjs-db-fg);
  cursor: pointer;
}
.gjs-field input[type='range'] {
  accent-color: var(--gjs-db-fg);
}
`;

export default buildInputFieldsCss;
