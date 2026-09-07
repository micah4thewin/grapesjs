import resolveLabelOwnerRecord from './resolveLabelOwnerRecord.js';

const watchFieldLabelEdits = (editor) => {
  editor.on('rte:disable', (textView) => {
    const labelComponent = textView && textView.model;
    if (!labelComponent || !labelComponent.is || !labelComponent.is('db-field-label')) return;
    const ownerRecord = resolveLabelOwnerRecord(labelComponent);
    if (!ownerRecord || !ownerRecord.ownerComponent) return;
    const editedText = String((textView.el && textView.el.textContent) || '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!editedText) return;
    const ownerAttributes = ownerRecord.ownerComponent.getAttributes();
    if (ownerAttributes[ownerRecord.attributeName] === editedText) return;
    ownerRecord.ownerComponent.addAttributes({ [ownerRecord.attributeName]: editedText });
  });
};

export default watchFieldLabelEdits;
