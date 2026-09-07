const attachRepeaterPreviewNode = (editor, hostElement, previewElement, templateComponent, itemNumber) => {
  previewElement.setAttribute('data-db-repeater-preview', 'true');
  previewElement.setAttribute('title', `Preview of item ${itemNumber}. Edit the first card to change every item.`);
  previewElement.addEventListener('click', (clickEvent) => {
    clickEvent.preventDefault();
    clickEvent.stopPropagation();
    if (templateComponent && editor.select) editor.select(templateComponent);
  });
  hostElement.appendChild(previewElement);
};

export default attachRepeaterPreviewNode;
