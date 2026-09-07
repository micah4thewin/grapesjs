import buildSocialLinkChild from './buildSocialLinkChild.js';
import detectSocialNetworkFromUrl from './detectSocialNetworkFromUrl.js';
import findChildByTagName from './findChildByTagName.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const appendSocialProfileFromUrl = (rootComponent, urlValue) => {
  const safeValue = sanitizeUrlValue(urlValue);
  if (!safeValue || !rootComponent || typeof rootComponent.append !== 'function') return null;
  const networkName = detectSocialNetworkFromUrl(safeValue) || 'website';
  const addedItem = rootComponent.append(buildSocialLinkChild(networkName))[0] || null;
  const linkComponent = addedItem ? findChildByTagName(addedItem, 'a') : null;
  if (linkComponent) linkComponent.addAttributes({ href: safeValue });
  return addedItem;
};

export default appendSocialProfileFromUrl;
