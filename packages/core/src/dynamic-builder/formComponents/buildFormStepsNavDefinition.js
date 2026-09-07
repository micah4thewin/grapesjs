const buildNavButtonDefinition = (buttonLabel, buttonAttribute, variantName, buttonName) => ({
  type: 'text',
  tagName: 'button',
  name: buttonName,
  classes: ['db-button', 'db-button-' + variantName, 'db-button-md', 'db-form-step-button'],
  attributes: { type: 'button', [buttonAttribute]: 'true', 'data-db-variant': variantName, 'data-db-size': 'md' },
  draggable: false,
  droppable: false,
  removable: false,
  copyable: false,
  traits: [],
  components: buttonLabel,
});

const buildFormStepsNavDefinition = () => ({
  type: 'db-form-steps-nav',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbFormStepsNav) && { type: 'db-form-steps-nav' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Step navigation',
      draggable: '[data-db-type=form]',
      droppable: false,
      copyable: false,
      classes: ['db-form-steps-nav'],
      attributes: { 'data-db-type': 'form-steps-nav', 'data-db-form-child': 'true', 'data-db-form-steps-nav': 'true' },
      components: [
        {
          tagName: 'div',
          classes: ['db-form-progress'],
          attributes: { 'data-db-step-progress': 'true', role: 'presentation' },
          draggable: false,
          removable: false,
          copyable: false,
          traits: [],
          components: [
            {
              tagName: 'span',
              classes: ['db-form-progress-bar'],
              attributes: { 'data-db-step-progress-bar': 'true' },
              selectable: false,
              hoverable: false,
              layerable: false,
              draggable: false,
              removable: false,
              copyable: false,
              traits: [],
            },
          ],
        },
        {
          tagName: 'p',
          classes: ['db-form-progress-text'],
          attributes: { 'data-db-step-progress-text': 'true', 'aria-live': 'polite' },
          draggable: false,
          removable: false,
          copyable: false,
          traits: [],
          components: 'Step 1 of 2',
        },
        {
          tagName: 'div',
          classes: ['db-form-step-buttons'],
          draggable: false,
          removable: false,
          copyable: false,
          traits: [],
          components: [
            buildNavButtonDefinition('Back', 'data-db-step-back', 'secondary', 'Back button'),
            buildNavButtonDefinition('Next', 'data-db-step-next', 'primary', 'Next button'),
          ],
        },
      ],
      traits: [],
    },
  },
});

export default buildFormStepsNavDefinition;
