import captureTokenSnapshot from './captureTokenSnapshot.js';
import resolveActiveDesignTokens from './resolveActiveDesignTokens.js';
import toSlugText from '../support/toSlugText.js';

const buildCustomKitRecord = (editor, moduleOptions, kitName) => {
  const activeTokens = resolveActiveDesignTokens(editor, moduleOptions);
  const snapshot = captureTokenSnapshot(editor);
  const safeName = String(kitName || '').trim() || 'My kit';
  return {
    kitId: `custom-${toSlugText(safeName) || 'kit'}-${Date.now().toString(36)}`,
    kitName: safeName,
    kitHint: 'Saved from this site',
    fontFamilies: snapshot.designKit.fontFamilies,
    tokens: { color: { ...(activeTokens.color || {}) }, font: { ...(activeTokens.font || {}) } },
    isCustom: true,
  };
};

export default buildCustomKitRecord;
