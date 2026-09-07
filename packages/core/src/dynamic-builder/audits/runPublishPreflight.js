import capAuditFindings from './capAuditFindings.js';
import collectMissingAltItems from './collectMissingAltItems.js';
import collectPlaceholderLinkItems from './collectPlaceholderLinkItems.js';
import collectPlaceholderTextItems from './collectPlaceholderTextItems.js';
import collectSiteSettingItems from './collectSiteSettingItems.js';
import collectUnconnectedFormItems from './collectUnconnectedFormItems.js';
import collectUnresolvedTokenItems from './collectUnresolvedTokenItems.js';
import countFindingsBySeverity from './countFindingsBySeverity.js';

const getPreflightCollectors = () => [
  { group: 'Site', collectItems: collectSiteSettingItems, remainderLabel: 'more site settings need attention' },
  { group: 'Forms', collectItems: collectUnconnectedFormItems, remainderLabel: 'more forms are not connected' },
  { group: 'Links', collectItems: collectPlaceholderLinkItems, remainderLabel: 'more links still go nowhere' },
  { group: 'Content', collectItems: collectPlaceholderTextItems, remainderLabel: 'more sample texts remain' },
  { group: 'Images', collectItems: collectMissingAltItems, remainderLabel: 'more images need attention' },
  { group: 'Data', collectItems: collectUnresolvedTokenItems, remainderLabel: 'more data tokens are unresolved' },
];

const runPublishPreflight = (editor, moduleOptions) => {
  const preflightContext = { editor, moduleOptions: moduleOptions || {} };
  const items = getPreflightCollectors().flatMap((collectorRecord) => {
    try {
      return capAuditFindings(
        collectorRecord.collectItems(editor),
        preflightContext,
        collectorRecord.group,
        collectorRecord.remainderLabel,
      );
    } catch (collectError) {
      console.error('dynamic-builder preflight check failed', collectError);
      return [];
    }
  });
  const preflightResult = {
    items,
    counts: countFindingsBySeverity(items),
    isReady: items.length === 0,
    completedAt: Date.now(),
    pageCount: editor.Pages && editor.Pages.getAll ? editor.Pages.getAll().length : 1,
  };
  editor.getModel().set('dbPreflightResult', preflightResult);
  editor.trigger('db:preflight:complete', preflightResult);
  return preflightResult;
};

export default runPublishPreflight;
