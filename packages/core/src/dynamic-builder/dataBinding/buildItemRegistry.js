const buildItemRegistry = (registry, settings, sourceItem, indexNumber, countNumber) => {
  const aliasName = settings && settings.itemAlias ? settings.itemAlias : 'item';
  return {
    ...registry,
    item: sourceItem,
    [aliasName]: sourceItem,
    index: indexNumber,
    count: countNumber,
  };
};

export default buildItemRegistry;
