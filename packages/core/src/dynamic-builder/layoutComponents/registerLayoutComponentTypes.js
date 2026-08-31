import registerComponentTypeSet from '../support/registerComponentTypeSet.js';
import buildColumnTypeDefinition from './buildColumnTypeDefinition.js';
import buildColumnsTypeDefinition from './buildColumnsTypeDefinition.js';
import buildContainerTypeDefinition from './buildContainerTypeDefinition.js';
import buildDividerTypeDefinition from './buildDividerTypeDefinition.js';
import buildSectionTypeDefinition from './buildSectionTypeDefinition.js';
import buildSpacerTypeDefinition from './buildSpacerTypeDefinition.js';

const registerLayoutComponentTypes = (editor) =>
  registerComponentTypeSet(editor, [
    buildColumnTypeDefinition(),
    buildColumnsTypeDefinition(),
    buildContainerTypeDefinition(),
    buildSectionTypeDefinition(),
    buildSpacerTypeDefinition(),
    buildDividerTypeDefinition(),
  ]);

export default registerLayoutComponentTypes;
