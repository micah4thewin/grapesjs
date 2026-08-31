import escapeHtmlText from '../support/escapeHtmlText.js';
import createValueTraitDefinition from './createValueTraitDefinition.js';

const createTextareaTraitDefinition = () =>
  createValueTraitDefinition(
    ({ trait }) =>
      [
        '<div class="gjs-db-field">',
        '<textarea class="gjs-db-field-input" rows="4" placeholder="',
        escapeHtmlText(trait.get('placeholder') || ''),
        '"></textarea>',
        '</div>',
      ].join(''),
    'textarea',
  );

export default createTextareaTraitDefinition;
