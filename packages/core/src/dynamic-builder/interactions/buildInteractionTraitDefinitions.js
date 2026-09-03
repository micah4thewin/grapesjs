const interactionCategory = { id: 'db-interactions', label: 'Interactions', open: false };

const buildInteractionTraitDefinitions = () => [
  {
    type: 'db-flow-summary',
    name: 'data-db-flows',
    label: 'Flows',
    category: interactionCategory,
  },
  {
    type: 'button',
    name: 'db-flow-edit',
    label: '',
    category: interactionCategory,
    text: 'Open the flow builder',
    full: true,
    command: 'db:open-flow-builder',
  },
];

export default buildInteractionTraitDefinitions;
