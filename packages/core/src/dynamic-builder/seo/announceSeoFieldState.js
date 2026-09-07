const announceSeoFieldState = (rootElement, fieldKey, messageText) => {
  const announcerElement = rootElement.querySelector('[data-db-seo-announcer]');
  if (!announcerElement) return;
  const labelElement = rootElement.querySelector('label[for="gjs-db-seo-' + fieldKey + '"]');
  const labelText = labelElement ? String(labelElement.textContent || '').trim() : fieldKey;
  announcerElement.textContent = labelText + ': ' + messageText;
};

export default announceSeoFieldState;
