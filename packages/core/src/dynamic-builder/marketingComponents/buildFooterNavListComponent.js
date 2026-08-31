const buildFooterNavListComponent = (navLabel, linkTexts) => ({
  tagName: 'nav',
  name: navLabel + ' links',
  classes: ['db-footer-nav'],
  attributes: { 'aria-label': navLabel },
  components: [
    { tagName: 'span', type: 'text', name: 'Nav heading', classes: ['db-footer-heading'], components: navLabel },
    {
      tagName: 'ul',
      classes: ['db-footer-list'],
      components: linkTexts.map((linkText) => ({
        tagName: 'li',
        components: [
          {
            tagName: 'a',
            name: linkText + ' link',
            classes: ['db-footer-link'],
            attributes: { href: '#' },
            components: linkText,
            traits: [{ type: 'db-url', name: 'href', label: 'Link URL' }],
          },
        ],
      })),
    },
  ],
});

export default buildFooterNavListComponent;
