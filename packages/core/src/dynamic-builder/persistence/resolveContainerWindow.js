const resolveContainerWindow = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  const ownerDocument = containerElement && containerElement.ownerDocument;
  return (ownerDocument && ownerDocument.defaultView) || (typeof window !== 'undefined' ? window : null);
};

export default resolveContainerWindow;
