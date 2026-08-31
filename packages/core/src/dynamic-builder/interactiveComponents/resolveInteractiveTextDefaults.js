import deepMergeRecords from '../support/deepMergeRecords.js';
import isPlainRecord from '../support/isPlainRecord.js';

const resolveInteractiveTextDefaults = (moduleOptions) => {
  const baseTextDefaults = {
    accordionItemTitles: [
      'How does the free trial work?',
      'Can I switch plans at any time?',
      'What happens when I cancel?',
    ],
    accordionPanelText: 'Use this space to answer the question with a clear and reassuring explanation.',
    accordionItemTitle: 'New accordion question',
    tabLabels: ['Overview', 'Features', 'Pricing'],
    tabLabel: 'New tab',
    tabPanelText: 'Describe this tab with a short paragraph so visitors know what they will find here.',
    countdownExpiryMessage: 'This offer has ended.',
    countdownSummaryText: 'Countdown to the deadline',
    navbarBrandText: 'Acme Studio',
    navbarLinkLabels: ['Home', 'About', 'Contact'],
    navbarToggleLabel: 'Toggle navigation menu',
    breadcrumbTrail: ['Home', 'Library', 'Current page'],
    announcementText: 'Free shipping on every order this week.',
    announcementCloseLabel: 'Dismiss announcement',
  };
  const overrideRecord =
    isPlainRecord(moduleOptions) && isPlainRecord(moduleOptions.textDefaults) ? moduleOptions.textDefaults : {};
  return deepMergeRecords(baseTextDefaults, overrideRecord);
};

export default resolveInteractiveTextDefaults;
