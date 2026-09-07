const moveChildComponentAt = (parentComponent, childIndex, indexOffset) => {
  if (!parentComponent || typeof parentComponent.components !== 'function') return false;
  const childList = parentComponent.components();
  const targetIndex = childIndex + indexOffset;
  const childComponent = childList.at(childIndex);
  if (!childComponent || targetIndex < 0 || targetIndex >= childList.length) return false;
  parentComponent.append(childComponent, { at: targetIndex });
  return true;
};

export default moveChildComponentAt;
