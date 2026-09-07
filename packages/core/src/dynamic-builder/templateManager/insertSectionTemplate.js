import cloneTemplateContent from './cloneTemplateContent.js';
import markEditorChanged from '../support/markEditorChanged.js';
import resolvePageLevelComponent from './resolvePageLevelComponent.js';
import selectAndRevealComponent from '../blocks/selectAndRevealComponent.js';
import showToastNotice from '../support/showToastNotice.js';

const insertSectionTemplate = (editor, templateRecord, placementName) => {
  const wrapperComponent = editor.getWrapper();
  const anchorComponent = placementName === 'after' ? resolvePageLevelComponent(editor) : null;
  const insertIndex = anchorComponent ? anchorComponent.index() + 1 : wrapperComponent.components().length;
  const addedComponents = wrapperComponent.append(cloneTemplateContent(templateRecord), { at: insertIndex });
  selectAndRevealComponent(editor, addedComponents[0]);
  markEditorChanged(editor, { templateId: templateRecord.templateId });
  const placementText =
    placementName === 'after' && !anchorComponent
      ? ' at the end of the page, because nothing was selected'
      : placementName === 'after'
        ? ' after your selection'
        : ' at the end of the page';
  showToastNotice(editor, 'Added the ' + templateRecord.name + ' section' + placementText + '.', { kind: 'success' });
  return addedComponents;
};

export default insertSectionTemplate;
