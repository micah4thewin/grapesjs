import getSubmissionRecipeRecords from './getSubmissionRecipeRecords.js';

const applySubmissionRecipe = (formComponent, recipeId) => {
  if (!formComponent || !formComponent.addAttributes) return;
  const recipeRecord = getSubmissionRecipeRecords().find((candidate) => candidate.id === recipeId);
  if (!recipeRecord) return;
  const formAttributes = formComponent.getAttributes();
  const currentAction = String(formAttributes.action || '');
  const nextAttributes = { 'data-db-recipe': recipeRecord.id, method: 'post' };
  const removedAttributes = [];
  if (recipeRecord.id === 'netlify') nextAttributes['data-netlify'] = 'true';
  else removedAttributes.push('data-netlify');
  if (!recipeRecord.isCustom)
    removedAttributes.push('data-db-method', 'data-db-body-format', 'data-db-headers', 'data-db-field-map');
  const keepsAction =
    recipeRecord.needsUrl &&
    currentAction &&
    (!recipeRecord.urlHost || currentAction.indexOf(recipeRecord.urlHost) >= 0);
  if (!keepsAction) removedAttributes.push('action');
  if (recipeRecord.id === 'netlify' && !formAttributes.name) nextAttributes.name = 'contact';
  formComponent.addAttributes(nextAttributes);
  formComponent.removeAttributes(removedAttributes);
};

export default applySubmissionRecipe;
