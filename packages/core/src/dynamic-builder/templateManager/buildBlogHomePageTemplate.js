import buildCardGridSectionRecord from './buildCardGridSectionRecord.js';
import buildNewsletterSignupContent from '../blocks/buildNewsletterSignupContent.js';
import buildPlaceholderHeadingRecord from './buildPlaceholderHeadingRecord.js';
import buildPlaceholderTextRecord from './buildPlaceholderTextRecord.js';
import buildSectionContentRecord from '../blocks/buildSectionContentRecord.js';
import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';

const buildBlogHomePageTemplate = () => [
  { type: 'db-navbar' },
  buildSectionContentRecord(
    [
      buildPlaceholderHeadingRecord('1', 'Notes on making things for the web', 'xl'),
      buildPlaceholderTextRecord(
        'Short essays on design, code and the small decisions in between. Roughly one a fortnight, never on a schedule.',
        'lead',
      ),
    ],
    { centered: true, attributes: { 'data-db-layout': 'narrow' } },
  ),
  buildCardGridSectionRecord({
    headingText: 'Latest posts',
    introText: 'The three most recent pieces. Everything else lives in the archive.',
    anchorId: 'posts',
  }),
  buildTemplateSectionRecord(
    {
      headingText: 'Browse by topic',
      introText: 'Design systems, front-end craft, and the occasional opinion about meetings.',
      centered: true,
      themeName: 'light',
    },
    [{ type: 'db-tabs' }],
  ),
  buildNewsletterSignupContent(),
  { type: 'db-footer' },
];

export default buildBlogHomePageTemplate;
