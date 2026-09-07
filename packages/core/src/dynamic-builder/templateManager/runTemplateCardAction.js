import addTemplateAsNewPage from './addTemplateAsNewPage.js';
import applyTemplateToCurrentPage from './applyTemplateToCurrentPage.js';
import deleteUserTemplate from './deleteUserTemplate.js';
import insertSectionTemplate from './insertSectionTemplate.js';

const runTemplateCardAction = (editor, moduleOptions, templateRecord, actionName, onListChanged) => {
  if (actionName === 'delete') {
    return deleteUserTemplate(editor, moduleOptions, templateRecord, onListChanged);
  }
  editor.Modal.close();
  if (actionName === 'use-page') return applyTemplateToCurrentPage(editor, templateRecord);
  if (actionName === 'add-page') return addTemplateAsNewPage(editor, templateRecord);
  if (actionName === 'insert-after') return insertSectionTemplate(editor, templateRecord, 'after');
  if (actionName === 'insert-end') return insertSectionTemplate(editor, templateRecord, 'end');
  return null;
};

export default runTemplateCardAction;
