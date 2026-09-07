const isTemplateBlock = (blockModel) =>
  Boolean(blockModel && blockModel.get) && String(blockModel.get('id') || blockModel.id).indexOf('db-template-') === 0;

export default isTemplateBlock;
