const removeOtherRootComponents = (editor, keptComponents) => {
  const rootCollection = editor.getWrapper().components();
  const removableComponents = rootCollection.models.filter(
    (rootComponent) => keptComponents.indexOf(rootComponent) < 0,
  );
  removableComponents.length && rootCollection.remove(removableComponents);
  return removableComponents.length;
};

export default removeOtherRootComponents;
