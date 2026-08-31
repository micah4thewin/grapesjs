const buildHeadingContentCss = () => `
.db-heading {
  margin: 0 0 var(--db-space-3, 0.75rem);
}
.db-heading + .db-heading {
  margin-top: var(--db-space-2, 0.5rem);
}
:is(p, ul, ol, blockquote, aside, figure, div) + .db-heading {
  margin-top: var(--db-space-6, 2rem);
}
.db-heading.db-heading[data-db-size='display'] {
  font-size: var(--db-type-4xl, 2.75rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
}
.db-heading.db-heading[data-db-size='xl'] {
  font-size: var(--db-type-3xl, 2.25rem);
  line-height: 1.1;
}
.db-heading.db-heading[data-db-size='lg'] {
  font-size: var(--db-type-2xl, 1.75rem);
  line-height: 1.15;
}
.db-heading.db-heading[data-db-size='md'] {
  font-size: var(--db-type-xl, 1.4rem);
  line-height: 1.2;
}
.db-heading.db-heading[data-db-size='sm'] {
  font-size: var(--db-type-lg, 1.2rem);
  line-height: 1.3;
}
`;

export default buildHeadingContentCss;
