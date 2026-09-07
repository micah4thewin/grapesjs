const getNextBlockSuggestions = () => ({
  'db-navbar': ['db-hero-centered', 'db-hero-split', 'db-cover-photo'],
  'db-announcement-bar': ['db-navbar', 'db-hero-centered'],
  'db-hero-centered': ['db-features-three-up', 'db-logo-cloud', 'db-stats-row'],
  'db-hero-split': ['db-features-three-up', 'db-logo-cloud', 'db-stats-row'],
  'db-cover-photo': ['db-features-three-up', 'db-stats-row', 'db-logo-cloud'],
  'db-cover-video': ['db-features-three-up', 'db-stats-row', 'db-logo-cloud'],
  'db-features-three-up': ['db-stats-row', 'db-testimonial-trio', 'db-cta-banner'],
  'db-stats-row': ['db-testimonial-trio', 'db-logo-cloud', 'db-cta-banner'],
  'db-logo-cloud': ['db-testimonial-trio', 'db-cta-banner', 'db-pricing'],
  'db-testimonial-trio': ['db-cta-banner', 'db-pricing', 'db-footer'],
  'db-card-grid': ['db-cta-banner', 'db-testimonial-trio', 'db-footer'],
  'db-team-grid': ['db-logo-cloud', 'db-cta-banner', 'db-footer'],
  'db-gallery': ['db-testimonial-trio', 'db-cta-banner', 'db-footer'],
  'db-carousel': ['db-features-three-up', 'db-cta-banner'],
  'db-pricing': ['db-accordion-faq', 'db-cta-banner', 'db-footer'],
  'db-contact-form': ['db-contact', 'db-footer'],
  'db-contact': ['db-contact-form', 'db-footer'],
  'db-newsletter-signup': ['db-footer'],
  'db-cta-banner': ['db-footer', 'db-newsletter-signup'],
});

export default getNextBlockSuggestions;
