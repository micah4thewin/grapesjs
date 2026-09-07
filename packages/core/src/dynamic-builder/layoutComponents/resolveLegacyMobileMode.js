const resolveLegacyMobileMode = (attributeRecord) => {
  const stacksOnMobile = String(attributeRecord['data-db-stack-mobile']) !== 'false';
  if (!stacksOnMobile) return 'side-by-side';
  return String(attributeRecord['data-db-reverse-mobile']) === 'true' ? 'stack-reverse' : 'stack';
};

export default resolveLegacyMobileMode;
