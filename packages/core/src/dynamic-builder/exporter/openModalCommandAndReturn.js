const openModalCommandAndReturn = (editor, commandId, reopenModal) => {
  const handleModalClose = () => setTimeout(reopenModal, 0);
  editor.once('modal:close', handleModalClose);
  editor.runCommand(commandId);
  const modalModule = editor.Modal;
  const modalIsOpen = !!modalModule && typeof modalModule.isOpen === 'function' && modalModule.isOpen();
  if (!modalIsOpen) editor.off('modal:close', handleModalClose);
  return modalIsOpen;
};

export default openModalCommandAndReturn;
