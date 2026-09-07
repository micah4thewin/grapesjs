const removeRepeaterPreviewNodes = (hostElement) => {
  if (!hostElement || !hostElement.children) return;
  Array.from(hostElement.children)
    .filter((childElement) => childElement.hasAttribute('data-db-repeater-preview'))
    .forEach((previewElement) => previewElement.remove());
};

export default removeRepeaterPreviewNodes;
