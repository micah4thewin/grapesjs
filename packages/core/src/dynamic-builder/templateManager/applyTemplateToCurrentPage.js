import openConfirmModal from '../shell/openConfirmModal.js';
import replacePageWithTemplate from './replacePageWithTemplate.js';

const applyTemplateToCurrentPage = (editor, templateRecord) => {
  if (!editor.getWrapper().components().length) return replacePageWithTemplate(editor, templateRecord);
  openConfirmModal(
    editor,
    'Replace this page?',
    'Everything on this page will be swapped for the ' +
      templateRecord.name +
      ' template. Press Ctrl+Z afterwards if you change your mind.',
    'Replace the page',
    () => replacePageWithTemplate(editor, templateRecord),
  );
  return null;
};

export default applyTemplateToCurrentPage;
