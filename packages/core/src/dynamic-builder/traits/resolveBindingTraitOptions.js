const resolveBindingTraitOptions = (pluginOptions) => {
  const traitOptions = (pluginOptions && pluginOptions.traits) || {};
  const dataBindingOptions = (pluginOptions && pluginOptions.dataBinding) || {};
  const traitPaths = Array.isArray(traitOptions.extraBindingPaths) ? traitOptions.extraBindingPaths : [];
  const dataBindingPaths = Array.isArray(dataBindingOptions.extraBindingPaths)
    ? dataBindingOptions.extraBindingPaths
    : [];
  return { ...traitOptions, extraBindingPaths: [...dataBindingPaths, ...traitPaths] };
};

export default resolveBindingTraitOptions;
