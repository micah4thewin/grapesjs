import getSocialIconMarkup from './getSocialIconMarkup.js';
import readSocialProfileRecords from './readSocialProfileRecords.js';
import resolveSocialNetworkRecord from './resolveSocialNetworkRecord.js';

const applySocialNetworkChoice = (rootComponent, itemIndex, networkName) => {
  const targetRecord = readSocialProfileRecords(rootComponent)[itemIndex];
  if (!targetRecord) return false;
  const networkRecord = resolveSocialNetworkRecord(networkName);
  const previousLabel = resolveSocialNetworkRecord(targetRecord.networkName).networkLabel;
  const currentAriaLabel = String((targetRecord.linkComponent.getAttributes() || {})['aria-label'] || '');
  targetRecord.linkComponent.addAttributes({
    'data-db-network': networkRecord.networkName,
    'aria-label':
      !currentAriaLabel || currentAriaLabel === previousLabel ? networkRecord.networkLabel : currentAriaLabel,
  });
  targetRecord.linkComponent.components(getSocialIconMarkup(networkRecord.networkName));
  targetRecord.linkComponent.set('name', networkRecord.networkLabel + ' link');
  targetRecord.itemComponent.set('name', networkRecord.networkLabel + ' profile');
  return true;
};

export default applySocialNetworkChoice;
