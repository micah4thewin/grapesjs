const buildMediaTraitCategory = (categoryId, categoryLabel, isOpen = true) => ({
  id: 'db-media-' + categoryId,
  label: categoryLabel,
  open: isOpen,
});

export default buildMediaTraitCategory;
