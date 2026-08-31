const buildTestimonialMarketingCss = () => `
.db-testimonial {
  margin: 0;
  padding: var(--db-space-7, 2.5rem);
  background-color: var(--db-color-surface-alt, #f4f6fa);
  border-radius: var(--db-radius-lg, 1rem);
}
.db-testimonial-quote { margin: 0; }
.db-testimonial-quote p {
  margin: 0;
  font-family: var(--db-font-display, inherit);
  font-size: var(--db-type-xl, 1.4rem);
  line-height: 1.5;
}
.db-testimonial-caption {
  display: flex;
  align-items: center;
  gap: var(--db-space-3, 0.75rem);
  margin-top: var(--db-space-5, 1.5rem);
}
.db-testimonial-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: var(--db-radius-pill, 999px);
  object-fit: cover;
}
.db-testimonial-meta { display: flex; flex-direction: column; }
.db-testimonial-name { font-weight: 600; }
.db-testimonial-role { color: var(--db-color-text-muted, #5b6472); font-size: var(--db-type-sm, 0.9rem); }
`;

export default buildTestimonialMarketingCss;
