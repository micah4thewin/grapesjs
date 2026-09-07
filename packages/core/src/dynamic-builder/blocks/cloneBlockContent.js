const cloneBlockContent = (blockModel) => JSON.parse(JSON.stringify(blockModel.get('content')));

export default cloneBlockContent;
