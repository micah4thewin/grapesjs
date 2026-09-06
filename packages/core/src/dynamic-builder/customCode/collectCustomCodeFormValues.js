const collectCustomCodeFormValues = (formElement, codeSurfaces) => {
  const readCodeSlot = (slotName) => (codeSurfaces[slotName] ? codeSurfaces[slotName].getValue() : '');
  const allowScriptsElement = formElement.querySelector('[data-db-allow-scripts]');
  const originsElement = formElement.querySelector('[data-db-script-origins]');
  return {
    headHtml: readCodeSlot('headHtml'),
    bodyStartHtml: readCodeSlot('bodyStartHtml'),
    bodyEndHtml: readCodeSlot('bodyEndHtml'),
    allowScripts: !!(allowScriptsElement && allowScriptsElement.checked),
    scriptOriginAllowlistText: originsElement ? originsElement.value : '',
  };
};

export default collectCustomCodeFormValues;
