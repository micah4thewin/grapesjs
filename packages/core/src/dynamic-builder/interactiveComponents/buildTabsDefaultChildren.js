import escapeHtmlText from '../support/escapeHtmlText.js';

const buildTabsDefaultChildren = (interactiveTextDefaults) => {
  const tabButtonChildren = interactiveTextDefaults.tabLabels.map((tabLabelText, tabIndex) => ({
    type: 'db-tab-button',
    attributes: {
      'data-db-type': 'tab-button',
      type: 'button',
      role: 'tab',
      'aria-selected': tabIndex === 0 ? 'true' : 'false',
      tabindex: tabIndex === 0 ? '0' : '-1',
    },
    components: escapeHtmlText(tabLabelText),
  }));
  const tabPanelChildren = interactiveTextDefaults.tabLabels.map((tabLabelText, tabIndex) => {
    const panelAttributes = { 'data-db-type': 'tab-panel', role: 'tabpanel', tabindex: '0' };
    if (tabIndex > 0) panelAttributes.hidden = 'hidden';
    return {
      type: 'db-tab-panel',
      attributes: panelAttributes,
      components: `<p>${escapeHtmlText(tabLabelText)}: ${escapeHtmlText(interactiveTextDefaults.tabPanelText)}</p>`,
    };
  });
  return [{ type: 'db-tab-list', components: tabButtonChildren }].concat(tabPanelChildren);
};

export default buildTabsDefaultChildren;
