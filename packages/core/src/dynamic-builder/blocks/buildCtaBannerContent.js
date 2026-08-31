import buildHeadingContentRecord from './buildHeadingContentRecord.js';
import buildTextContentRecord from './buildTextContentRecord.js';

const buildCtaBannerContent = () => ({
  type: 'db-section',
  attributes: { 'data-db-theme': 'brand', 'data-db-layout': 'narrow' },
  components: [
    {
      type: 'db-container',
      components: [
        buildHeadingContentRecord('2', 'Ready to launch your next site?'),
        buildTextContentRecord('Join thousands of teams shipping accessible, fast pages with the builder.', 'lead'),
        { type: 'db-button-group', attributes: { 'data-db-align': 'center' } },
      ],
    },
  ],
});

export default buildCtaBannerContent;
