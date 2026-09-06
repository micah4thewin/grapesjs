import attachFlowBuilderHandlers from './attachFlowBuilderHandlers.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildFlowBuilderMarkup from './buildFlowBuilderMarkup.js';
import createModalHostElement from '../support/createModalHostElement.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';
import readComponentFlows from './readComponentFlows.js';
import resolveComponentLabel from './resolveComponentLabel.js';
import showToastNotice from '../support/showToastNotice.js';
import writeComponentFlows from './writeComponentFlows.js';

const resolveAllowScripts = (editor) => {
  const customCodeRecord = getSiteMetaRecord(editor).customCode;
  return isPlainRecord(customCodeRecord) && customCodeRecord.allowScripts === true;
};

const openFlowBuilderModal = (editor, targetComponent) => {
  const component = targetComponent || (editor.getSelected && editor.getSelected());
  if (!component) {
    showToastNotice(editor, 'Select something on the page first.', { kind: 'warning' });
    return;
  }
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const ownerDocument = containerElement.ownerDocument;
  const componentLabel = resolveComponentLabel(component);
  const allowScripts = resolveAllowScripts(editor);
  const modalHost = createModalHostElement(editor, 'Interactions', { className: 'gjs-db-flow-modal' });
  if (!modalHost) return;
  const renderBuilder = (flowRecords) => {
    const formElement = buildElementFromMarkup(
      ownerDocument,
      buildFlowBuilderMarkup(flowRecords, componentLabel, allowScripts),
    );
    if (!formElement) return;
    formElement.addEventListener('submit', (submitEvent) => submitEvent.preventDefault());
    attachFlowBuilderHandlers(formElement, {
      onRerender: (nextFlows) => renderBuilder(nextFlows),
      onSave: (nextFlows) => {
        writeComponentFlows(component, nextFlows);
        editor.Modal.close();
        editor.trigger('db:flows:update', { component, flows: nextFlows });
        showToastNotice(editor, nextFlows.length ? 'Flows saved.' : 'Flows cleared.', { kind: 'success' });
      },
    });
    modalHost.render(formElement);
  };
  renderBuilder(readComponentFlows(component));
};

export default openFlowBuilderModal;
