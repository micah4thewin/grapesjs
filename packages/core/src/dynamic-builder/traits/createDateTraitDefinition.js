import createValueTraitDefinition from './createValueTraitDefinition.js';

const createDateTraitDefinition = () =>
  createValueTraitDefinition(
    () => '<div class="gjs-db-field"><input type="date" class="gjs-db-field-input"></div>',
    'input',
  );

export default createDateTraitDefinition;
