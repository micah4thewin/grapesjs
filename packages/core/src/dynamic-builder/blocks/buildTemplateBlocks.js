import getAboutTemplateComponents from './getAboutTemplateComponents.js';
import getContactTemplateComponents from './getContactTemplateComponents.js';
import getIconMarkup from '../support/getIconMarkup.js';
import getLandingTemplateComponents from './getLandingTemplateComponents.js';

const buildTemplateBlocks = () => [
  {
    id: 'db-template-landing',
    label: 'Landing page',
    category: 'Page templates',
    media: getIconMarkup('appShell', { size: 28 }),
    select: true,
    content: getLandingTemplateComponents(),
  },
  {
    id: 'db-template-about',
    label: 'About page',
    category: 'Page templates',
    media: getIconMarkup('team', { size: 28 }),
    select: true,
    content: getAboutTemplateComponents(),
  },
  {
    id: 'db-template-contact',
    label: 'Contact page',
    category: 'Page templates',
    media: getIconMarkup('contact', { size: 28 }),
    select: true,
    content: getContactTemplateComponents(),
  },
];

export default buildTemplateBlocks;
