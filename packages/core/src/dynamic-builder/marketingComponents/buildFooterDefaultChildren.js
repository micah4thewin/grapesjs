import buildFooterNavListComponent from './buildFooterNavListComponent.js';
import buildSocialLinksRowComponent from './buildSocialLinksRowComponent.js';

const buildFooterDefaultChildren = () => {
  const buildLegalLink = (linkText, linkPath) => ({
    tagName: 'a',
    name: linkText + ' link',
    classes: ['db-footer-link'],
    attributes: { href: linkPath },
    components: linkText,
    traits: [{ type: 'db-url', name: 'href', label: 'Link URL' }],
  });
  return [
    {
      tagName: 'div',
      name: 'Footer columns',
      classes: ['db-footer-grid'],
      components: [
        {
          tagName: 'div',
          name: 'Footer brand',
          classes: ['db-footer-brand'],
          components: [
            {
              tagName: 'span',
              type: 'text',
              name: 'Brand name',
              classes: ['db-footer-logo'],
              components: 'Acme Studio',
            },
            {
              tagName: 'p',
              type: 'text',
              name: 'Brand blurb',
              classes: ['db-footer-blurb'],
              components: 'We help ambitious teams design, build, and ship marketing sites that feel effortless.',
            },
            buildSocialLinksRowComponent(),
          ],
        },
        buildFooterNavListComponent('Product', ['Features', 'Pricing', 'Integrations', 'Changelog']),
        buildFooterNavListComponent('Company', ['About us', 'Careers', 'Blog', 'Contact']),
      ],
    },
    {
      tagName: 'div',
      name: 'Footer legal',
      classes: ['db-footer-legal'],
      components: [
        {
          tagName: 'small',
          type: 'text',
          name: 'Copyright',
          classes: ['db-footer-copyright'],
          components: '\u00A9 2026 Acme Studio. All rights reserved.',
        },
        {
          tagName: 'div',
          name: 'Legal links',
          classes: ['db-footer-legal-links'],
          components: [buildLegalLink('Privacy policy', '/privacy'), buildLegalLink('Terms of service', '/terms')],
        },
      ],
    },
  ];
};

export default buildFooterDefaultChildren;
