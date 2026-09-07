import buildBuiltInTemplateRecords from './buildBuiltInTemplateRecords.js';
import buildContactFormSectionContent from '../blocks/buildContactFormSectionContent.js';
import buildContactSplitSectionRecord from './buildContactSplitSectionRecord.js';
import buildNewsletterSignupContent from '../blocks/buildNewsletterSignupContent.js';

const getFormSectionTemplateRecords = () =>
  buildBuiltInTemplateRecords('section', [
    {
      templateId: 'db-section-contact-form',
      name: 'Contact form',
      categoryId: 'contact',
      description: 'A narrow message form under a heading and a friendly promise.',
      buildContent: () => [buildContactFormSectionContent()],
    },
    {
      templateId: 'db-section-contact-split',
      name: 'Form beside details',
      categoryId: 'contact',
      description: 'A form on the left with your address and hours on the right.',
      buildContent: () => [
        buildContactSplitSectionRecord({
          headingText: 'Get in touch',
          introText: 'Send a message or use the details beside it, whichever you prefer.',
        }),
      ],
    },
    {
      templateId: 'db-section-newsletter',
      name: 'Newsletter sign-up',
      categoryId: 'callToAction',
      description: 'An email box with a short promise about what subscribers get.',
      buildContent: () => [buildNewsletterSignupContent()],
    },
  ]);

export default getFormSectionTemplateRecords;
