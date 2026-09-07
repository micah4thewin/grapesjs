const buildFormStepsCss = () => `
.db-form-step {
  display: grid;
  gap: var(--db-space-4, 1rem);
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
}
.db-form-step[hidden] {
  display: none;
}
.db-form-step > legend.db-form-step-title {
  padding: 0;
  margin-bottom: var(--db-space-2, 0.5rem);
  font-size: var(--db-type-lg, 1.15rem);
  font-weight: 700;
}
.db-form-steps-nav {
  display: grid;
  gap: var(--db-space-2, 0.5rem);
}
.db-form-progress {
  height: 0.5rem;
  border-radius: 999px;
  background: var(--db-color-line, #dfe3ea);
  overflow: hidden;
}
.db-form-progress-bar {
  display: block;
  height: 100%;
  width: 0;
  border-radius: 999px;
  background: var(--db-color-brand, #4f46e5);
  transition: width 0.3s ease;
}
.db-form-progress-text {
  margin: 0;
  font-size: var(--db-type-xs, 0.8rem);
  opacity: 0.78;
}
.db-form-step-buttons {
  display: flex;
  justify-content: space-between;
  gap: var(--db-space-3, 0.75rem);
}
.db-form-step-buttons > [hidden] {
  display: none;
}
.db-form-step-buttons > [data-db-step-next] {
  margin-left: auto;
}
.db-form[data-db-steps-ready]:not([data-db-step-last='true']) .db-submit-button {
  display: none;
}
`;

export default buildFormStepsCss;
