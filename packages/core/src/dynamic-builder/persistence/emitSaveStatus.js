const emitSaveStatus = (editor, statusState, statusMessage, statusOptions = {}) =>
  editor.trigger('db:save-status', {
    state: statusState,
    message: statusMessage || '',
    repeated: statusOptions.repeated === true,
    at: new Date().toISOString(),
  });

export default emitSaveStatus;
