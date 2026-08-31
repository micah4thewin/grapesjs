import checkAccessibleControlText from './checkAccessibleControlText.js';
import checkAutoplayMedia from './checkAutoplayMedia.js';
import checkDocumentLanguage from './checkDocumentLanguage.js';
import checkFormControlLabels from './checkFormControlLabels.js';
import checkGenericLinkText from './checkGenericLinkText.js';
import checkHeadingStructure from './checkHeadingStructure.js';
import checkIconOnlyLabels from './checkIconOnlyLabels.js';
import checkImageAltText from './checkImageAltText.js';
import checkInteractiveTargetSize from './checkInteractiveTargetSize.js';
import checkTextContrast from './checkTextContrast.js';
import getAuditContext from './getAuditContext.js';
import runAuditChecks from './runAuditChecks.js';

const runAccessibilityAudit = (editor, moduleOptions) =>
  runAuditChecks(
    [
      checkImageAltText,
      checkHeadingStructure,
      checkAccessibleControlText,
      checkGenericLinkText,
      checkFormControlLabels,
      checkInteractiveTargetSize,
      checkDocumentLanguage,
      checkIconOnlyLabels,
      checkAutoplayMedia,
      checkTextContrast,
    ],
    getAuditContext(editor, moduleOptions),
  );

export default runAccessibilityAudit;
