import buildTemplateButtonGroupRecord from './buildTemplateButtonGroupRecord.js';
import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';

const buildCtaBandSectionRecord = (sectionCopyRecord) =>
  buildTemplateSectionRecord({ centered: true, themeName: 'brand', layoutName: 'narrow', ...sectionCopyRecord }, [
    buildTemplateButtonGroupRecord(sectionCopyRecord.buttonRecords, 'center'),
  ]);

export default buildCtaBandSectionRecord;
