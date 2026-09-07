import collectComponentTextParts from './collectComponentTextParts.js';

const readComponentPlainText = (component) => collectComponentTextParts(component).replace(/\s+/g, ' ').trim();

export default readComponentPlainText;
