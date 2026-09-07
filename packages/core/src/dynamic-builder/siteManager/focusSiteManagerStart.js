import isEditorLive from '../support/isEditorLive.js';

const focusSiteManagerStart = (editor, rootElement) => {
  if (!isEditorLive(editor)) return null;
  const openButton = rootElement.querySelector('[data-db-site-action="open"]');
  const targetElement = openButton || rootElement.querySelector('[name="siteName"]');
  if (targetElement && typeof targetElement.focus === 'function') targetElement.focus();
  return targetElement;
};

export default focusSiteManagerStart;
