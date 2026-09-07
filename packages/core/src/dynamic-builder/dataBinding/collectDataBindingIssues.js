import collectUnresolvedBindingTokens from './collectUnresolvedBindingTokens.js';
import countDataSourceUsages from './countDataSourceUsages.js';
import getDataSourceRegistry from './getDataSourceRegistry.js';
import listDataSourceNames from './listDataSourceNames.js';
import listRepeatersAcrossPages from './listRepeatersAcrossPages.js';
import resolveRepeaterItems from './resolveRepeaterItems.js';
import resolveRepeaterSettings from './resolveRepeaterSettings.js';

const collectDataBindingIssues = (editor) => {
  const registryRecord = getDataSourceRegistry(editor);
  const sourceNames = listDataSourceNames(editor);
  const usageMap = countDataSourceUsages(editor);
  const missingSources = [];
  const emptyRepeaters = [];
  listRepeatersAcrossPages(editor).forEach(({ page, component }) => {
    const settings = resolveRepeaterSettings(component.getAttributes());
    const pageName = (page.getName && page.getName()) || 'Page';
    const issueRecord = { sourceName: settings.sourceName, page, pageName, component };
    if (sourceNames.indexOf(settings.sourceName) < 0) missingSources.push(issueRecord);
    else if (!resolveRepeaterItems(registryRecord, settings).length) emptyRepeaters.push(issueRecord);
  });
  const emptySources = sourceNames.filter((sourceName) => {
    const sourceValue = registryRecord[sourceName];
    return Array.isArray(sourceValue) ? !sourceValue.length : !Object.keys(sourceValue || {}).length;
  });
  const unusedSources = sourceNames.filter((sourceName) => !usageMap[sourceName]);
  return {
    unresolvedTokens: collectUnresolvedBindingTokens(editor),
    missingSources,
    emptyRepeaters,
    emptySources,
    unusedSources,
  };
};

export default collectDataBindingIssues;
