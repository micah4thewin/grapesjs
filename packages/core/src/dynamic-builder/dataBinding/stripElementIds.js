const stripElementIds = (rootElement) => {
  if (!rootElement || !rootElement.querySelectorAll) return;
  if (rootElement.hasAttribute('id')) rootElement.removeAttribute('id');
  Array.from(rootElement.querySelectorAll('[id]')).forEach((identifiedElement) =>
    identifiedElement.removeAttribute('id'),
  );
};

export default stripElementIds;
