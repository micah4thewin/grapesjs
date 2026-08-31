const buildProseCss = () => `
.db-prose {
  max-width: 65ch;
  font-size: max(var(--db-type-base, 1rem), 0.75rem);
  line-height: 1.7;
}
.db-prose p {
  margin: 0 0 1em;
}
.db-prose p:last-child {
  margin-bottom: 0;
}
.db-prose h2,
.db-prose h3,
.db-prose h4 {
  margin: 1.4em 0 0.5em;
}
.db-prose ul,
.db-prose ol {
  margin: 0 0 1em;
  padding-left: 1.5em;
}
.db-prose li {
  margin: 0 0 0.4em;
}
.db-prose li::marker {
  color: var(--db-color-text-muted, #5b6472);
}
.db-prose blockquote {
  margin: 1.5em 0;
  padding: 0.5em 0 0.5em 1.25em;
  border-left: 3px solid var(--db-color-brand, #4f46e5);
  color: var(--db-color-text-muted, #5b6472);
  font-style: italic;
}
.db-prose blockquote p:last-child {
  margin-bottom: 0;
}
.db-prose pre {
  margin: 0 0 1.25em;
  padding: 1em 1.25em;
  overflow-x: auto;
  background: var(--db-color-surface-alt, #f4f6fa);
  border: 1px solid var(--db-color-line, #dfe3ea);
  border-radius: var(--db-radius-md, 0.5rem);
  line-height: 1.6;
}
.db-prose a {
  color: var(--db-color-brand, #4f46e5);
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}
.db-prose img {
  max-width: 100%;
  height: auto;
}
.db-prose hr {
  border: 0;
  border-top: 1px solid var(--db-color-line, #dfe3ea);
  margin: 2em 0;
}
`;

export default buildProseCss;
