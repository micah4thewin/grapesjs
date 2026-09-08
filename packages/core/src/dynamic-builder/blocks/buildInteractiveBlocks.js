import buildBlockDefinition from './buildBlockDefinition.js';
import buildDefaultDeadlineDate from './buildDefaultDeadlineDate.js';

const buildInteractiveBlocks = () => [
  buildBlockDefinition('db-accordion-faq', 'Accordion', 'Interactive', 'accordion', { type: 'db-accordion' }),
  buildBlockDefinition('db-tabs', 'Tabs', 'Interactive', 'tabs', { type: 'db-tabs' }),
  buildBlockDefinition('db-countdown', 'Countdown', 'Interactive', 'countdown', {
    type: 'db-countdown',
    attributes: { 'data-db-deadline-date': buildDefaultDeadlineDate() },
  }),
  buildBlockDefinition('db-navbar', 'Navbar', 'Interactive', 'navigation', { type: 'db-navbar' }),
  buildBlockDefinition('db-navbar-centered', 'Centered navbar', 'Interactive', 'navigation', {
    type: 'db-navbar',
    attributes: { 'data-db-layout': 'center', 'data-db-style': 'underline' },
  }),
  buildBlockDefinition('db-navbar-split', 'Split navbar', 'Interactive', 'navigation', {
    type: 'db-navbar',
    attributes: { 'data-db-layout': 'split', 'data-db-style': 'pill' },
  }),
  buildBlockDefinition('db-navbar-minimal', 'Minimal navbar', 'Interactive', 'navigation', {
    type: 'db-navbar',
    attributes: { 'data-db-style': 'minimal', 'data-db-cta': 'false' },
  }),
  buildBlockDefinition('db-breadcrumb', 'Breadcrumb', 'Interactive', 'breadcrumb', { type: 'db-breadcrumb' }),
  buildBlockDefinition('db-social-links', 'Social links', 'Interactive', 'social', { type: 'db-social-links' }),
  buildBlockDefinition('db-announcement-bar', 'Announcement', 'Interactive', 'callout', {
    type: 'db-announcement',
  }),
  buildBlockDefinition('db-alert-button', 'Popup button', 'Interactive', 'dialog', { type: 'db-alert-button' }),
];

export default buildInteractiveBlocks;
