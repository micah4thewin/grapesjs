import buildPreviewCircleMarkup from './buildPreviewCircleMarkup.js';
import buildPreviewShapeMarkup from './buildPreviewShapeMarkup.js';

const buildDataRowsMarkup = (rowAccentMarkup) =>
  [10, 25, 40]
    .map((rowY, rowIndex) =>
      [
        buildPreviewShapeMarkup(10, rowY, 76, 11, { opacity: 0.26 - rowIndex * 0.07, radius: 3 }),
        rowAccentMarkup(rowY),
        buildPreviewShapeMarkup(30, rowY + 3, 40, 4, { opacity: 0.3 }),
      ].join(''),
    )
    .join('');

const getDataPreviewShapes = () => ({
  'db-team-from-data': buildDataRowsMarkup((rowY) =>
    buildPreviewCircleMarkup(19, rowY + 5.5, 3.5, { opacity: 0.5, accent: true }),
  ),
  'db-testimonials-from-data': buildDataRowsMarkup((rowY) =>
    buildPreviewShapeMarkup(15, rowY + 3, 5, 5, { opacity: 0.55, accent: true, radius: 1 }),
  ),
  'db-faq-from-data': buildDataRowsMarkup((rowY) =>
    buildPreviewShapeMarkup(78, rowY + 4.5, 5, 2, { opacity: 0.55, accent: true, radius: 1 }),
  ),
});

export default getDataPreviewShapes;
