const syncHeadingTagFromLevel = (component) => {
  if (!component || !component.get || component.get('type') !== 'db-heading') return;
  const levelValue = `${component.getAttributes()['data-db-level'] || ''}`.trim();
  if (!/^[1-6]$/.test(levelValue)) return;
  const nextTagName = `h${levelValue}`;
  if (component.get('tagName') !== nextTagName) component.set({ tagName: nextTagName });
};

export default syncHeadingTagFromLevel;
