import getNewPageStarterComponents from './getNewPageStarterComponents.js';
import openPageNameModal from './openPageNameModal.js';
import validatePageName from './validatePageName.js';

const addNewSitePage = (editor) => {
  openPageNameModal(editor, {
    modalTitle: 'Add page',
    initialValue: '',
    submitLabel: 'Add page',
    validateName: (pageName) => validatePageName(editor, pageName, ''),
    onSubmitName: (pageName) => {
      const addedPage = editor.Pages.add(
        { name: pageName, component: getNewPageStarterComponents(pageName) },
        { select: true },
      );
      addedPage && editor.trigger('db:page:added', { page: addedPage });
    },
  });
};

export default addNewSitePage;
