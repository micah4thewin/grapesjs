import appendAccordionItem from './appendAccordionItem.js';
import buildAccordionRowsMarkup from './buildAccordionRowsMarkup.js';
import createInteractiveListTraitDefinition from './createInteractiveListTraitDefinition.js';
import moveChildComponentAt from './moveChildComponentAt.js';
import readAccordionItemRecords from './readAccordionItemRecords.js';
import writeComponentTextContent from './writeComponentTextContent.js';

const createAccordionItemsTraitDefinition = (editor, interactiveTextDefaults) =>
  createInteractiveListTraitDefinition(editor, {
    title: 'Questions',
    addLabel: 'Add question',
    buildRowsMarkup: (component) => buildAccordionRowsMarkup(component),
    handleField: (component, rowIndex, fieldName, fieldElement) => {
      const itemRecord = readAccordionItemRecords(component)[rowIndex];
      if (!itemRecord) return false;
      if (fieldName === 'label') writeComponentTextContent(itemRecord.titleComponent, fieldElement.value);
      if (fieldName === 'open') {
        itemRecord.itemComponent.addAttributes({ 'data-db-open': fieldElement.checked ? 'true' : 'false' });
      }
      return false;
    },
    handleAdd: (component) => appendAccordionItem(component, interactiveTextDefaults),
    handleRemove: (component, rowIndex) => {
      const itemRecord = readAccordionItemRecords(component)[rowIndex];
      if (itemRecord) itemRecord.itemComponent.remove();
    },
    handleMove: (component, rowIndex, indexOffset) => {
      const itemRecord = readAccordionItemRecords(component)[rowIndex];
      if (itemRecord) moveChildComponentAt(component, itemRecord.itemComponent.index(), indexOffset);
    },
  });

export default createAccordionItemsTraitDefinition;
