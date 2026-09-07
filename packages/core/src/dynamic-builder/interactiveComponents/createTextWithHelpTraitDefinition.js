import buildHelpedInputMarkup from './buildHelpedInputMarkup.js';
import createValueTraitDefinition from '../traits/createValueTraitDefinition.js';

const createTextWithHelpTraitDefinition = () =>
  createValueTraitDefinition(({ trait }) => buildHelpedInputMarkup('text', trait), 'input');

export default createTextWithHelpTraitDefinition;
