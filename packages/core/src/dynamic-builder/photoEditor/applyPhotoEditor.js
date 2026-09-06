import getPhotoEditorEditorCss from './getPhotoEditorEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openPhotoEditorModal from './openPhotoEditorModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import showToastNotice from '../support/showToastNotice.js';
import wireImageToolbarEditButton from './wireImageToolbarEditButton.js';

const applyPhotoEditor = (editor) => {
  registerCommandSet(editor, {
    'db:open-photo-editor': (commandEditor) => {
      const selectedComponent = commandEditor.getSelected && commandEditor.getSelected();
      const selectedType =
        selectedComponent && selectedComponent.get ? String(selectedComponent.get('type') || '') : '';
      if (selectedType !== 'db-image' && selectedType !== 'image') {
        showToastNotice(commandEditor, 'Select an image on the page, then open the photo editor.', { kind: 'warning' });
        return;
      }
      openPhotoEditorModal(commandEditor, selectedComponent);
    },
  });
  wireImageToolbarEditButton(editor);
  const injectStyles = () => {
    if (!editor.getContainer || !editor.getContainer()) return;
    injectEditorStylesOnce(editor, 'db-css-photo-editor', getPhotoEditorEditorCss());
  };
  injectStyles();
  if (editor.onReady) editor.onReady(() => injectStyles());
};

export default applyPhotoEditor;
