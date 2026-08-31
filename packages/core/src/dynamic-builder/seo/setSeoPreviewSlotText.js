const setSeoPreviewSlotText = (rootElement, slotName, textValue) => {
  const slotElement = rootElement.querySelector('[data-db-seo-preview="' + slotName + '"]');
  if (slotElement) slotElement.textContent = textValue;
};

export default setSeoPreviewSlotText;
