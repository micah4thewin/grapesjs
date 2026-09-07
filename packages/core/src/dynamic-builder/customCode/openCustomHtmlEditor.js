import openCodeEditorModal from '../codeEditor/openCodeEditorModal.js';

const openCustomHtmlEditor = (editor, component) => {
  if (!component || typeof component.get !== 'function' || component.get('type') !== 'db-custom-html') return;
  const codeTrait = (component.get('traits') || []).find((traitModel) => traitModel.get('name') === 'htmlCode');
  openCodeEditorModal(editor, {
    title: 'HTML code',
    label: 'HTML code',
    language: 'html',
    value: String(component.getAttributes().htmlCode || ''),
    helpText: codeTrait ? String(codeTrait.get('helpText') || '') : '',
    onSubmit: (codeText) => component.addAttributes({ htmlCode: codeText }),
  });
};

export default openCustomHtmlEditor;
