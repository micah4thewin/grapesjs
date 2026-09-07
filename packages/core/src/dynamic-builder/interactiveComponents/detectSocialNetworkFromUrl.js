import getSocialNetworkRecords from './getSocialNetworkRecords.js';

const detectSocialNetworkFromUrl = (urlValue) => {
  const trimmedValue = String(urlValue || '').trim();
  if (!trimmedValue) return '';
  if (/^mailto:/i.test(trimmedValue)) return 'email';
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmedValue) && !/^https?:/i.test(trimmedValue)) return '';
  let hostName = '';
  try {
    const parsedUrl = new URL(/^https?:\/\//i.test(trimmedValue) ? trimmedValue : 'https://' + trimmedValue);
    hostName = parsedUrl.hostname.toLowerCase().replace(/^www\./, '');
  } catch (parseError) {
    return '';
  }
  if (!hostName || hostName.indexOf('.') < 0) return '';
  const matchingRecord = getSocialNetworkRecords().find((networkRecord) =>
    networkRecord.hostNames.some((knownHost) => hostName === knownHost || hostName.endsWith('.' + knownHost)),
  );
  return matchingRecord ? matchingRecord.networkName : 'website';
};

export default detectSocialNetworkFromUrl;
