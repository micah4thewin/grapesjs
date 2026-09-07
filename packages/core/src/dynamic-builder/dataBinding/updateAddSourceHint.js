import toCamelCaseName from './toCamelCaseName.js';

const updateAddSourceHint = (formElement) => {
  const nameInput = formElement.querySelector('[data-db-source-add-name]');
  const hintElement = formElement.querySelector('[data-db-source-add-hint]');
  const errorElement = formElement.querySelector('[data-db-source-add-error]');
  if (!nameInput || !hintElement) return;
  const cleanName = toCamelCaseName(nameInput.value);
  hintElement.textContent = cleanName
    ? `Will be saved as: ${cleanName}`
    : 'Type a name and press Enter. Letters and numbers only; spaces are removed.';
  if (errorElement) {
    errorElement.hidden = true;
    errorElement.textContent = '';
  }
  nameInput.classList.remove('gjs-db-trait-invalid');
  nameInput.removeAttribute('aria-invalid');
};

export default updateAddSourceHint;
