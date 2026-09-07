import escapeHtmlText from '../support/escapeHtmlText.js';
import buildTestimonialRatingMarkup from './buildTestimonialRatingMarkup.js';
import findDescendantByAttribute from './findDescendantByAttribute.js';

const syncTestimonialExtras = (testimonialComponent) => {
  if (!testimonialComponent || !testimonialComponent.getAttributes) return;
  const attributeRecord = testimonialComponent.getAttributes();
  const ratingValue = Math.max(0, Math.min(5, Math.round(Number(attributeRecord['data-db-rating']) || 0)));
  const ratingComponent = findDescendantByAttribute(testimonialComponent, 'data-db-testimonial-rating');
  if (ratingComponent) {
    ratingComponent.components(buildTestimonialRatingMarkup(ratingValue));
    ratingComponent.addAttributes({
      'aria-label': ratingValue ? ratingValue + ' out of 5 stars' : 'No rating',
      'data-db-rating-value': String(ratingValue),
    });
  }
  const sourceComponent = findDescendantByAttribute(testimonialComponent, 'data-db-testimonial-source');
  if (sourceComponent) sourceComponent.components(escapeHtmlText(String(attributeRecord['data-db-source'] || '')));
};

export default syncTestimonialExtras;
