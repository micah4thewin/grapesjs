const wireCustomCodeScriptNotices = (formElement, codeSurfaces) => {
  const allowScriptsElement = formElement.querySelector('[data-db-allow-scripts]');
  const originsElement = formElement.querySelector('[data-db-script-origins]');
  const refreshNotices = () => {
    const allowScripts = !!(allowScriptsElement && allowScriptsElement.checked);
    if (originsElement) originsElement.disabled = !allowScripts;
    formElement.querySelectorAll('[data-db-script-note]').forEach((noteElement) => {
      const slotName = noteElement.getAttribute('data-db-script-note');
      const slotValue = codeSurfaces[slotName] ? codeSurfaces[slotName].getValue() : '';
      noteElement.hidden = allowScripts || !/<script\b/i.test(slotValue);
    });
  };
  if (allowScriptsElement) allowScriptsElement.addEventListener('change', refreshNotices);
  refreshNotices();
  return refreshNotices;
};

export default wireCustomCodeScriptNotices;
