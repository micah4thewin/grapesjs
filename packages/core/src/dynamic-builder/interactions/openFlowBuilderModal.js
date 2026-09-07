import attachFlowBuilderHandlers from './attachFlowBuilderHandlers.js';
import attachFlowTargetHints from './attachFlowTargetHints.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildFlowBuilderMarkup from './buildFlowBuilderMarkup.js';
import createModalHostElement from '../support/createModalHostElement.js';
import guardModalDismiss from '../codeEditor/guardModalDismiss.js';
import pickFlowTargetOnCanvas from './pickFlowTargetOnCanvas.js';
import readComponentFlows from './readComponentFlows.js';
import resolveAllowScripts from './resolveAllowScripts.js';
import resolveComponentLabel from './resolveComponentLabel.js';
import showToastNotice from '../support/showToastNotice.js';
import testFlowOnCanvas from './testFlowOnCanvas.js';
import writeComponentFlows from './writeComponentFlows.js';

const openFlowBuilderModal = (editor, targetComponent, openOptions = {}) => {
  const component = targetComponent || (editor.getSelected && editor.getSelected());
  if (!component) {
    showToastNotice(editor, 'Select something on the page first.', { kind: 'warning' });
    return;
  }
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const ownerDocument = containerElement.ownerDocument;
  const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
  const componentLabel = resolveComponentLabel(component);
  const allowScripts = resolveAllowScripts(editor);
  const modalHost = createModalHostElement(editor, 'Interactions', { className: 'gjs-db-flow-modal' });
  if (!modalHost) return;
  let isDirty = !!openOptions.flows;
  let discardArmed = false;
  const releaseGuard = guardModalDismiss(
    editor,
    () => isDirty,
    () => {
      discardArmed = true;
      const cancelButton = modalHost.hostElement.querySelector('[data-db-flow-action="cancel"]');
      if (cancelButton) cancelButton.textContent = 'Discard changes';
      showToastNotice(editor, 'You have unsaved flows. Save them, or press Discard changes.', { kind: 'warning' });
    },
  );
  const closeBuilder = () => {
    releaseGuard();
    editor.Modal.close();
  };
  const saveFlows = (nextFlows) => {
    writeComponentFlows(component, nextFlows);
    isDirty = false;
    editor.trigger('db:flows:update', { component, flows: nextFlows });
  };
  const renderBuilder = (flowRecords, renderOptions = {}) => {
    const formElement = buildElementFromMarkup(
      ownerDocument,
      buildFlowBuilderMarkup(flowRecords, componentLabel, allowScripts),
    );
    if (!formElement) return;
    formElement.addEventListener('submit', (submitEvent) => submitEvent.preventDefault());
    attachFlowBuilderHandlers(formElement, {
      onDirty: () => {
        isDirty = true;
      },
      onRerender: (nextFlows, focusSelector) => renderBuilder(nextFlows, { focusSelector }),
      onSave: (nextFlows) => {
        saveFlows(nextFlows);
        closeBuilder();
        showToastNotice(editor, nextFlows.length ? 'Flows saved.' : 'Flows cleared.', { kind: 'success' });
      },
      onCancel: () => {
        if (isDirty && !discardArmed) {
          discardArmed = true;
          formElement.querySelector('[data-db-flow-action="cancel"]').textContent = 'Discard changes';
          showToastNotice(editor, 'Press Discard changes again to close without saving.', { kind: 'warning' });
          return;
        }
        isDirty = false;
        closeBuilder();
      },
      onTest: (nextFlows, flowIndex) => {
        saveFlows(nextFlows);
        closeBuilder();
        if (nextFlows[flowIndex]) testFlowOnCanvas(editor, component, nextFlows[flowIndex]);
      },
      onPick: (nextFlows, fieldRecord) => {
        releaseGuard();
        pickFlowTargetOnCanvas(editor, {
          component,
          flows: nextFlows,
          fieldScope: fieldRecord.fieldScope,
          fieldName: fieldRecord.fieldName,
          reopen: (pickedFlows, reopenOptions) =>
            openFlowBuilderModal(editor, component, { flows: pickedFlows, ...reopenOptions }),
        });
      },
    });
    attachFlowTargetHints(formElement, canvasDocument);
    modalHost.render(formElement);
    const focusTarget = renderOptions.focusSelector && formElement.querySelector(renderOptions.focusSelector);
    if (focusTarget && focusTarget.focus) focusTarget.focus();
  };
  renderBuilder(openOptions.flows || readComponentFlows(component), { focusSelector: openOptions.focusSelector });
};

export default openFlowBuilderModal;
