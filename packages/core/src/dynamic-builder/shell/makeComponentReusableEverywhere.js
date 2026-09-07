import createSymbolFromComponent from '../symbols/createSymbolFromComponent.js';
import insertSymbolOnEveryPage from '../symbols/insertSymbolOnEveryPage.js';
import renderSymbolInstance from '../symbols/renderSymbolInstance.js';
import replaceComponentWithSymbolInstance from '../symbols/replaceComponentWithSymbolInstance.js';

const makeComponentReusableEverywhere = (editor, sourceComponent, symbolName, insertOptions) => {
  if (!sourceComponent) return null;
  const symbolRecord = createSymbolFromComponent(editor, sourceComponent, symbolName);
  if (!symbolRecord) return null;
  const instanceComponent = replaceComponentWithSymbolInstance(sourceComponent, symbolRecord.id);
  instanceComponent && renderSymbolInstance(editor, instanceComponent);
  insertSymbolOnEveryPage(editor, symbolRecord.id, insertOptions);
  return symbolRecord;
};

export default makeComponentReusableEverywhere;
