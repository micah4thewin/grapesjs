import isPlainRecord from '../support/isPlainRecord.js';
import resolveActiveDesignTokens from '../designTokens/resolveActiveDesignTokens.js';

const resolveExportDesignTokens = (editor) => {
  const storedSnapshot = editor.getModel().get('dbDesignTokensSnapshot');
  if (typeof storedSnapshot === 'string' && storedSnapshot) {
    try {
      const parsedSnapshot = JSON.parse(storedSnapshot);
      if (isPlainRecord(parsedSnapshot) && Object.keys(parsedSnapshot).length) return parsedSnapshot;
    } catch (parseError) {
      return resolveActiveDesignTokens(editor, {});
    }
  }
  return resolveActiveDesignTokens(editor, {});
};

export default resolveExportDesignTokens;
