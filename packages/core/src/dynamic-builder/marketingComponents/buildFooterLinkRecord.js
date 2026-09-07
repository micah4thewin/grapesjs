const buildFooterLinkRecord = (linkText, linkHref) => ({
  tagName: 'li',
  name: 'Link item',
  components: [
    {
      type: 'link',
      name: linkText + ' link',
      classes: ['db-footer-link'],
      attributes: { href: linkHref },
      components: linkText,
    },
  ],
});

export default buildFooterLinkRecord;
