import registerComponentTypeSet from '../support/registerComponentTypeSet.js';
import buildIconSvgMarkup from './buildIconSvgMarkup.js';
import getIconDefaultSettings from './getIconDefaultSettings.js';
import getIconTraitDefinitions from './getIconTraitDefinitions.js';

const registerIconComponentType = (editor, moduleOptions = {}) => {
  const defaultSettings = getIconDefaultSettings(moduleOptions);
  const defaultMarkup = buildIconSvgMarkup({ ...defaultSettings, isDecorative: true, accessibleLabel: '' });
  registerComponentTypeSet(editor, [
    {
      type: 'db-icon',
      model: {
        defaults: {
          tagName: 'span',
          name: 'Icon',
          draggable: true,
          droppable: false,
          classes: ['db-icon'],
          attributes: {
            'data-db-type': 'icon',
            'data-db-icon-name': defaultSettings.iconName,
            'data-db-icon-size': String(defaultSettings.size),
            'data-db-icon-stroke': String(defaultSettings.strokeWidth),
            'data-db-icon-decorative': 'true',
            'data-db-icon-label': '',
          },
          components: defaultMarkup,
          traits: getIconTraitDefinitions(defaultSettings),
        },
      },
      isComponent: (el) => el.dataset && el.dataset.dbType === 'icon' && { type: 'db-icon' },
    },
  ]);
};

export default registerIconComponentType;
