const updateSchemaGroupVisibility = (rootElement, pageType) => {
  rootElement.querySelectorAll('[data-db-schema-group]').forEach((groupElement) => {
    groupElement.hidden = groupElement.dataset.dbSchemaGroup !== pageType;
  });
};

export default updateSchemaGroupVisibility;
