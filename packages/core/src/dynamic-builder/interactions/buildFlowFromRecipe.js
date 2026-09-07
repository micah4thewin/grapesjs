import createFlowIdentifier from './createFlowIdentifier.js';
import getFlowRecipeRecords from './getFlowRecipeRecords.js';

const buildFlowFromRecipe = (recipeId) => {
  const recipeRecord = getFlowRecipeRecords().find((candidate) => candidate.id === recipeId);
  if (!recipeRecord) return null;
  return {
    id: createFlowIdentifier(),
    trigger: recipeRecord.trigger,
    triggerOptions: {},
    actions: recipeRecord.actions.map((actionRecord) => ({
      type: actionRecord.type,
      options: { ...actionRecord.options },
    })),
  };
};

export default buildFlowFromRecipe;
