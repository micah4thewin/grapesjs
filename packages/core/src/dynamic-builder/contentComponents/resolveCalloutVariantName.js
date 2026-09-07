const resolveCalloutVariantName = (variantValue) => {
  const knownVariants = ['info', 'success', 'warning', 'error'];
  const normalizedValue = String(variantValue || '').toLowerCase();
  return knownVariants.indexOf(normalizedValue) >= 0 ? normalizedValue : 'info';
};

export default resolveCalloutVariantName;
