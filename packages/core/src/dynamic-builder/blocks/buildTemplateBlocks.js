import getAboutTemplateComponents from './getAboutTemplateComponents.js';
import getArticleTemplateComponents from './getArticleTemplateComponents.js';
import getContactTemplateComponents from './getContactTemplateComponents.js';
import getIconMarkup from '../support/getIconMarkup.js';
import getLandingTemplateComponents from './getLandingTemplateComponents.js';
import getLaunchTemplateComponents from './getLaunchTemplateComponents.js';
import getPortfolioTemplateComponents from './getPortfolioTemplateComponents.js';
import getPricingTemplateComponents from './getPricingTemplateComponents.js';
import getServicesTemplateComponents from './getServicesTemplateComponents.js';
import getSupportTemplateComponents from './getSupportTemplateComponents.js';

const buildTemplateBlocks = () => {
  const templateEntries = [
    ['db-template-landing', 'Landing page', 'appShell', getLandingTemplateComponents],
    ['db-template-about', 'About page', 'team', getAboutTemplateComponents],
    ['db-template-contact', 'Contact page', 'contact', getContactTemplateComponents],
    ['db-template-portfolio', 'Portfolio page', 'gallery', getPortfolioTemplateComponents],
    ['db-template-services', 'Services page', 'features', getServicesTemplateComponents],
    ['db-template-pricing', 'Pricing page', 'pricing', getPricingTemplateComponents],
    ['db-template-support', 'Support page', 'faq', getSupportTemplateComponents],
    ['db-template-launch', 'Launch page', 'countdown', getLaunchTemplateComponents],
    ['db-template-article', 'Article page', 'article', getArticleTemplateComponents],
  ];
  return templateEntries.map(([templateId, templateLabel, iconName, buildComponents]) => ({
    id: templateId,
    label: templateLabel,
    category: 'Page templates',
    media: getIconMarkup(iconName, { size: 28 }),
    select: true,
    content: buildComponents(),
  }));
};

export default buildTemplateBlocks;
