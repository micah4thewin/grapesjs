const composeModuleAppliers = (moduleAppliers) => (editor, pluginOptions) =>
  moduleAppliers.forEach((moduleApplier) => moduleApplier(editor, pluginOptions));

export default composeModuleAppliers;
