const openThemedModal = (editor, modalTitle, modalContent, options = {}) => {
  const modalClassName = ['gjs-db-modal', options.className || ''].join(' ').trim();
  editor.Modal.open({
    title: modalTitle,
    content: modalContent,
    attributes: { class: modalClassName },
  });
  return editor.Modal;
};

export default openThemedModal;
