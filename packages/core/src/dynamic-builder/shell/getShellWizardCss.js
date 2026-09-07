const getShellWizardCss = () => `
.gjs-db-wizard-fieldset {
  margin: 0;
  padding: 0;
  border: none;
  min-width: 0;
}
.gjs-db-wizard-fieldset legend {
  padding: 0;
  margin-bottom: var(--gjs-db-gap-1);
}
.gjs-db-wizard-choice {
  display: flex;
  align-items: center;
  gap: var(--gjs-db-gap-2);
  min-height: 32px;
  font-size: 0.83rem;
  cursor: pointer;
}
.gjs-db-wizard-choice input[type='checkbox'].gjs-db-field-input {
  width: 1.05rem;
  height: 1.05rem;
  margin: 0;
}
.gjs-db-site-wizard-modal .gjs-mdl-dialog {
  max-width: 520px;
}
`;

export default getShellWizardCss;
