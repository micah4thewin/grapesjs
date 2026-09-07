import cloneTemplateContent from './cloneTemplateContent.js';
import markEditorChanged from '../support/markEditorChanged.js';
import selectAndRevealComponent from '../blocks/selectAndRevealComponent.js';
import showToastNotice from '../support/showToastNotice.js';

const replacePageWithTemplate = (editor, templateRecord) => {
  const wrapperComponent = editor.getWrapper();
  wrapperComponent.components(cloneTemplateContent(templateRecord));
  const addedComponents = wrapperComponent.components().models;
  selectAndRevealComponent(editor, addedComponents[0]);
  markEditorChanged(editor, { templateId: templateRecord.templateId });
  showToastNotice(editor, 'This page now uses the ' + templateRecord.name + ' template.', { kind: 'success' });
  return addedComponents;
};

export default replacePageWithTemplate;
