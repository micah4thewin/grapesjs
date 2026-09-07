import appendTabPair from './appendTabPair.js';
import applyDefaultTabSelection from './applyDefaultTabSelection.js';
import buildTabRowsMarkup from './buildTabRowsMarkup.js';
import createInteractiveListTraitDefinition from './createInteractiveListTraitDefinition.js';
import moveTabPairAt from './moveTabPairAt.js';
import readTabPairRecords from './readTabPairRecords.js';
import removeTabPairAt from './removeTabPairAt.js';
import writeComponentTextContent from './writeComponentTextContent.js';

const createTabItemsTraitDefinition = (editor, interactiveTextDefaults) =>
  createInteractiveListTraitDefinition(editor, {
    title: 'Tabs',
    addLabel: 'Add tab',
    buildRowsMarkup: (component) => buildTabRowsMarkup(component),
    handleField: (component, rowIndex, fieldName, fieldElement) => {
      const pairRecord = readTabPairRecords(component)[rowIndex];
      if (!pairRecord) return false;
      if (fieldName === 'label') writeComponentTextContent(pairRecord.buttonComponent, fieldElement.value);
      if (fieldName === 'selected' && fieldElement.checked) applyDefaultTabSelection(pairRecord.buttonComponent);
      return false;
    },
    handleAdd: (component) => appendTabPair(component, interactiveTextDefaults),
    handleRemove: (component, rowIndex) => removeTabPairAt(component, rowIndex),
    handleMove: (component, rowIndex, indexOffset) => moveTabPairAt(component, rowIndex, indexOffset),
  });

export default createTabItemsTraitDefinition;
