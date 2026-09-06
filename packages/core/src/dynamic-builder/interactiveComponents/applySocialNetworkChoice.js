import collectListItemRecords from '../support/collectListItemRecords.js';
import getSocialIconMarkup from './getSocialIconMarkup.js';
import resolveSocialNetworkRecord from './resolveSocialNetworkRecord.js';

const applySocialNetworkChoice = (rootComponent, itemIndex, networkName) => {
  const targetRecord = collectListItemRecords(rootComponent, '')[itemIndex];
  if (!targetRecord) return;
  const networkRecord = resolveSocialNetworkRecord(networkName);
  const currentHref = String((targetRecord.linkComponent.getAttributes() || {}).href || '');
  const previousRecord = resolveSocialNetworkRecord(
    String((targetRecord.linkComponent.getAttributes() || {})['data-db-network'] || ''),
  );
  targetRecord.linkComponent.addAttributes({
    'data-db-network': networkRecord.networkName,
    'aria-label': networkRecord.networkLabel,
    href: !currentHref || currentHref === previousRecord.profileUrl ? networkRecord.profileUrl : currentHref,
  });
  targetRecord.linkComponent.components(getSocialIconMarkup(networkRecord.networkName));
  targetRecord.linkComponent.set('name', networkRecord.networkLabel + ' link');
};

export default applySocialNetworkChoice;
