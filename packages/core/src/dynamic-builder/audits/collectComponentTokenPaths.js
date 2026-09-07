const tokenPattern = /\{\{db:([^{}]+)\}\}/g;

const collectComponentTokenPaths = (component) => {
  const textParts = [String(component.get('content') || '')];
  const childComponents = component.components ? component.components() : null;
  childComponents &&
    childComponents.forEach((childComponent) => {
      if (childComponent.get('type') === 'textnode') textParts.push(String(childComponent.get('content') || ''));
    });
  const componentAttributes = component.getAttributes ? component.getAttributes() : {};
  Object.values(componentAttributes).forEach((attributeValue) => {
    textParts.push(String(attributeValue == null ? '' : attributeValue));
  });
  const tokenPaths = [];
  textParts.join(' ').replace(tokenPattern, (tokenMatch, pathText) => {
    const cleanPath = pathText.trim();
    if (cleanPath && !tokenPaths.includes(cleanPath)) tokenPaths.push(cleanPath);
    return tokenMatch;
  });
  return tokenPaths;
};

export default collectComponentTokenPaths;
