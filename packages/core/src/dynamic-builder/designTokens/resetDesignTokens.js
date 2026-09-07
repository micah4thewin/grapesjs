import applyTokenRecordUpdate from './applyTokenRecordUpdate.js';
import buildBaselineTokenRecord from './buildBaselineTokenRecord.js';
import captureTokenSnapshot from './captureTokenSnapshot.js';
import syncDesignKitFontStyles from './syncDesignKitFontStyles.js';
import trackTokenUndoStep from './trackTokenUndoStep.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const resetDesignTokens = (editor, moduleOptions) => {
  const beforeSnapshot = captureTokenSnapshot(editor);
  updateSiteMetaRecord(editor, { designKit: { kitId: '', fontFamilies: [] } });
  syncDesignKitFontStyles(editor);
  applyTokenRecordUpdate(editor, moduleOptions, buildBaselineTokenRecord(moduleOptions), { skipUndo: true });
  trackTokenUndoStep(editor, beforeSnapshot, 'Reset design tokens');
};

export default resetDesignTokens;
