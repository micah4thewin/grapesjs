const applyLimitOffsetToItems = (sourceItems, offsetValue, limitValue) => {
  const safeItems = Array.isArray(sourceItems) ? sourceItems : [];
  const offsetItems = offsetValue > 0 ? safeItems.slice(offsetValue) : safeItems;
  return limitValue > 0 ? offsetItems.slice(0, limitValue) : offsetItems;
};

export default applyLimitOffsetToItems;
