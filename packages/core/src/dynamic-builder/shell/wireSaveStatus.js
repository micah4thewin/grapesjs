import formatStatusTimeText from './formatStatusTimeText.js';

const wireSaveStatus = (editor, stripElement) => {
  const statusElement = stripElement.querySelector('[data-db-save-status]');
  if (!statusElement) return;
  editor.on('db:save-status', (statusPayload) => {
    const payloadRecord = statusPayload || {};
    const statusState = payloadRecord.state || 'idle';
    const timeText = formatStatusTimeText(payloadRecord.at);
    const stateTexts = {
      saving: 'Saving\u2026',
      saved: `Saved ${timeText}`,
      error: `Error ${timeText}`,
    };
    statusElement.setAttribute('data-db-state', statusState);
    statusElement.textContent = stateTexts[statusState] || 'Ready';
    statusElement.title = payloadRecord.message || '';
  });
};

export default wireSaveStatus;
