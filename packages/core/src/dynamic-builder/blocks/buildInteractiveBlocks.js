import buildBlockDefinition from './buildBlockDefinition.js';

const buildInteractiveBlocks = () => {
  const thirtyDaysInMilliseconds = 30 * 24 * 60 * 60 * 1000;
  const defaultDeadlineDate = new Date(Date.now() + thirtyDaysInMilliseconds).toISOString().slice(0, 10);
  return [
    buildBlockDefinition('db-accordion-faq', 'Accordion', 'Interactive', 'accordion', { type: 'db-accordion' }),
    buildBlockDefinition('db-tabs', 'Tabs', 'Interactive', 'tabs', { type: 'db-tabs' }),
    buildBlockDefinition('db-countdown', 'Countdown', 'Interactive', 'countdown', {
      type: 'db-countdown',
      attributes: { 'data-db-deadline-date': defaultDeadlineDate },
    }),
    buildBlockDefinition('db-navbar', 'Navbar', 'Interactive', 'navigation', { type: 'db-navbar' }),
    buildBlockDefinition('db-breadcrumb', 'Breadcrumb', 'Interactive', 'breadcrumb', { type: 'db-breadcrumb' }),
    buildBlockDefinition('db-social-links', 'Social links', 'Interactive', 'social', { type: 'db-social-links' }),
    buildBlockDefinition('db-announcement-bar', 'Announcement', 'Interactive', 'callout', {
      type: 'db-announcement',
    }),
    buildBlockDefinition('db-alert-button', 'Dialog button', 'Interactive', 'dialog', { type: 'db-alert-button' }),
  ];
};

export default buildInteractiveBlocks;
