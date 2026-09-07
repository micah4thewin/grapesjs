const findFigureCaptionComponent = (figureComponent) => {
  if (!figureComponent || !figureComponent.components) return null;
  const childComponents = figureComponent.components();
  const childList = childComponents && childComponents.models ? childComponents.models : childComponents || [];
  return (
    childList.find(
      (childComponent) =>
        childComponent &&
        childComponent.get &&
        String(childComponent.get('tagName') || '').toLowerCase() === 'figcaption',
    ) || null
  );
};

export default findFigureCaptionComponent;
