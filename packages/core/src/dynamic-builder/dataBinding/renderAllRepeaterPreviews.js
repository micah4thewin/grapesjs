import renderRepeaterPreview from './renderRepeaterPreview.js';

const renderAllRepeaterPreviews = (editor) => {
  const wrapperComponent = editor.DomComponents && editor.DomComponents.getWrapper && editor.DomComponents.getWrapper();
  if (!wrapperComponent || !wrapperComponent.findType) return;
  wrapperComponent
    .findType('db-repeater')
    .forEach((repeaterComponent) => renderRepeaterPreview(editor, repeaterComponent));
};

export default renderAllRepeaterPreviews;
