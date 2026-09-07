const keyedProviderNames = { unsplash: 'Unsplash', pexels: 'Pexels' };

const describeMissingProviderNotice = (moduleOptions) => {
  const providerId = String((moduleOptions && moduleOptions.provider) || '')
    .trim()
    .toLowerCase();
  const providerName = keyedProviderNames[providerId];
  if (providerName)
    return (
      'This site is set up to use ' +
      providerName +
      ' for photos, but no access key was saved yet. Add the key in the builder settings, or remove the provider setting to use the free Openverse library.'
    );
  return 'No picture service is connected yet, so there is nothing to search. Connect one in the builder settings, or upload your own pictures from the assets panel.';
};

export default describeMissingProviderNotice;
