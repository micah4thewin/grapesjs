const buildModalFieldRefinementsCss = () => `
input[type='color'].gjs-db-field-input {
  height: 2.3rem;
  padding: 4px 6px;
  cursor: pointer;
}
textarea.gjs-db-field-input {
  font-family: var(--gjs-db-font-mono);
  font-size: 0.76rem;
}
[data-db-source-entry] > .gjs-db-grid-two {
  grid-template-columns: 1fr auto;
  align-items: center;
}
[data-db-source-entry] .gjs-db-button-danger {
  padding: 0.35em 0.9em;
  font-size: 0.74rem;
}
`;

export default buildModalFieldRefinementsCss;
