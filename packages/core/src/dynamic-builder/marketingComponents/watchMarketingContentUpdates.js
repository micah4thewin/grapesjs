import isComponentOfType from './isComponentOfType.js';
import syncLogoLinkHref from './syncLogoLinkHref.js';
import syncTestimonialExtras from './syncTestimonialExtras.js';

const watchMarketingContentUpdates = (editor) => {
  ['data-db-rating', 'data-db-source'].forEach((attributeName) => {
    editor.on('component:update:attributes:' + attributeName, (component) => {
      if (isComponentOfType(component, 'db-testimonial')) syncTestimonialExtras(component);
    });
  });
  editor.on('component:update:attributes:href', (component) => syncLogoLinkHref(component));
};

export default watchMarketingContentUpdates;
