const listVisibleTemplateRecords = (viewState) => {
  if (viewState.tabId === 'sections') return viewState.sectionRecords;
  if (viewState.tabId === 'user') return viewState.userRecords;
  return viewState.pageRecords;
};

export default listVisibleTemplateRecords;
