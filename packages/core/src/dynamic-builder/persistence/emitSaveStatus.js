const emitSaveStatus = (editor, statusState, statusMessage) =>
  editor.trigger('db:save-status', {
    state: statusState,
    message: statusMessage || '',
    at: new Date().toISOString(),
  });

export default emitSaveStatus;
