const buildTemplateSectionRecord = (childComponents, sectionAttributes) => ({
  type: 'db-section',
  ...(sectionAttributes ? { attributes: sectionAttributes } : {}),
  components: [{ type: 'db-container', components: childComponents }],
});

export default buildTemplateSectionRecord;
