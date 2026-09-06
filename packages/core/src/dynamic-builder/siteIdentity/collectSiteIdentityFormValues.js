const collectSiteIdentityFormValues = (formElement) => {
  const readValue = (fieldName) => {
    const fieldElement = formElement.querySelector(`[name="${fieldName}"]`);
    return fieldElement ? String(fieldElement.value || '').trim() : '';
  };
  const activeMood = formElement.querySelector('[data-db-identity-mood].gjs-db-chip-active');
  return {
    siteName: readValue('siteName'),
    tagline: readValue('tagline'),
    description: readValue('description'),
    logoSrc: readValue('logoSrc'),
    brandColor: readValue('brandColor') || '#4f46e5',
    moodId: activeMood ? activeMood.getAttribute('data-db-identity-mood') : 'minimal',
  };
};

export default collectSiteIdentityFormValues;
