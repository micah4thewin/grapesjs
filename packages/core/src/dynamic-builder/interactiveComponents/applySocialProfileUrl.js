import applySocialNetworkChoice from './applySocialNetworkChoice.js';
import detectSocialNetworkFromUrl from './detectSocialNetworkFromUrl.js';
import readSocialProfileRecords from './readSocialProfileRecords.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const applySocialProfileUrl = (rootComponent, itemIndex, urlValue) => {
  const targetRecord = readSocialProfileRecords(rootComponent)[itemIndex];
  if (!targetRecord) return false;
  const rawValue = String(urlValue || '').trim();
  const safeValue = sanitizeUrlValue(rawValue);
  if (rawValue && !safeValue) return false;
  const detectedNetwork = detectSocialNetworkFromUrl(safeValue);
  if (detectedNetwork && detectedNetwork !== 'website' && detectedNetwork !== targetRecord.networkName) {
    applySocialNetworkChoice(rootComponent, itemIndex, detectedNetwork);
  }
  if (safeValue) targetRecord.linkComponent.addAttributes({ href: safeValue });
  else targetRecord.linkComponent.removeAttributes(['href']);
  return true;
};

export default applySocialProfileUrl;
