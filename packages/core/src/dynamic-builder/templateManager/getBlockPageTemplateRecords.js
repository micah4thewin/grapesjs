import buildBuiltInTemplateRecords from './buildBuiltInTemplateRecords.js';
import getAboutTemplateComponents from '../blocks/getAboutTemplateComponents.js';
import getArticleTemplateComponents from '../blocks/getArticleTemplateComponents.js';
import getContactTemplateComponents from '../blocks/getContactTemplateComponents.js';
import getLandingTemplateComponents from '../blocks/getLandingTemplateComponents.js';
import getLaunchTemplateComponents from '../blocks/getLaunchTemplateComponents.js';
import getPortfolioTemplateComponents from '../blocks/getPortfolioTemplateComponents.js';
import getPricingTemplateComponents from '../blocks/getPricingTemplateComponents.js';
import getServicesTemplateComponents from '../blocks/getServicesTemplateComponents.js';
import getSupportTemplateComponents from '../blocks/getSupportTemplateComponents.js';

const getBlockPageTemplateRecords = () =>
  buildBuiltInTemplateRecords('page', [
    {
      templateId: 'db-page-landing',
      name: 'Landing',
      categoryId: 'marketing',
      description: 'Hero, highlights, numbers, quotes and one clear call to action.',
      buildContent: getLandingTemplateComponents,
    },
    {
      templateId: 'db-page-about',
      name: 'About',
      categoryId: 'business',
      description: 'Introduce the team and the people you already work with.',
      buildContent: getAboutTemplateComponents,
    },
    {
      templateId: 'db-page-contact',
      name: 'Contact',
      categoryId: 'business',
      description: 'A message form beside your address, opening hours and a map.',
      buildContent: getContactTemplateComponents,
    },
    {
      templateId: 'db-page-portfolio',
      name: 'Portfolio',
      categoryId: 'personal',
      description: 'A gallery of recent work with logos and a client quote.',
      buildContent: getPortfolioTemplateComponents,
    },
    {
      templateId: 'db-page-services',
      name: 'Services',
      categoryId: 'business',
      description: 'What you offer, the numbers behind it, and how projects run.',
      buildContent: getServicesTemplateComponents,
    },
    {
      templateId: 'db-page-pricing',
      name: 'Pricing',
      categoryId: 'marketing',
      description: 'Plans side by side, pricing questions answered, one quote.',
      buildContent: getPricingTemplateComponents,
    },
    {
      templateId: 'db-page-support',
      name: 'Support',
      categoryId: 'support',
      description: 'Common questions up front and a way to reach a real person.',
      buildContent: getSupportTemplateComponents,
    },
    {
      templateId: 'db-page-launch',
      name: 'Product launch',
      categoryId: 'marketing',
      description: 'A countdown, a sign-up form and your social profiles.',
      buildContent: getLaunchTemplateComponents,
    },
    {
      templateId: 'db-page-article',
      name: 'Article',
      categoryId: 'content',
      description: 'A readable column for long writing, with related links below.',
      buildContent: getArticleTemplateComponents,
    },
  ]);

export default getBlockPageTemplateRecords;
