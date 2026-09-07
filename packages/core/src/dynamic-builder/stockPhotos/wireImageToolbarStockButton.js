import appendToolbarItemOnce from '../support/appendToolbarItemOnce.js';
import getIconMarkup from '../support/getIconMarkup.js';

const imageTypeNames = ['db-image', 'image'];

const wireImageToolbarStockButton = (editor) => {
  editor.on('component:selected', (selectedComponent) => {
    if (!selectedComponent || !selectedComponent.get) return;
    if (imageTypeNames.indexOf(String(selectedComponent.get('type') || '')) < 0) return;
    appendToolbarItemOnce(selectedComponent, {
      attributes: { title: 'Free photos' },
      label: getIconMarkup('camera', { size: 15, label: 'Free photos' }),
      command: 'db:open-stock-photos',
    });
  });
};

export default wireImageToolbarStockButton;
