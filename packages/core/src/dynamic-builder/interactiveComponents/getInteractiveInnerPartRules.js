import getInertChildFlags from '../customCode/getInertChildFlags.js';

const getInteractiveInnerPartRules = () => {
  const inertFlags = getInertChildFlags();
  const fixedFlags = { draggable: false, copyable: false, removable: false };
  const fixedBoxFlags = { ...fixedFlags, droppable: false };
  const quietFlags = { ...fixedBoxFlags, selectable: false, hoverable: false };
  const inertRule = (className, name) => ({ className, name, flags: inertFlags, lockSubtree: true });
  return {
    'db-navbar': [
      { className: 'db-navbar-nav', name: 'Navigation', flags: fixedBoxFlags },
      { className: 'db-navbar-brand', name: 'Brand', flags: fixedBoxFlags },
      { className: 'db-navbar-brand-text', name: 'Brand name', flags: fixedBoxFlags },
      { className: 'db-navbar-logo', name: 'Logo', flags: fixedBoxFlags },
      inertRule('db-navbar-burger', 'Menu button'),
      { className: 'db-navbar-panel', name: 'Menu panel', flags: fixedBoxFlags },
      inertRule('db-navbar-close', 'Close menu button'),
      { className: 'db-navbar-links', name: 'Menu links', flags: { ...fixedFlags, droppable: '[data-db-navbar-item]' } },
      { className: 'db-navbar-item', name: 'Menu item', flags: { draggable: '[data-db-navbar-menu]', droppable: false } },
      { className: 'db-navbar-link', name: 'Menu link', flags: fixedBoxFlags },
      { className: 'db-navbar-cta', name: 'Call to action', flags: fixedBoxFlags },
      inertRule('db-navbar-scrim', 'Menu backdrop'),
    ],
    'db-accordion-item': [
      { className: 'db-accordion-header', name: 'Question', flags: quietFlags },
      { className: 'db-accordion-trigger', name: 'Question button', flags: quietFlags },
      { className: 'db-accordion-title', name: 'Question text', flags: fixedBoxFlags },
      inertRule('db-accordion-chevron', 'Chevron'),
      { className: 'db-accordion-panel', name: 'Answer', flags: { ...fixedFlags, droppable: true } },
    ],
    'db-countdown': [
      { className: 'db-countdown-grid', name: 'Digits', flags: quietFlags },
      { className: 'db-countdown-segment', name: 'Countdown segment', flags: quietFlags },
      inertRule('db-countdown-value', 'Number'),
      { className: 'db-countdown-label', name: 'Segment label', flags: fixedBoxFlags },
      inertRule('db-countdown-message', 'Expiry message'),
      { attributeName: 'data-db-countdown-summary', name: 'Screen reader summary', flags: inertFlags },
    ],
    'db-announcement': [
      { className: 'db-announcement-text', name: 'Announcement text', flags: fixedBoxFlags },
      { className: 'db-announcement-link', name: 'Announcement link', flags: fixedBoxFlags },
      inertRule('db-announcement-close', 'Close button'),
    ],
    'db-breadcrumb': [
      { tagName: 'ol', name: 'Trail', flags: fixedBoxFlags },
      { tagName: 'li', name: 'Trail step', flags: { draggable: '.db-breadcrumb ol', droppable: false, copyable: false } },
      { tagName: 'a', name: 'Step link', flags: fixedBoxFlags },
    ],
    'db-social-links': [
      { tagName: 'li', name: 'Profile', flags: { draggable: '[data-db-type=social-links]', droppable: false, copyable: false } },
      { className: 'db-social-link', flags: fixedBoxFlags },
    ],
  };
};

export default getInteractiveInnerPartRules;
