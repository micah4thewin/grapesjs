const buildHeadingScaleCss = () => `
.db-heading,
.db-section h1,
.db-section h2,
.db-section h3,
.db-section h4,
.db-section h5,
.db-section h6 {
  font-family: var(--db-font-display, inherit);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin: 0 0 0.5em;
  color: var(--db-color-text, inherit);
  overflow-wrap: break-word;
  text-wrap: balance;
  font-size: var(--db-type-2xl, 1.75rem);
}
.db-heading[data-db-level="1"],
.db-section h1 {
  font-size: var(--db-type-4xl, 2.75rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
}
.db-heading[data-db-level="2"],
.db-section h2 {
  font-size: var(--db-type-3xl, 2.25rem);
  line-height: 1.1;
}
.db-heading[data-db-level="3"],
.db-section h3 {
  font-size: var(--db-type-2xl, 1.75rem);
}
.db-heading[data-db-level="4"],
.db-section h4 {
  font-size: var(--db-type-xl, 1.4rem);
  line-height: 1.25;
}
.db-heading[data-db-level="5"],
.db-section h5 {
  font-size: var(--db-type-lg, 1.2rem);
  line-height: 1.3;
}
.db-heading[data-db-level="6"],
.db-section h6 {
  font-size: max(var(--db-type-base, 1rem), 0.75rem);
  line-height: 1.35;
  letter-spacing: 0.02em;
}
`;

export default buildHeadingScaleCss;
