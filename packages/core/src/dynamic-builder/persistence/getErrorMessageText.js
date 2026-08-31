const getErrorMessageText = (errorValue, fallbackMessage) =>
  errorValue && errorValue.message ? String(errorValue.message) : fallbackMessage;

export default getErrorMessageText;
