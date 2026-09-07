import applyLimitOffsetToItems from './applyLimitOffsetToItems.js';
import filterSourceItems from './filterSourceItems.js';
import resolveSourceItems from './resolveSourceItems.js';
import sortSourceItems from './sortSourceItems.js';
import isPlainRecord from '../support/isPlainRecord.js';

const resolveRepeaterItems = (registry, settings) => {
  const safeRegistry = isPlainRecord(registry) ? registry : {};
  const sourceName = settings && settings.sourceName ? settings.sourceName : '';
  const hasSource = Boolean(sourceName) && Object.prototype.hasOwnProperty.call(safeRegistry, sourceName);
  const sourceItems = hasSource ? resolveSourceItems(safeRegistry[sourceName]) : [];
  const filteredItems = filterSourceItems(sourceItems, settings.filterField, settings.filterValue);
  const sortedItems = sortSourceItems(filteredItems, settings.sortField, settings.sortDirection);
  return applyLimitOffsetToItems(sortedItems, settings.offsetValue, settings.limitValue);
};

export default resolveRepeaterItems;
