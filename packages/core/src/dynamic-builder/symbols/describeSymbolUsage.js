import countOverriddenSymbolInstances from './countOverriddenSymbolInstances.js';
import countSymbolInstances from './countSymbolInstances.js';
import countSymbolPages from './countSymbolPages.js';

const describeSymbolUsage = (editor, symbolId) => {
  const instanceCount = countSymbolInstances(editor, symbolId);
  if (!instanceCount) return 'Not on any page yet';
  const pageCount = countSymbolPages(editor, symbolId);
  const overriddenCount = countOverriddenSymbolInstances(editor, symbolId);
  const pagesText = 'On ' + pageCount + (pageCount === 1 ? ' page' : ' pages');
  const copiesText = instanceCount > pageCount ? ' (' + instanceCount + ' copies)' : '';
  const changedText = overriddenCount
    ? ' \u00b7 ' +
      overriddenCount +
      (overriddenCount === 1 ? ' copy has its own changes' : ' copies have their own changes')
    : '';
  return pagesText + copiesText + changedText;
};

export default describeSymbolUsage;
