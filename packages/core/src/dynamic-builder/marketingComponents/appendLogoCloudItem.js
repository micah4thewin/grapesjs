import buildLogoItemRecord from './buildLogoItemRecord.js';

const appendLogoCloudItem = (editor, logoCloudComponent) => {
  if (!logoCloudComponent || !logoCloudComponent.append) return;
  const logoNumber = logoCloudComponent.components().length + 1;
  const addedItem = logoCloudComponent.append(buildLogoItemRecord('Partner ' + logoNumber))[0];
  if (addedItem && editor && editor.select) editor.select(addedItem);
};

export default appendLogoCloudItem;
