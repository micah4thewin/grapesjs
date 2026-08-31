import getIconMarkup from '../support/getIconMarkup.js';

const buildSocialLinksRowComponent = () => {
  const socialLinkPresets = [
    ['social', 'Follow us on social media'],
    ['globe', 'Visit our website'],
    ['newsletter', 'Subscribe to the newsletter'],
  ];
  return {
    tagName: 'div',
    name: 'Social links',
    classes: ['db-social-row'],
    components: socialLinkPresets.map(([iconName, linkLabel]) => ({
      tagName: 'a',
      name: 'Social link',
      classes: ['db-social-link'],
      attributes: { href: '#', 'aria-label': linkLabel },
      components: getIconMarkup(iconName, { size: 18 }),
      traits: [
        { type: 'db-url', name: 'href', label: 'Link URL' },
        { type: 'db-aria-label', name: 'aria-label', label: 'ARIA label' },
      ],
    })),
  };
};

export default buildSocialLinksRowComponent;
