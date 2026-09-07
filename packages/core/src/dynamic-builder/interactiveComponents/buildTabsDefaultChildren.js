import buildTabPairDefinition from './buildTabPairDefinition.js';

const buildTabsDefaultChildren = (interactiveTextDefaults) => {
  const pairDefinitions = interactiveTextDefaults.tabLabels.map((tabLabelText, tabIndex) =>
    buildTabPairDefinition(tabLabelText, tabLabelText + ': ' + interactiveTextDefaults.tabPanelText, tabIndex === 0),
  );
  return [
    { type: 'db-tab-list', components: pairDefinitions.map((pairDefinition) => pairDefinition.buttonDefinition) },
  ].concat(pairDefinitions.map((pairDefinition) => pairDefinition.panelDefinition));
};

export default buildTabsDefaultChildren;
