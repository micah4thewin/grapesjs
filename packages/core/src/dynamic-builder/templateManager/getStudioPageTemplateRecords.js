import buildAgencyPageTemplate from './buildAgencyPageTemplate.js';
import buildBlogHomePageTemplate from './buildBlogHomePageTemplate.js';
import buildBuiltInTemplateRecords from './buildBuiltInTemplateRecords.js';
import buildConsultantPageTemplate from './buildConsultantPageTemplate.js';
import buildEventPageTemplate from './buildEventPageTemplate.js';
import buildRestaurantPageTemplate from './buildRestaurantPageTemplate.js';

const getStudioPageTemplateRecords = () =>
  buildBuiltInTemplateRecords('page', [
    {
      templateId: 'db-page-agency',
      name: 'Agency',
      categoryId: 'business',
      description: 'Studio home page: bold hero, client logos, services and proof.',
      buildContent: buildAgencyPageTemplate,
    },
    {
      templateId: 'db-page-restaurant',
      name: 'Restaurant',
      categoryId: 'local',
      description: 'A short menu, pictures of the room, and a booking form.',
      buildContent: buildRestaurantPageTemplate,
    },
    {
      templateId: 'db-page-event',
      name: 'Event',
      categoryId: 'marketing',
      description: 'Countdown, schedule, questions and a ticket call to action.',
      buildContent: buildEventPageTemplate,
    },
    {
      templateId: 'db-page-consultant',
      name: 'Personal consultant',
      categoryId: 'personal',
      description: 'A one-page pitch for solo work: offer, story and contact.',
      buildContent: buildConsultantPageTemplate,
    },
    {
      templateId: 'db-page-blog-home',
      name: 'Blog home',
      categoryId: 'content',
      description: 'A calm index of recent posts, topics and a newsletter box.',
      buildContent: buildBlogHomePageTemplate,
    },
  ]);

export default getStudioPageTemplateRecords;
