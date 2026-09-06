import formatStatusTimeText from './formatStatusTimeText.js';

const wireSaveStatus = (editor, stripElement) => {
  const statusElement = stripElement.querySelector('[data-db-save-status]');
  const announcerElement = stripElement.querySelector('[data-db-save-announcer]');
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
    const statusText = stateTexts[statusState] || 'Ready';
    statusElement.setAttribute('data-db-state', statusState);
    statusElement.textContent = statusText;
    statusElement.title = payloadRecord.message || '';
    if (!announcerElement) return;
    if (statusState !== 'error' || payloadRecord.repeated === true) return;
    announcerElement.textContent = payloadRecord.message ? 'Save failed: ' + payloadRecord.message : 'Save failed';
  });
};

export default wireSaveStatus;
