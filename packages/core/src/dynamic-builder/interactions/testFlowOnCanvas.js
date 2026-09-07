import describeFlowPreviewWarnings from './describeFlowPreviewWarnings.js';
import resolveAllowScripts from './resolveAllowScripts.js';
import showToastNotice from '../support/showToastNotice.js';

const testFlowOnCanvas = (editor, component, flowRecord) => {
  const previewActive = editor.Commands && editor.Commands.isActive('core:preview');
  if (!previewActive) editor.runCommand('core:preview');
  showToastNotice(editor, 'Testing in preview. Press the preview button again to go back to editing.', {
    duration: 5000,
  });
  setTimeout(() => {
    const canvasWindow = editor.Canvas && editor.Canvas.getWindow && editor.Canvas.getWindow();
    const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
    const runtime = canvasWindow && canvasWindow.dbFlows;
    const targetElement = component && component.getEl && component.getEl();
    if (!runtime || typeof runtime.runFlow !== 'function' || !targetElement) {
      showToastNotice(editor, 'The flow could not be started on the canvas.', { kind: 'warning' });
      return;
    }
    const warnings = describeFlowPreviewWarnings(canvasDocument, [flowRecord], resolveAllowScripts(editor));
    warnings.forEach((warningText) => showToastNotice(editor, warningText, { kind: 'warning', duration: 6000 }));
    runtime.runFlow(flowRecord, targetElement, null).then((context) => {
      const ranCount = context && context.ranCount ? context.ranCount : 0;
      const totalCount = flowRecord.actions.length;
      const summaryText =
        ranCount === totalCount
          ? 'Ran all ' + totalCount + (totalCount === 1 ? ' step.' : ' steps.')
          : 'Ran ' + ranCount + ' of ' + totalCount + ' steps; the rest were skipped after a cancelled dialog.';
      showToastNotice(editor, summaryText, { kind: 'success' });
    });
  }, 700);
};

export default testFlowOnCanvas;
