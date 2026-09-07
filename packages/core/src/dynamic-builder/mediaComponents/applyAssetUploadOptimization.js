import handleAssetFileUpload from './handleAssetFileUpload.js';
import restrictAssetUploadToImages from './restrictAssetUploadToImages.js';

const applyAssetUploadOptimization = (editor, moduleOptions) => {
  const maxDimension = Number.isFinite(moduleOptions.maxImageDimension) ? moduleOptions.maxImageDimension : 1600;
  const uploadHandler = (uploadEvent) => handleAssetFileUpload(editor, uploadEvent, maxDimension);
  const assetManagerModule = editor.AssetManager;
  const moduleConfig = assetManagerModule && assetManagerModule.getConfig ? assetManagerModule.getConfig() : null;
  if (moduleConfig) moduleConfig.uploadFile = uploadHandler;
  const editorConfig = editor.getConfig && editor.getConfig();
  const editorAssetConfig = editorConfig && editorConfig.assetManager;
  if (editorAssetConfig && typeof editorAssetConfig === 'object') editorAssetConfig.uploadFile = uploadHandler;
  restrictAssetUploadToImages(editor);
};

export default applyAssetUploadOptimization;
