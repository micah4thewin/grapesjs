import getSharedTraitGroupOrder from './getSharedTraitGroupOrder.js';

const orderInspectorTraitGroups = (selectedComponent) => {
  const traitCollection = selectedComponent && selectedComponent.traits;
  if (!traitCollection || !traitCollection.getCategories) return;
  const orderRecords = getSharedTraitGroupOrder();
  traitCollection.getCategories().forEach((categoryModel) => {
    const categoryView = categoryModel.view;
    if (!categoryView || !categoryView.el) return;
    categoryView.el.style.order = String(orderRecords[categoryModel.getId()] || 10);
  });
};

export default orderInspectorTraitGroups;
