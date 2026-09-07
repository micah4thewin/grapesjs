const getBrandSectionButtonCss = () => {
  const brandScopes = ['.db-section[data-db-theme=brand]', '.db-hero[data-db-theme=brand]'];
  const scopedRule = (innerSelector, declarations) =>
    brandScopes.map((scopeSelector) => scopeSelector + ' ' + innerSelector).join(', ') + ' { ' + declarations + ' }';
  return [
    scopedRule('.db-heading, .db-text, .db-text.db-text-lead', 'color: inherit;'),
    scopedRule(
      '.db-button[data-db-variant=primary]',
      'background: var(--db-color-brand-contrast, #ffffff); border-color: var(--db-color-brand-contrast, #ffffff); color: var(--db-color-brand, #4f46e5);',
    ),
    scopedRule(
      '.db-button[data-db-variant=secondary], .db-button[data-db-variant=outline], .db-button[data-db-variant=ghost]',
      'background: transparent; border-color: currentColor; color: inherit;',
    ),
    scopedRule(
      '.db-button[data-db-variant=secondary]:hover, .db-button[data-db-variant=outline]:hover, .db-button[data-db-variant=ghost]:hover',
      'background: rgba(255, 255, 255, 0.14);',
    ),
    '.db-section[data-db-theme=dark] .db-heading, .db-section[data-db-theme=dark] .db-text { color: inherit; }',
  ].join('\n');
};

export default getBrandSectionButtonCss;
