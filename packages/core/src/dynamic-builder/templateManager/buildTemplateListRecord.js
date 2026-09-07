import buildListItemComponents from '../contentComponents/buildListItemComponents.js';

const buildTemplateListRecord = (itemTexts, spacingName) => ({
  type: 'db-list',
  attributes: { 'data-db-spacing': spacingName || 'loose' },
  components: buildListItemComponents(itemTexts),
});

export default buildTemplateListRecord;
