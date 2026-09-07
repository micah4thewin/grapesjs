const buildBreadcrumbInteractiveCss = () => `
.db-breadcrumb {
  font-family: var(--db-font-body);
  font-size: var(--db-type-sm);
}
.db-breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--db-space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}
.db-breadcrumb li {
  display: flex;
  align-items: center;
  gap: var(--db-space-2);
  min-height: 2.75rem;
  color: var(--db-color-text-muted);
}
.db-breadcrumb li + li::before {
  content: "\\203A";
  content: "\\203A" / "";
  color: var(--db-color-text-muted);
  font-size: 1.15em;
  line-height: 1;
}
.db-breadcrumb a {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding: 0 var(--db-space-1);
  border-radius: var(--db-radius-sm);
  color: var(--db-color-text-muted);
  text-decoration: none;
}
.db-breadcrumb a:hover {
  color: var(--db-color-brand);
  text-decoration: underline;
}
.db-breadcrumb [aria-current="page"] {
  color: var(--db-color-text);
  font-weight: 600;
}
`;

export default buildBreadcrumbInteractiveCss;
