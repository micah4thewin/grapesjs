import isPlainRecord from '../support/isPlainRecord.js';

const collectBindingPathEntries = (editor, moduleOptions) => {
  const pathEntries = [];
  const visitDataNode = (dataNode, pathPrefix, depthLevel) => {
    if (depthLevel > 4) return;
    if (isPlainRecord(dataNode)) {
      Object.keys(dataNode).forEach((recordKey) => {
        const nodePath = pathPrefix ? `${pathPrefix}.${recordKey}` : recordKey;
        visitDataNode(dataNode[recordKey], nodePath, depthLevel + 1);
      });
      return;
    }
    if (Array.isArray(dataNode)) {
      if (dataNode.length) visitDataNode(dataNode[0], `${pathPrefix}.0`, depthLevel + 1);
      return;
    }
    if (pathPrefix) pathEntries.push(`{{db:${pathPrefix}}}`);
  };
  const editorModel = editor && editor.getModel ? editor.getModel() : null;
  const dataSourcesRecord = editorModel && editorModel.get ? editorModel.get('dbDataSources') : null;
  if (isPlainRecord(dataSourcesRecord)) visitDataNode(dataSourcesRecord, '', 0);
  const extraPaths =
    moduleOptions && Array.isArray(moduleOptions.extraBindingPaths) ? moduleOptions.extraBindingPaths : [];
  extraPaths.forEach((extraPath) => {
    const pathText = String(extraPath || '').trim();
    if (!pathText) return;
    pathEntries.push(pathText.indexOf('{{') === 0 ? pathText : `{{db:${pathText}}}`);
  });
  return Array.from(new Set(pathEntries)).slice(0, 200);
};

export default collectBindingPathEntries;
