const syncFeaturedTierExclusive = (tierComponent) => {
  if (!tierComponent || !tierComponent.getAttributes) return;
  if (tierComponent.getAttributes()['data-db-featured'] !== 'true') return;
  const parentComponent = tierComponent.parent ? tierComponent.parent() : null;
  if (!parentComponent || !parentComponent.components) return;
  parentComponent.components().forEach((siblingComponent) => {
    if (siblingComponent === tierComponent || !siblingComponent.getAttributes) return;
    if (siblingComponent.getAttributes()['data-db-featured'] !== 'true') return;
    siblingComponent.addAttributes({ 'data-db-featured': 'false' });
  });
};

export default syncFeaturedTierExclusive;
