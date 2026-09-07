import grapesjs from '../../../src';

describe('probe', () => {
  test('types view statics', () => {
    const editor = grapesjs.init({ headless: true, storageManager: false, plugins: [grapesjs.dynamicBuilder] });
    const bad = editor.Components.getTypes()
      .filter((t) => !t.view || typeof t.view.getEvents !== 'function')
      .map((t) => t.id);
    console.log('BADTYPES', JSON.stringify(bad));
    editor.destroy();
  });
});
