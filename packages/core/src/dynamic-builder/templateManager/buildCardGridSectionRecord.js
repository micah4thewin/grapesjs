import buildCardSampleRecord from '../blocks/buildCardSampleRecord.js';
import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';
import buildThreeUpSampleColumns from '../blocks/buildThreeUpSampleColumns.js';

const buildCardGridSectionRecord = (sectionCopyRecord) =>
  buildTemplateSectionRecord({ centered: true, ...sectionCopyRecord }, [
    buildThreeUpSampleColumns(buildCardSampleRecord, 'Card grid'),
  ]);

export default buildCardGridSectionRecord;
