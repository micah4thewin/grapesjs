const buildBaseBodyTypographyCss = () => `
body {
  font-family: var(--db-font-body, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif);
  font-size: max(var(--db-type-base, 1rem), 0.75rem);
  line-height: 1.65;
  color: var(--db-color-text, #111827);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
`;

export default buildBaseBodyTypographyCss;
