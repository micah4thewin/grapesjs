import createPreflightItem from './createPreflightItem.js';
import describeAuditComponent from './describeAuditComponent.js';
import findComponentAncestorByType from './findComponentAncestorByType.js';
import walkSitePageComponents from './walkSitePageComponents.js';

const buildConsentItem = (consentComponent, page) =>
  createPreflightItem(
    'warning',
    'Links',
    'The consent checkbox has no privacy policy page, so its link goes nowhere.',
    'Pick the page that holds your privacy policy in the checkbox settings.',
    consentComponent,
    page,
    'privacy-url',
  );

const collectPlaceholderLinkItems = (editor) => {
  const items = [];
  walkSitePageComponents(editor, (component, page) => {
    if (String(component.get('tagName') || '').toLowerCase() !== 'a') return;
    const componentAttributes = component.getAttributes ? component.getAttributes() : {};
    const hrefText = String(componentAttributes.href == null ? '' : componentAttributes.href).trim();
    if ((hrefText && hrefText !== '#') || componentAttributes['data-db-link-page']) return;
    const consentComponent = componentAttributes['data-db-privacy-link']
      ? findComponentAncestorByType(component, 'db-consent-checkbox')
      : null;
    if (consentComponent) {
      items.push(buildConsentItem(consentComponent, page));
      return;
    }
    items.push(
      createPreflightItem(
        'warning',
        'Links',
        describeAuditComponent(component) + (hrefText ? ' still points to "#".' : ' has nowhere to go.'),
        'Choose the page or paste the web address this link should open.',
        component,
        page,
        'link-href',
      ),
    );
  });
  return items;
};

export default collectPlaceholderLinkItems;
