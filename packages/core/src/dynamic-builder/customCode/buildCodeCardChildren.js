import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';
import getInertChildFlags from './getInertChildFlags.js';

const buildCodeCardChildren = (cardConfig) => {
  const inertFlags = getInertChildFlags();
  return [
    {
      tagName: 'span',
      name: 'Code card icon',
      classes: ['db-code-card-icon'],
      attributes: { 'aria-hidden': 'true' },
      components: getIconMarkup(cardConfig.iconName, { size: 20 }),
      ...inertFlags,
    },
    {
      tagName: 'div',
      name: 'Code card body',
      classes: ['db-code-card-body'],
      ...inertFlags,
      components: [
        {
          tagName: 'strong',
          name: 'Code card title',
          classes: ['db-code-card-title'],
          components: escapeHtmlText(cardConfig.titleText),
          ...inertFlags,
        },
        {
          tagName: 'code',
          name: 'Code card preview',
          classes: ['db-code-card-preview'],
          components: escapeHtmlText(cardConfig.previewText),
          ...inertFlags,
        },
        {
          tagName: 'span',
          name: 'Code card note',
          classes: ['db-code-card-note'],
          components: escapeHtmlText(cardConfig.noteText),
          ...inertFlags,
        },
      ],
    },
  ];
};

export default buildCodeCardChildren;
