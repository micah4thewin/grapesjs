import hasComponentWithAttribute from '../support/hasComponentWithAttribute.js';

const hasInteractionFlows = (editor, page) => hasComponentWithAttribute(editor, 'data-db-flows', page);

export default hasInteractionFlows;
