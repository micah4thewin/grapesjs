import buildBreadcrumbFromPages from './buildBreadcrumbFromPages.js';
import buildBreadcrumbRowsMarkup from './buildBreadcrumbRowsMarkup.js';
import createInteractiveListTraitDefinition from './createInteractiveListTraitDefinition.js';
import findChildByTagName from './findChildByTagName.js';
import insertBreadcrumbStep from './insertBreadcrumbStep.js';
import markTraitInputValidity from '../traits/markTraitInputValidity.js';
import moveChildComponentAt from './moveChildComponentAt.js';
import normalizeBreadcrumbTrail from './normalizeBreadcrumbTrail.js';
import readBreadcrumbStepRecords from './readBreadcrumbStepRecords.js';
import removeBreadcrumbStepAt from './removeBreadcrumbStepAt.js';
import resolveComponentPage from './resolveComponentPage.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';
import writeComponentTextContent from './writeComponentTextContent.js';

const detachFromPages = (component) => {
  if ((component.getAttributes() || {})['data-db-auto'] === 'true')
    component.addAttributes({ 'data-db-auto': 'false' });
};

const handleStepField = (component, rowIndex, fieldName, fieldElement) => {
  const stepRecord = readBreadcrumbStepRecords(component)[rowIndex];
  if (!stepRecord) return false;
  if (fieldName === 'label') {
    writeComponentTextContent(stepRecord.labelComponent, fieldElement.value);
    detachFromPages(component);
    return false;
  }
  if (!stepRecord.linkComponent) return false;
  if (fieldName === 'page') {
    stepRecord.linkComponent.addAttributes({ href: fieldElement.value });
    detachFromPages(component);
    return true;
  }
  const rawValue = String(fieldElement.value || '').trim();
  const safeValue = sanitizeUrlValue(rawValue);
  const wasRejected = Boolean(rawValue) && !safeValue;
  markTraitInputValidity(fieldElement, !wasRejected, 'Rejected as unsafe: this link will not be saved');
  if (wasRejected) return false;
  stepRecord.linkComponent.addAttributes({ href: safeValue || '#' });
  detachFromPages(component);
  return false;
};

const createBreadcrumbStepsTraitDefinition = (editor) =>
  createInteractiveListTraitDefinition(editor, {
    title: 'Trail steps',
    helpText: 'The last step is the page visitors are on.',
    addLabel: 'Add trail step',
    extraActions: [{ action: 'pages', label: 'Build from site pages', iconName: 'breadcrumb' }],
    buildRowsMarkup: (component, rowsEditor) => buildBreadcrumbRowsMarkup(component, rowsEditor),
    handleField: handleStepField,
    handleAdd: (component) => {
      insertBreadcrumbStep(component, 'New step', '#');
      detachFromPages(component);
    },
    handleRemove: (component, rowIndex) => {
      removeBreadcrumbStepAt(component, rowIndex);
      detachFromPages(component);
    },
    handleMove: (component, rowIndex, indexOffset) => {
      if (!moveChildComponentAt(findChildByTagName(component, 'ol'), rowIndex, indexOffset)) return;
      normalizeBreadcrumbTrail(component);
      detachFromPages(component);
    },
    handleAction: (component, actionName, actionEditor) => {
      if (actionName !== 'pages') return;
      buildBreadcrumbFromPages(actionEditor, component, resolveComponentPage(actionEditor, component));
    },
  });

export default createBreadcrumbStepsTraitDefinition;
