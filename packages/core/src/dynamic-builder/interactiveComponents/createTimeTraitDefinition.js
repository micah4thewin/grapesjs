import buildHelpedInputMarkup from './buildHelpedInputMarkup.js';
import createValueTraitDefinition from '../traits/createValueTraitDefinition.js';

const createTimeTraitDefinition = () =>
  createValueTraitDefinition(({ trait }) => buildHelpedInputMarkup('time', trait), 'input');

export default createTimeTraitDefinition;
