import getIconMarkup from '../support/getIconMarkup.js';

const buildTestimonialRatingMarkup = (ratingValue) => {
  const safeRating = Math.max(0, Math.min(5, Math.round(Number(ratingValue) || 0)));
  return Array.from({ length: 5 }, (unusedValue, starIndex) => {
    const starState = starIndex < safeRating ? 'filled' : 'empty';
    return '<span class="db-star" data-db-star="' + starState + '">' + getIconMarkup('star', { size: 16 }) + '</span>';
  }).join('');
};

export default buildTestimonialRatingMarkup;
