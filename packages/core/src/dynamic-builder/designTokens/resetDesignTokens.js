import applyTokenRecordUpdate from './applyTokenRecordUpdate.js';
import buildBaselineTokenRecord from './buildBaselineTokenRecord.js';
import syncDesignKitFontStyles from './syncDesignKitFontStyles.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const resetDesignTokens = (editor, moduleOptions) => {
  updateSiteMetaRecord(editor, { designKit: { kitId: '', fontFamilies: [] } });
  syncDesignKitFontStyles(editor);
  applyTokenRecordUpdate(editor, moduleOptions, buildBaselineTokenRecord(moduleOptions));
};

export default resetDesignTokens;
