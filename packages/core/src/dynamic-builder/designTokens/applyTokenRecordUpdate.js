import captureTokenSnapshot from './captureTokenSnapshot.js';
import injectDesignTokenStyles from './injectDesignTokenStyles.js';
import resolveActiveDesignTokens from './resolveActiveDesignTokens.js';
import trackTokenUndoStep from './trackTokenUndoStep.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const applyTokenRecordUpdate = (editor, moduleOptions, tokenRecord, updateOptions = {}) => {
  const beforeSnapshot = captureTokenSnapshot(editor);
  updateSiteMetaRecord(editor, { designTokens: tokenRecord });
  injectDesignTokenStyles(editor, resolveActiveDesignTokens(editor, moduleOptions));
  if (!updateOptions.skipUndo) trackTokenUndoStep(editor, beforeSnapshot, updateOptions.stepLabel);
};

export default applyTokenRecordUpdate;
