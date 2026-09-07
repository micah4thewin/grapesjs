const resolveTemplateEmptyText = (tabId, hasAnyRecords) => {
  if (hasAnyRecords) return 'Nothing matches that search. Try a shorter word or pick All categories.';
  if (tabId === 'user') {
    return 'You have not saved a template yet. Use the buttons below to keep this page or the section you selected.';
  }
  return 'No templates to show here yet.';
};

export default resolveTemplateEmptyText;
