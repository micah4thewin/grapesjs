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
      attributes: { 'data-db-type': 'social-links' },
      components: buildSocialLinkChildren(),
      traits: [{ type: 'db-social-profiles', name: 'dbSocialProfiles', label: 'Profiles' }],
    },
  },
});

export default buildSocialLinksTypeDefinition;
