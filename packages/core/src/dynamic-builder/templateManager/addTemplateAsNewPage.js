import cloneTemplateContent from './cloneTemplateContent.js';
import openPageNameModal from '../shell/openPageNameModal.js';
import resolveUniquePageName from '../shell/resolveUniquePageName.js';
import showToastNotice from '../support/showToastNotice.js';
import validatePageName from '../shell/validatePageName.js';

const addTemplateAsNewPage = (editor, templateRecord) => {
  openPageNameModal(editor, {
    modalTitle: 'Add a page from the ' + templateRecord.name + ' template',
    initialValue: resolveUniquePageName(editor, templateRecord.name),
    submitLabel: 'Add page',
    validateName: (pageName) => validatePageName(editor, pageName, ''),
    onSubmitName: (pageName) => {
      const addedPage = editor.Pages.add(
        { name: pageName, component: cloneTemplateContent(templateRecord) },
        { select: true },
      );
      if (!addedPage) return;
      editor.trigger('db:page:added', { page: addedPage });
      showToastNotice(editor, 'Added the page "' + pageName + '" from the ' + templateRecord.name + ' template.', {
        kind: 'success',
      });
    },
  });
};

export default addTemplateAsNewPage;
