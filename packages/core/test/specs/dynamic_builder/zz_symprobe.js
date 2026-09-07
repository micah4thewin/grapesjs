import grapesjs from '../../../src';
import getSymbolOverrides from '../../../src/dynamic-builder/symbols/getSymbolOverrides';
import insertSymbolInstance from '../../../src/dynamic-builder/symbols/insertSymbolInstance';
import saveSymbolRecord from '../../../src/dynamic-builder/symbols/saveSymbolRecord';
import captureSymbolLeafDefinition from '../../../src/dynamic-builder/symbols/captureSymbolLeafDefinition';
import normalizeDefinitionRecord from '../../../src/dynamic-builder/symbols/normalizeDefinitionRecord';
import resolveDefinitionAtPath from '../../../src/dynamic-builder/symbols/resolveDefinitionAtPath';
import getSymbolRecord from '../../../src/dynamic-builder/symbols/getSymbolRecord';

const textLeaf = (contentText) => ({ tagName: 'p', type: 'text', components: contentText });

describe('probe', () => {
  test('override paths', () => {
    const editor = grapesjs.init({ headless: true, storageManager: false, plugins: [grapesjs.dynamicBuilder] });
    saveSymbolRecord(editor, {
      id: 'sym-ovr',
      name: 'Hero',
      components: [
        { tagName: 'div', components: [{ type: 'db-heading', components: 'Shared title' }, textLeaf('body')] },
      ],
    });
    const first = insertSymbolInstance(editor, 'sym-ovr');
    const second = insertSymbolInstance(editor, 'sym-ovr');
    const heading = first.components().at(0).components().at(0);
    heading.components('Only here');
    console.log('P1 first', JSON.stringify(Object.keys(getSymbolOverrides(first))));
    console.log('P1 second', JSON.stringify(Object.keys(getSymbolOverrides(second))));
    console.log('P1 second overrides', JSON.stringify(getSymbolOverrides(second)).slice(0, 600));
    heading.components('Shared title');
    console.log('P2 first', JSON.stringify(getSymbolOverrides(first)).slice(0, 600));
    const captured = captureSymbolLeafDefinition(heading);
    const master = resolveDefinitionAtPath(getSymbolRecord(editor, 'sym-ovr').components, '0.0');
    console.log('CAPTURED', JSON.stringify(normalizeDefinitionRecord(captured)));
    console.log('MASTER', JSON.stringify(normalizeDefinitionRecord(master)));
    editor.destroy();
  });
});
