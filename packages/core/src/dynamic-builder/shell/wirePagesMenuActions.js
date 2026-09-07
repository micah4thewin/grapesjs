import runPagesMenuAction from './runPagesMenuAction.js';
import wirePagesMenuRowKeys from './wirePagesMenuRowKeys.js';

const wirePagesMenuActions = (editor, stripElement) => {
  stripElement.addEventListener('click', (clickEvent) => {
    const targetElement = clickEvent.target;
    if (!targetElement || !targetElement.closest) return;
    const actionElement = targetElement.closest('[data-db-page-action]');
    if (!actionElement || !stripElement.contains(actionElement)) return;
    const actionName = actionElement.getAttribute('data-db-page-action');
    const pageId = actionElement.getAttribute('data-db-page-id') || '';
    runPagesMenuAction(editor, actionName, pageId);
  });
  wirePagesMenuRowKeys(editor, stripElement);
};

export default wirePagesMenuActions;
