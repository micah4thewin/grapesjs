import captureRichTextSelection from './captureRichTextSelection.js';
import insertTokenIntoRichText from './insertTokenIntoRichText.js';
import openFieldPickerModal from './openFieldPickerModal.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildInsertFieldRteAction = (editor) => ({
  name: 'db-insert-field',
  icon: getIconMarkup('dataBinding', { size: 16 }),
  attributes: { title: 'Insert a data field', 'aria-label': 'Insert a data field' },
  result: (richTextEditor) => {
    const savedRange = captureRichTextSelection(richTextEditor);
    openFieldPickerModal(editor, editor.getSelected(), (tokenText) =>
      setTimeout(() => insertTokenIntoRichText(richTextEditor, savedRange, tokenText), 30),
    );
  },
});

export default buildInsertFieldRteAction;
