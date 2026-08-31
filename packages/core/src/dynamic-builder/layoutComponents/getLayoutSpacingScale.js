const getLayoutSpacingScale = () => ({
  gapSizes: {
    xs: { label: 'Extra small', cssValue: 'var(--db-space-2, 0.5rem)' },
    sm: { label: 'Small', cssValue: 'var(--db-space-4, 1rem)' },
    md: { label: 'Medium', cssValue: 'var(--db-space-6, 2rem)' },
    lg: { label: 'Large', cssValue: 'var(--db-space-8, 3rem)' },
    xl: { label: 'Extra large', cssValue: 'var(--db-space-9, 4rem)' },
  },
  spacerSizes: {
    xs: { label: 'Extra small', cssValue: 'var(--db-space-4, 1rem)' },
    sm: { label: 'Small', cssValue: 'var(--db-space-6, 2rem)' },
    md: { label: 'Medium', cssValue: 'var(--db-space-8, 3rem)' },
    lg: { label: 'Large', cssValue: 'var(--db-space-10, 5rem)' },
    xl: { label: 'Extra large', cssValue: 'var(--db-space-12, 8rem)' },
  },
});

export default getLayoutSpacingScale;
