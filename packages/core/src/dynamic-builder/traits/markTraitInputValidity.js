const markTraitInputValidity = (inputElement, isValidValue, invalidTitleText) => {
  if (!inputElement || !inputElement.classList) return;
  inputElement.classList.toggle('gjs-db-trait-invalid', !isValidValue);
  if (isValidValue) inputElement.removeAttribute('title');
  else inputElement.setAttribute('title', invalidTitleText);
};

export default markTraitInputValidity;
