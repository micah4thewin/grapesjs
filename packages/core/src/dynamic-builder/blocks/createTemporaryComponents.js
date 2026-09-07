const createTemporaryComponents = (editor, contentRecords) => {
  const rootCollection = editor.Components.getComponents();
  const addOptions = { temporary: true, avoidStore: true, avoidUpdateStyle: true, avoidChildren: true };
  const addedModels = rootCollection.add(contentRecords, addOptions);
  const componentList = (Array.isArray(addedModels) ? addedModels : [addedModels]).filter(Boolean);
  rootCollection.remove(componentList, addOptions);
  return componentList;
};

export default createTemporaryComponents;
