const getLayoutSpacingScale = () => ({
  gapSizes: {
    xs: { label: 'Extra small (8px)', cssValue: 'var(--db-space-2, 0.5rem)' },
    sm: { label: 'Small (16px)', cssValue: 'var(--db-space-4, 1rem)' },
    md: { label: 'Medium (32px)', cssValue: 'var(--db-space-6, 2rem)' },
    lg: { label: 'Large (48px)', cssValue: 'var(--db-space-8, 3rem)' },
    xl: { label: 'Extra large (64px)', cssValue: 'var(--db-space-9, 4rem)' },
  },
  spacerSizes: {
    xs: { label: 'Extra small (16px)', cssValue: 'var(--db-space-4, 1rem)' },
    sm: { label: 'Small (32px)', cssValue: 'var(--db-space-6, 2rem)' },
    md: { label: 'Medium (48px)', cssValue: 'var(--db-space-8, 3rem)' },
    lg: { label: 'Large (80px)', cssValue: 'var(--db-space-10, 5rem)' },
    xl: { label: 'Extra large (128px)', cssValue: 'var(--db-space-12, 8rem)' },
  },
});

export default getLayoutSpacingScale;
