import showToastNotice from '../support/showToastNotice.js';

const showSymbolLockedHint = (editor) => {
  const editorModel = editor.getModel();
  if (editorModel.get('dbSymbolHintShown')) return;
  editorModel.set('dbSymbolHintShown', true);
  showToastNotice(
    editor,
    'Click a text or image to change it on this page only. Double-click or use Edit everywhere to change every copy.',
    { duration: 6500 },
  );
};

export default showSymbolLockedHint;
