import applyTokenRecordUpdate from './applyTokenRecordUpdate.js';
import buildDesignKitTokenPatch from './buildDesignKitTokenPatch.js';
import captureTokenSnapshot from './captureTokenSnapshot.js';
import syncDesignKitFontStyles from './syncDesignKitFontStyles.js';
import trackTokenUndoStep from './trackTokenUndoStep.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const applyDesignKitSelection = (editor, moduleOptions, kitRecord) => {
  const beforeSnapshot = captureTokenSnapshot(editor);
  const fontFamilies = Array.isArray(kitRecord.fontFamilies) ? kitRecord.fontFamilies.slice() : [];
  updateSiteMetaRecord(editor, { designKit: { kitId: kitRecord.kitId, fontFamilies } });
  syncDesignKitFontStyles(editor);
  applyTokenRecordUpdate(editor, moduleOptions, buildDesignKitTokenPatch(moduleOptions, kitRecord.tokens), {
    skipUndo: true,
  });
  trackTokenUndoStep(editor, beforeSnapshot, `Design kit: ${kitRecord.kitName || kitRecord.kitId}`);
  editor.trigger('db:design-kit:applied', { kitId: kitRecord.kitId });
};

export default applyDesignKitSelection;
