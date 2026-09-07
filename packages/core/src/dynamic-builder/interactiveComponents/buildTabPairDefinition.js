import escapeHtmlText from '../support/escapeHtmlText.js';

const buildTabPairDefinition = (tabLabelText, panelBodyText, isSelected) => {
  const panelAttributes = { 'data-db-type': 'tab-panel', role: 'tabpanel', tabindex: '0' };
  if (!isSelected) panelAttributes.hidden = 'hidden';
  return {
    buttonDefinition: {
      type: 'db-tab-button',
      attributes: {
        'data-db-type': 'tab-button',
        type: 'button',
        role: 'tab',
        'aria-selected': isSelected ? 'true' : 'false',
        tabindex: isSelected ? '0' : '-1',
      },
      components: escapeHtmlText(tabLabelText),
    },
    panelDefinition: {
      type: 'db-tab-panel',
      attributes: panelAttributes,
      components: `<p>${escapeHtmlText(panelBodyText)}</p>`,
    },
  };
};

export default buildTabPairDefinition;
