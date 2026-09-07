import buildColumnsContentRecord from '../blocks/buildColumnsContentRecord.js';
import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';

const buildContactSplitSectionRecord = (sectionCopyRecord) =>
  buildTemplateSectionRecord({ themeName: 'light', anchorId: 'contact', ...sectionCopyRecord }, [
    buildColumnsContentRecord('two', [[{ type: 'db-form' }], [{ type: 'db-contact' }]], 'Contact columns'),
  ]);

export default buildContactSplitSectionRecord;
