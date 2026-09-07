import insertAssetEditButtons from './insertAssetEditButtons.js';

const wireAssetManagerEditButtons = (editor) => {
  const scheduleInsert = () => setTimeout(() => insertAssetEditButtons(editor), 0);
  editor.on('asset:open', scheduleInsert);
  editor.on('command:run:core:open-assets', scheduleInsert);
  editor.on('asset:add', scheduleInsert);
  editor.on('asset:remove', scheduleInsert);
  editor.on('asset:update', scheduleInsert);
};

export default wireAssetManagerEditButtons;
