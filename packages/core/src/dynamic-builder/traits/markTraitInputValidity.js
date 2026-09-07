const resolveMessageId = (inputElement) => {
  if (!inputElement.dataset.dbErrorId) {
    inputElement.dataset.dbErrorId = `gjs-db-trait-error-${Math.random().toString(36).slice(2, 9)}`;
  }
  return inputElement.dataset.dbErrorId;
};

const removeMessageElement = (inputElement) => {
  const messageId = inputElement.dataset.dbErrorId;
  const ownerDocument = inputElement.ownerDocument;
  const existingMessage = messageId && ownerDocument ? ownerDocument.getElementById(messageId) : null;
  existingMessage && existingMessage.remove();
  inputElement.removeAttribute('aria-describedby');
};

const upsertMessageElement = (inputElement, messageText) => {
  const messageId = resolveMessageId(inputElement);
  const ownerDocument = inputElement.ownerDocument;
  let messageElement = ownerDocument ? ownerDocument.getElementById(messageId) : null;
  if (!messageElement && ownerDocument && inputElement.parentNode) {
    messageElement = ownerDocument.createElement('p');
    messageElement.id = messageId;
    messageElement.className = 'gjs-db-trait-error';
    messageElement.setAttribute('role', 'alert');
    inputElement.parentNode.insertBefore(messageElement, inputElement.nextSibling);
  }
  if (messageElement) messageElement.textContent = messageText;
  inputElement.setAttribute('aria-describedby', messageId);
};

const markTraitInputValidity = (inputElement, isValidValue, invalidMessageText) => {
  if (!inputElement || !inputElement.classList) return;
  inputElement.classList.toggle('gjs-db-trait-invalid', !isValidValue);
  if (isValidValue) {
    inputElement.removeAttribute('title');
    inputElement.removeAttribute('aria-invalid');
    removeMessageElement(inputElement);
    return;
  }
  inputElement.setAttribute('title', invalidMessageText);
  inputElement.setAttribute('aria-invalid', 'true');
  upsertMessageElement(inputElement, invalidMessageText);
};

export default markTraitInputValidity;
