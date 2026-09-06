const readMenuRowIndex = (eventTarget) => {
  const rowElement = eventTarget && eventTarget.closest ? eventTarget.closest('[data-db-menu-row]') : null;
  return rowElement ? Number(rowElement.getAttribute('data-db-menu-row')) : -1;
};

export default readMenuRowIndex;
