import captureSymbolLeafDefinition from './captureSymbolLeafDefinition.js';
import getOverridableLeafKind from './getOverridableLeafKind.js';

const collectBranchLeaves = (parentComponent, pathPrefix, baselineRecord) => {
  const childComponents = parentComponent && parentComponent.components ? parentComponent.components() : null;
  if (!childComponents || !childComponents.forEach) return baselineRecord;
  childComponents.forEach((childComponent, childIndex) => {
    const childPath = pathPrefix ? pathPrefix + '.' + childIndex : String(childIndex);
    if (getOverridableLeafKind(childComponent)) {
      baselineRecord[childPath] = captureSymbolLeafDefinition(childComponent);
      return;
    }
    collectBranchLeaves(childComponent, childPath, baselineRecord);
  });
  return baselineRecord;
};

const collectSymbolLeafBaseline = (instanceComponent) => collectBranchLeaves(instanceComponent, '', {});

export default collectSymbolLeafBaseline;
