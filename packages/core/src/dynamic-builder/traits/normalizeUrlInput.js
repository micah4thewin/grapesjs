const commonTopLevelDomains = [
  'com',
  'org',
  'net',
  'io',
  'co',
  'app',
  'dev',
  'me',
  'info',
  'biz',
  'edu',
  'gov',
  'uk',
  'de',
  'fr',
  'es',
  'it',
  'nl',
  'eu',
  'us',
  'ca',
  'au',
  'ch',
  'at',
  'be',
  'se',
  'no',
  'dk',
  'fi',
  'pl',
  'pt',
  'br',
  'mx',
  'jp',
  'in',
  'nz',
  'ie',
  'cz',
  'ai',
  'xyz',
  'site',
  'online',
  'shop',
  'store',
  'blog',
  'page',
  'tech',
  'design',
  'studio',
  'agency',
];

const looksLikeWebHost = (addressText) => {
  const hostPart = addressText.split(/[\/?#]/)[0].split(':')[0];
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(hostPart)) return false;
  if (/^www\./i.test(hostPart)) return true;
  const topLevelDomain = hostPart.split('.').pop().toLowerCase();
  return commonTopLevelDomains.indexOf(topLevelDomain) >= 0;
};

const normalizeUrlInput = (rawValue) => {
  const trimmedValue = String(rawValue || '').trim();
  const keepAsIs = { value: trimmedValue, addedScheme: false };
  if (!trimmedValue) return keepAsIs;
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmedValue)) return keepAsIs;
  if (/^[\/#.?]/.test(trimmedValue)) return keepAsIs;
  if (!looksLikeWebHost(trimmedValue)) return keepAsIs;
  return { value: `https://${trimmedValue}`, addedScheme: true };
};

export default normalizeUrlInput;
