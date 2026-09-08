import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import beginSymbolEditing from '../../../src/dynamic-builder/symbols/beginSymbolEditing';
import createSymbolFromComponent from '../../../src/dynamic-builder/symbols/createSymbolFromComponent';
import finishSymbolEditing from '../../../src/dynamic-builder/symbols/finishSymbolEditing';
import getSymbolRecord from '../../../src/dynamic-builder/symbols/getSymbolRecord';
import renderSymbolInstance from '../../../src/dynamic-builder/symbols/renderSymbolInstance';
import replaceComponentWithSymbolInstance from '../../../src/dynamic-builder/symbols/replaceComponentWithSymbolInstance';

const findRuleStyles = (editor, styleValue) =>
  editor.Css.getRules()
    .filter((styleRule) => JSON.stringify(styleRule.getStyle()).indexOf(styleValue) >= 0)
    .map((styleRule) => styleRule.selectorsToString());

describe('Dynamic builder reusable component styles', () => {
  let editor;

  beforeEach(() => {
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, grapesjs.dynamicBuilder],
    });
    fixJsDomIframe(editor.getModel().shallow);
  });

  afterEach(() => {
    editor.destroy();
  });

  const makeSymbol = () => {
    const sectionComponent = editor.getWrapper().append({
      type: 'db-section',
      components: [{ tagName: 'p', type: 'text', classes: ['promo-copy'], components: 'Hello' }],
    })[0];
    const symbolRecord = createSymbolFromComponent(editor, sectionComponent, 'Promo');
    const firstInstance = replaceComponentWithSymbolInstance(sectionComponent, symbolRecord.id);
    renderSymbolInstance(editor, firstInstance);
    const secondInstance = editor
      .getWrapper()
      .append({ type: 'db-symbol', attributes: { 'data-db-symbol': symbolRecord.id } })[0];
    return { symbolRecord, firstInstance, secondInstance };
  };

  test('style edits made while editing everywhere reach every copy through a shared class', () => {
    const { symbolRecord, firstInstance, secondInstance } = makeSymbol();
    beginSymbolEditing(editor, firstInstance);
    const editedParagraph = firstInstance.find('.promo-copy')[0];
    editedParagraph.setStyle({ color: 'rgb(9, 8, 7)' });
    finishSymbolEditing(editor, firstInstance);
    const sharedClass = editedParagraph.getClasses().find((className) => className.indexOf('db-sym-') === 0);
    expect(sharedClass).toBeTruthy();
    expect(findRuleStyles(editor, 'rgb(9, 8, 7)')).toContain('.' + sharedClass);
    const copiedParagraph = secondInstance.find('.promo-copy')[0];
    expect(copiedParagraph.getClasses()).toContain(sharedClass);
    expect(getSymbolRecord(editor, symbolRecord.id).components[0].components[0].classes).toContain(sharedClass);
  });

  test('a second round of edits reuses the same class instead of piling up new ones', () => {
    const { firstInstance } = makeSymbol();
    beginSymbolEditing(editor, firstInstance);
    const editedParagraph = firstInstance.find('.promo-copy')[0];
    editedParagraph.setStyle({ color: 'rgb(1, 1, 1)' });
    finishSymbolEditing(editor, firstInstance);
    beginSymbolEditing(editor, firstInstance);
    editedParagraph.setStyle({ color: 'rgb(2, 2, 2)', padding: '3px' });
    finishSymbolEditing(editor, firstInstance);
    const symbolClasses = editedParagraph.getClasses().filter((className) => className.indexOf('db-sym-') === 0);
    expect(symbolClasses.length).toBe(1);
    expect(editor.Css.getRule('.' + symbolClasses[0]).getStyle()).toEqual({ color: 'rgb(2, 2, 2)', padding: '3px' });
  });

  test('styling the reusable component itself while editing everywhere reaches the other copies', () => {
    const { symbolRecord, firstInstance, secondInstance } = makeSymbol();
    beginSymbolEditing(editor, firstInstance);
    firstInstance.setStyle({ 'margin-top': '44px' });
    finishSymbolEditing(editor, firstInstance);
    const rootClass = getSymbolRecord(editor, symbolRecord.id).rootClassName;
    expect(rootClass).toContain('-root');
    expect(secondInstance.getClasses()).toContain(rootClass);
    expect(editor.Css.getRule('.' + rootClass).getStyle()).toEqual({ 'margin-top': '44px' });
  });
});
