import buildColumnsContentRecord from '../blocks/buildColumnsContentRecord.js';
import buildTemplateListRecord from './buildTemplateListRecord.js';
import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';

const buildDetailListSectionRecord = (sectionCopyRecord) =>
  buildTemplateSectionRecord({ centered: true, ...sectionCopyRecord }, [
    buildColumnsContentRecord(
      'two',
      (sectionCopyRecord.columnItemTexts || []).map((itemTexts) => [buildTemplateListRecord(itemTexts)]),
      'Detail columns',
    ),
  ]);

export default buildDetailListSectionRecord;
