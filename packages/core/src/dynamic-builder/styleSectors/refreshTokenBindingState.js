const refreshTokenBindingState = (bindButton, propertyModel) => {
  const currentValue = String((propertyModel.getValue && propertyModel.getValue()) || '').trim();
  const variableMatch = currentValue.match(/^var\(--db-([a-z0-9-]+)\)$/i);
  bindButton.setAttribute('data-db-token-bound', variableMatch ? 'true' : 'false');
  bindButton.setAttribute(
    'title',
    variableMatch ? `Following site value ${variableMatch[1]}. Click to change.` : 'Use a site value',
  );
};

export default refreshTokenBindingState;
