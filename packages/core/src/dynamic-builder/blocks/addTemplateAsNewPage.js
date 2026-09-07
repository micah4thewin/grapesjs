import openPageNameModal from '../shell/openPageNameModal.js';
import showToastNotice from '../support/showToastNotice.js';
import validatePageName from '../shell/validatePageName.js';
import cloneBlockContent from './cloneBlockContent.js';
import resolveUniquePageName from './resolveUniquePageName.js';

const addTemplateAsNewPage = (editor, blockModel) => {
  const templateLabel = String(blockModel.get('label') || 'New page');
  const suggestedName = resolveUniquePageName(editor, templateLabel.replace(/ page$/i, ''));
  openPageNameModal(
    editor,
    'Add page from the ' + templateLabel,
    suggestedName,
    'Add page',
    (pageName) => {
      const addedPage = editor.Pages.add(
        { name: pageName, component: cloneBlockContent(blockModel) },
        { select: true },
      );
      if (!addedPage) return;
      editor.trigger('db:page:added', { page: addedPage });
      showToastNotice(editor, 'Added the page "' + pageName + '" from the ' + templateLabel + '.', { kind: 'success' });
    },
    (pageName) => validatePageName(editor, pageName, ''),
  );
};

export default addTemplateAsNewPage;
