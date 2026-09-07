import listSymbolInstances from './listSymbolInstances.js';
import resolveSymbolRootDefinition from './resolveSymbolRootDefinition.js';

const topLevelTypes = ['db-navbar', 'db-announcement', 'db-breadcrumb'];
const bottomLevelTypes = ['db-footer'];

const resolvePlacementFromInstance = (editor, symbolRecord) => {
  const existingInstance = listSymbolInstances(editor, symbolRecord.id)[0];
  const parentComponent = existingInstance && existingInstance.parent ? existingInstance.parent() : null;
  if (!parentComponent || parentComponent.get('type') !== 'wrapper') return '';
  const siblingCount = parentComponent.components().length;
  const instanceIndex = parentComponent.components().indexOf(existingInstance);
  if (siblingCount < 2) return '';
  if (instanceIndex === 0) return 'top';
  return instanceIndex === siblingCount - 1 ? 'bottom' : '';
};

const resolvePlacementFromDefinition = (symbolRecord) => {
  const rootDefinition = resolveSymbolRootDefinition(symbolRecord);
  const rootType = rootDefinition ? String(rootDefinition.type || '') : '';
  const rootTag = rootDefinition ? String(rootDefinition.tagName || '').toLowerCase() : '';
  if (topLevelTypes.indexOf(rootType) >= 0 || rootTag === 'header' || rootTag === 'nav') return 'top';
  if (bottomLevelTypes.indexOf(rootType) >= 0 || rootTag === 'footer') return 'bottom';
  const nameText = String(symbolRecord.name || '').toLowerCase();
  if (/footer/.test(nameText)) return 'bottom';
  return /header|nav|menu|announcement|banner/.test(nameText) ? 'top' : '';
};

const resolveSymbolInsertPlacement = (editor, symbolRecord) => {
  if (!symbolRecord) return 'bottom';
  return resolvePlacementFromInstance(editor, symbolRecord) || resolvePlacementFromDefinition(symbolRecord) || 'bottom';
};

export default resolveSymbolInsertPlacement;
