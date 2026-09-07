const buildDirectionsUrl = (addressText) => {
  const safeAddress = String(addressText || '').trim();
  if (!safeAddress) return '';
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(safeAddress);
};

export default buildDirectionsUrl;
