import escapeHtmlText from '../support/escapeHtmlText.js';
import toSlugText from '../support/toSlugText.js';

const buildBreadcrumbTypeDefinition = (interactiveTextDefaults) => {
  const trailLabels = interactiveTextDefaults.breadcrumbTrail;
  const breadcrumbItemsMarkup = trailLabels
    .map((trailLabelText, trailIndex) => {
      if (trailIndex === trailLabels.length - 1)
        return `<li aria-current="page">${escapeHtmlText(trailLabelText)}</li>`;
      const stepHref = trailIndex === 0 ? 'index.html' : '#' + toSlugText(trailLabelText);
      return `<li><a href="${escapeHtmlText(stepHref)}">${escapeHtmlText(trailLabelText)}</a></li>`;
    })
    .join('');
  return {
    type: 'db-breadcrumb',
    isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'breadcrumb') && { type: 'db-breadcrumb' },
    model: {
      defaults: {
        tagName: 'nav',
        name: 'Breadcrumb',
        draggable: true,
        droppable: false,
        classes: ['db-breadcrumb'],
        attributes: { 'data-db-type': 'breadcrumb', 'aria-label': 'Breadcrumb', 'data-db-auto': 'true' },
        components: `<ol>${breadcrumbItemsMarkup}</ol>`,
        traits: [
          { type: 'db-breadcrumb-steps', name: 'dbBreadcrumbSteps', label: 'Trail steps' },
          {
            type: 'checkbox',
            name: 'data-db-auto',
            label: 'Follow site pages',
            valueTrue: 'true',
            valueFalse: 'false',
            default: 'true',
          },
        ],
      },
    },
  };
};

export default buildBreadcrumbTypeDefinition;
