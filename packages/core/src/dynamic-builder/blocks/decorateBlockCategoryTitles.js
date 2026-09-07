const decorateBlockCategoryTitles = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement) return 0;
  const categoryElements = Array.from(containerElement.querySelectorAll('.gjs-block-category'));
  categoryElements.forEach((categoryElement) => {
    const titleElement = categoryElement.querySelector('.gjs-title');
    if (!titleElement) return;
    titleElement.setAttribute('role', 'button');
    titleElement.setAttribute('tabindex', '0');
    titleElement.setAttribute('aria-expanded', categoryElement.classList.contains('gjs-open') ? 'true' : 'false');
  });
  return categoryElements.length;
};

export default decorateBlockCategoryTitles;
