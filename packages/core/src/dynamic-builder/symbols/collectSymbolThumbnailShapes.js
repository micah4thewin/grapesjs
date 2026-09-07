import buildPreviewShapeMarkup from '../blockPreviews/buildPreviewShapeMarkup.js';
import buildThumbnailLeafShape from './buildThumbnailLeafShape.js';
import collectDefinitionLeafKinds from './collectDefinitionLeafKinds.js';
import resolveSymbolInsertPlacement from './resolveSymbolInsertPlacement.js';

const buildNavbarShapes = () =>
  [
    buildPreviewShapeMarkup(10, 10, 76, 10, { opacity: 0.16, radius: 3 }),
    buildPreviewShapeMarkup(14, 13, 12, 4, { accent: true, opacity: 0.65 }),
    buildPreviewShapeMarkup(52, 13, 8, 4, { opacity: 0.35 }),
    buildPreviewShapeMarkup(63, 13, 8, 4, { opacity: 0.35 }),
    buildPreviewShapeMarkup(74, 13, 8, 4, { opacity: 0.35 }),
  ].join('');

const buildFooterShapes = () =>
  [
    buildPreviewShapeMarkup(10, 40, 76, 12, { opacity: 0.3, radius: 3 }),
    buildPreviewShapeMarkup(14, 44, 18, 4, { opacity: 0.5, accent: true }),
    buildPreviewShapeMarkup(60, 44, 22, 4, { opacity: 0.4 }),
  ].join('');

const collectSymbolThumbnailShapes = (editor, symbolRecord) => {
  const placement = resolveSymbolInsertPlacement(editor, symbolRecord);
  const isTopLevelBar = placement === 'top';
  const shapeMarkups = [buildPreviewShapeMarkup(6, 6, 84, 48, { opacity: 0.07, radius: 4 })];
  shapeMarkups.push(isTopLevelBar ? buildNavbarShapes() : buildFooterShapes());
  const maxY = isTopLevelBar ? 50 : 36;
  let currentY = isTopLevelBar ? 26 : 12;
  collectDefinitionLeafKinds(symbolRecord.components, 4).forEach((leafKind) => {
    const leafShape = buildThumbnailLeafShape(leafKind, 14, currentY);
    if (currentY + leafShape.height > maxY) return;
    shapeMarkups.push(leafShape.markup);
    currentY += leafShape.height + 4;
  });
  return shapeMarkups;
};

export default collectSymbolThumbnailShapes;
