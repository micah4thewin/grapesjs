const buildMarketingLookTraitDefinition = (defaultLook) => ({
  type: 'select',
  name: 'data-db-theme',
  label: 'Look',
  default: defaultLook || 'default',
  options: [
    { id: 'default', label: 'Default' },
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'brand', label: 'Brand colour' },
    { id: 'photo', label: 'Photo with dark overlay' },
  ],
});

export default buildMarketingLookTraitDefinition;
