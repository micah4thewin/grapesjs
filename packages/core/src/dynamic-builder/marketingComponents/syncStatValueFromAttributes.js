const syncStatValueFromAttributes = (component) => {
  if (!component || !component.getAttributes) return;
  const componentAttributes = component.getAttributes();
  if (componentAttributes['data-db-stat-target'] === undefined) return;
  const parsedTarget = parseFloat(componentAttributes['data-db-stat-target']);
  const safeTarget = isNaN(parsedTarget) ? 0 : parsedTarget;
  const prefixText = componentAttributes['data-db-stat-prefix'] || '';
  const suffixText = componentAttributes['data-db-stat-suffix'] || '';
  component.components(prefixText + Math.round(safeTarget).toLocaleString('en-US') + suffixText);
};

export default syncStatValueFromAttributes;
