const resolveModalDialogElement = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.querySelector) return null;
  return containerElement.querySelector('.gjs-mdl-container .gjs-mdl-dialog');
};

export default resolveModalDialogElement;
