const findChildByTagName = (parentComponent, tagName) => {
  if (!parentComponent || typeof parentComponent.components !== 'function') return null;
  return (
    parentComponent
      .components()
      .find((childComponent) => String(childComponent.get('tagName') || '').toLowerCase() === tagName) || null
  );
};

export default findChildByTagName;
