import getSaveStatusTexts from './getSaveStatusTexts.js';

const wireSaveStatus = (editor, stripElement) => {
  const statusElement = stripElement.querySelector('[data-db-save-status]');
  const announcerElement = stripElement.querySelector('[data-db-save-announcer]');
  if (!statusElement) return;
  const textElement = statusElement.querySelector('[data-db-save-status-text]') || statusElement;
  let currentState = 'idle';
  let savedAtIso = '';
  let errorMessage = '';
  const renderStatus = () => {
    const statusTexts = getSaveStatusTexts(currentState, savedAtIso, errorMessage);
    statusElement.setAttribute('data-db-state', currentState);
    textElement.textContent = statusTexts.label;
    statusElement.title = statusTexts.title;
    statusElement.setAttribute('aria-label', `${statusTexts.label}. ${statusTexts.title}`);
  };
  editor.on('db:save-status', (statusPayload) => {
    const payloadRecord = statusPayload || {};
    currentState = payloadRecord.state || 'idle';
    if (currentState === 'saved') savedAtIso = payloadRecord.at || new Date().toISOString();
    errorMessage = currentState === 'error' ? payloadRecord.message || '' : '';
    renderStatus();
    if (!announcerElement || currentState !== 'error' || payloadRecord.repeated === true) return;
    announcerElement.textContent = errorMessage ? `Save failed: ${errorMessage}` : 'Save failed';
  });
  editor.on('update', () => {
    if (currentState === 'saving' || currentState === 'dirty') return;
    currentState = 'dirty';
    renderStatus();
  });
  const refreshTimer = setInterval(() => currentState === 'saved' && renderStatus(), 30000);
  editor.on('destroy', () => clearInterval(refreshTimer));
  renderStatus();
};

export default wireSaveStatus;
