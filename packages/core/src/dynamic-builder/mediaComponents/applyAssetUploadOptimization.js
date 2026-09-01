import handleAssetFileUpload from './handleAssetFileUpload.js';

const applyAssetUploadOptimization = (editor, moduleOptions) => {
  const editorConfig = editor.getConfig && editor.getConfig();
  if (!editorConfig) return;
  const maxDimension = Number.isFinite(moduleOptions.maxImageDimension) ? moduleOptions.maxImageDimension : 1600;
  const assetConfig = editorConfig.assetManager || {};
  editorConfig.assetManager = assetConfig;
  assetConfig.uploadFile = (uploadEvent) => handleAssetFileUpload(editor, uploadEvent, maxDimension);
};

export default applyAssetUploadOptimization;
