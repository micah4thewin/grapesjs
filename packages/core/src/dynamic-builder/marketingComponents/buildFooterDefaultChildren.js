import buildFooterNavListComponent from './buildFooterNavListComponent.js';
import buildMarketingSocialLinksRecord from './buildMarketingSocialLinksRecord.js';

const buildFooterDefaultChildren = () => {
  const toLinkRecords = (linkTexts) => linkTexts.map((linkText) => ({ text: linkText, href: '#' }));
  const buildLegalLink = (linkText, linkPath) => ({
    type: 'link',
    name: linkText + ' link',
    classes: ['db-footer-link'],
    attributes: { href: linkPath },
    components: linkText,
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
              components: 'A sentence or two about your business, where you are, and who you help.',
            },
            buildMarketingSocialLinksRecord(['instagram', 'facebook', 'linkedin', 'x']),
          ],
        },
        buildFooterNavListComponent('Explore', toLinkRecords(['Home', 'Services', 'About', 'Contact'])),
        buildFooterNavListComponent('Company', toLinkRecords(['Our story', 'Careers', 'News', 'Support'])),
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
          components: '\u00A9 ' + String(new Date().getFullYear()) + ' Acme Studio. All rights reserved.',
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
