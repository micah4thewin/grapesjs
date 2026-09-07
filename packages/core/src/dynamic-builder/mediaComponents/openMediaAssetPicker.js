import showToastNotice from '../support/showToastNotice.js';

const openMediaAssetPicker = (editor, handleAssetChosen, hintText) => {
  const assetManager = editor.AssetManager;
  if (!assetManager || !assetManager.open) return;
  const pickerState = { lastAsset: null, lastChosenAt: 0 };
  assetManager.open({
    types: ['image'],
    select: (chosenAsset, isComplete) => {
      const chosenAt = Date.now();
      const repeatsLastChoice =
        Boolean(isComplete) && chosenAsset === pickerState.lastAsset && chosenAt - pickerState.lastChosenAt < 700;
      if (!repeatsLastChoice) handleAssetChosen(chosenAsset);
      pickerState.lastAsset = chosenAsset;
      pickerState.lastChosenAt = chosenAt;
      if (isComplete) assetManager.close();
    },
  });
  if (hintText) showToastNotice(editor, hintText, { duration: 5000 });
};

export default openMediaAssetPicker;
