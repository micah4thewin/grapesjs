import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import insertSymbolInstance from '../../../src/dynamic-builder/symbols/insertSymbolInstance';
import saveSymbolRecord from '../../../src/dynamic-builder/symbols/saveSymbolRecord';
import captureSymbolLeafDefinition from '../../../src/dynamic-builder/symbols/captureSymbolLeafDefinition';
import areDefinitionsEquivalent from '../../../src/dynamic-builder/symbols/areDefinitionsEquivalent';
import getOverridableLeafKind from '../../../src/dynamic-builder/symbols/getOverridableLeafKind';

describe('probe', () => {
  test('events', () => {
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    const editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, grapesjs.dynamicBuilder],
    });
    fixJsDomIframe(editor.getModel().shallow);
    const navComponent = editor.getWrapper().append({ type: 'db-navbar' })[0];
    const navJson = JSON.parse(JSON.stringify(navComponent.toJSON()));
    navComponent.remove();
    saveSymbolRecord(editor, {
      id: 'sym-nav',
      name: 'Navbar',
      components: [
        {
          tagName: 'div',
          components: [
            { tagName: 'p', type: 'text', components: 'Nav text' },
            { type: 'db-heading', components: 'Head' },
            { type: 'db-image' },
            { type: 'db-button' },
          ],
        },
      ],
    });
    const inst = insertSymbolInstance(editor, 'sym-nav');
    const container = inst.components().at(0);
    const leaf = container.components().at(0);
    const log = [];
    [
      'component:add',
      'component:remove',
      'component:update',
      'component:input',
      'component:update:components',
      'component:update:attributes',
      'component:update:status',
    ].forEach((ev) => {
      editor.on(ev, (c) =>
        log.push(
          ev +
            ':' +
            (c && c.get ? c.get('type') + '/' + c.get('tagName') : '?') +
            ':' +
            Object.keys((c && c.changedAttributes && c.changedAttributes()) || {}).join('|'),
        ),
      );
    });
    log.push(
      '--- kinds ' +
        container
          .components()
          .map((c) => c.get('type') + '=' + getOverridableLeafKind(c))
          .join(','),
    );
    log.push(
      '--- equiv leaf ' +
        areDefinitionsEquivalent(
          { tagName: 'p', type: 'text', components: 'Nav text' },
          captureSymbolLeafDefinition(leaf),
        ) +
        ' ' +
        JSON.stringify(captureSymbolLeafDefinition(leaf)),
    );
    log.push(
      '--- equiv heading ' +
        areDefinitionsEquivalent(
          { type: 'db-heading', components: 'Head' },
          captureSymbolLeafDefinition(container.components().at(1)),
        ) +
        ' ' +
        JSON.stringify(captureSymbolLeafDefinition(container.components().at(1))),
    );
    log.push(
      '--- equiv image ' +
        areDefinitionsEquivalent({ type: 'db-image' }, captureSymbolLeafDefinition(container.components().at(2))) +
        ' ' +
        JSON.stringify(captureSymbolLeafDefinition(container.components().at(2))),
    );
    log.push('--- 1 content');
    leaf.components('New text');
    log.push('--- 2 status');
    leaf.set('status', 'hovered');
    log.push('--- 3 append');
    container.append({ tagName: 'span' });
    log.push('--- 4 remove');
    container.components().at(4).remove();
    log.push('--- 5 attrs');
    leaf.addAttributes({ title: 'x' });
    log.push('--- 6 selectable');
    leaf.set({ selectable: false, hoverable: false }, { avoidStore: true });
    log.push(
      '--- 7 nav capture equiv ' +
        areDefinitionsEquivalent(
          navJson,
          JSON.parse(JSON.stringify(editor.getWrapper().append({ type: 'db-navbar' })[0].toJSON())),
        ),
    );
    console.log(log.join('\n'));
    editor.destroy();
  });
});
