import applyDesignKitSelection from '../designTokens/applyDesignKitSelection.js';
import getDesignKitRecords from '../designTokens/getDesignKitRecords.js';

const applySkeletonDesignKit = (editor, pluginOptions, kitId) => {
  const kitRecord = getDesignKitRecords().find((candidateRecord) => candidateRecord.kitId === kitId);
  if (!kitRecord) return false;
  applyDesignKitSelection(editor, (pluginOptions && pluginOptions.designTokens) || {}, kitRecord);
  return true;
};

export default applySkeletonDesignKit;
