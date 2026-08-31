const buildHeadingContentRecord = (headingLevel, headingText) => ({
  type: 'db-heading',
  attributes: { 'data-db-level': headingLevel },
  components: headingText,
});

export default buildHeadingContentRecord;
