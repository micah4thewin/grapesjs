import hasComponentWithAttribute from '../support/hasComponentWithAttribute.js';

const hasScrollAnimations = (editor, page) => hasComponentWithAttribute(editor, 'data-db-aos', page);

export default hasScrollAnimations;
