import buildFooterLinkRecord from './buildFooterLinkRecord.js';

const buildFooterNavListComponent = (navLabel, linkRecords) => ({
  tagName: 'nav',
  name: navLabel + ' column',
  classes: ['db-footer-nav'],
  attributes: { 'aria-label': navLabel, 'data-db-footer-nav': 'true' },
  components: [
    {
      tagName: 'span',
      type: 'text',
      name: 'Column heading',
      classes: ['db-footer-heading'],
      attributes: { 'data-db-footer-heading': 'true' },
      components: navLabel,
    },
    {
      tagName: 'ul',
      name: 'Link list',
      classes: ['db-footer-list'],
      attributes: { 'data-db-footer-list': 'true' },
      components: linkRecords.map((linkRecord) => buildFooterLinkRecord(linkRecord.text, linkRecord.href)),
    },
  ],
});

export default buildFooterNavListComponent;
