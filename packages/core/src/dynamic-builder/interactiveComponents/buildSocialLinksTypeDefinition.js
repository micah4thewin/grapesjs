import buildSocialLinkChildren from './buildSocialLinkChildren.js';

const buildSocialLinksTypeDefinition = () => ({
  type: 'db-social-links',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'social-links') && { type: 'db-social-links' },
  model: {
    defaults: {
      tagName: 'ul',
      name: 'Social links',
      draggable: true,
      droppable: false,
      classes: ['db-social-links'],
      attributes: { 'data-db-type': 'social-links', 'data-db-icon-style': 'outline' },
      components: buildSocialLinkChildren(),
      traits: [
        { type: 'db-social-profiles', name: 'dbSocialProfiles', label: 'Profiles' },
        {
          type: 'select',
          name: 'data-db-icon-style',
          label: 'Icon style',
          default: 'outline',
          options: [
            { id: 'outline', label: 'Outline' },
            { id: 'filled', label: 'Filled' },
            { id: 'brand', label: 'Brand colours' },
          ],
        },
      ],
    },
  },
});

export default buildSocialLinksTypeDefinition;
