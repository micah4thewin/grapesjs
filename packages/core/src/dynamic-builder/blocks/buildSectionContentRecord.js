const buildSectionContentRecord = (childComponents, sectionOptions = {}) => ({
  type: 'db-section',
  ...(sectionOptions.centered ? { classes: ['db-section', 'db-align-center'] } : {}),
  ...(sectionOptions.attributes ? { attributes: sectionOptions.attributes } : {}),
  components: [{ type: 'db-container', components: childComponents }],
});

export default buildSectionContentRecord;
