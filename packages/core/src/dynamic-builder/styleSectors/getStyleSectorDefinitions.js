import buildBackgroundsSectorDefinition from './buildBackgroundsSectorDefinition.js';
import buildBordersSectorDefinition from './buildBordersSectorDefinition.js';
import buildEffectsSectorDefinition from './buildEffectsSectorDefinition.js';
import buildFlexboxSectorDefinition from './buildFlexboxSectorDefinition.js';
import buildGridSectorDefinition from './buildGridSectorDefinition.js';
import buildLayoutSectorDefinition from './buildLayoutSectorDefinition.js';
import buildSizingSectorDefinition from './buildSizingSectorDefinition.js';
import buildSpacingSectorDefinition from './buildSpacingSectorDefinition.js';
import buildTypographySectorDefinition from './buildTypographySectorDefinition.js';

const getStyleSectorDefinitions = (moduleOptions) => {
  const safeOptions = moduleOptions || {};
  const baseDefinitions = [
    buildLayoutSectorDefinition(),
    buildFlexboxSectorDefinition(),
    buildGridSectorDefinition(),
    buildSpacingSectorDefinition(),
    buildSizingSectorDefinition(),
    buildTypographySectorDefinition(),
    buildBackgroundsSectorDefinition(),
    buildBordersSectorDefinition(),
    buildEffectsSectorDefinition(),
  ];
  const extraSectors = Array.isArray(safeOptions.extraSectors) ? safeOptions.extraSectors : [];
  const validExtraSectors = extraSectors.filter((sector) => sector && sector.id && sector.name);
  const allDefinitions = baseDefinitions.concat(validExtraSectors);
  const openSectorIds = Array.isArray(safeOptions.openSectorIds) ? safeOptions.openSectorIds : null;
  if (!openSectorIds) return allDefinitions;
  return allDefinitions.map((definition) => ({
    ...definition,
    open: openSectorIds.indexOf(definition.id) >= 0,
  }));
};

export default getStyleSectorDefinitions;
