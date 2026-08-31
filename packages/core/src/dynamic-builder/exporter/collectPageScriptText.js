const collectPageScriptText = (editor, page) => {
  const mainComponent = page && page.getMainComponent ? page.getMainComponent() : null;
  if (!mainComponent) return '';
  return String(editor.getJs({ component: mainComponent }) || '').trim();
};

export default collectPageScriptText;
