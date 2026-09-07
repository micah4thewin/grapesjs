const appendToolbarItemOnce = (component, toolbarItem) => {
  if (!component || !component.get || !toolbarItem) return false;
  const itemTitle = toolbarItem.attributes && toolbarItem.attributes.title;
  const toolbarItems = [...(component.get('toolbar') || [])];
  const alreadyPresent = toolbarItems.some(
    (existingItem) => existingItem && existingItem.attributes && existingItem.attributes.title === itemTitle,
  );
  if (alreadyPresent) return false;
  toolbarItems.push(toolbarItem);
  component.set({ toolbar: toolbarItems });
  return true;
};

export default appendToolbarItemOnce;
