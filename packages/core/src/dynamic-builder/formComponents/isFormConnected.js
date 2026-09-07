const isFormConnected = (formAttributes) => {
  const recipeId = String((formAttributes && formAttributes['data-db-recipe']) || '');
  if (recipeId === 'message' || recipeId === 'netlify') return true;
  return Boolean(String((formAttributes && formAttributes.action) || '').trim());
};

export default isFormConnected;
