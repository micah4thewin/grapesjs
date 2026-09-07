const insertContactMap = (editor, contactComponent) => {
  if (!editor || !contactComponent || !contactComponent.parent) return;
  if (!editor.DomComponents.getType('db-map')) return;
  const parentComponent = contactComponent.parent();
  if (!parentComponent) return;
  const addressText = String(contactComponent.getAttributes()['data-db-address'] || '').trim();
  const addedMap = parentComponent.append(
    { type: 'db-map', attributes: addressText ? { 'data-db-address': addressText } : {} },
    { at: contactComponent.index() + 1 },
  )[0];
  if (addedMap && editor.select) editor.select(addedMap);
};

export default insertContactMap;
