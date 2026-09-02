import getNewPageStarterComponents from './getNewPageStarterComponents.js';
import openPageNameModal from './openPageNameModal.js';
import validatePageName from './validatePageName.js';

const addNewSitePage = (editor) => {
  openPageNameModal(
    editor,
    'Add page',
    '',
    'Add page',
    (pageName) => {
      const addedPage = editor.Pages.add(
        { name: pageName, component: getNewPageStarterComponents(pageName) },
        { select: true },
      );
      addedPage && editor.trigger('db:page:added', { page: addedPage });
    },
    (pageName) => validatePageName(editor, pageName, ''),
  );
};

export default addNewSitePage;
