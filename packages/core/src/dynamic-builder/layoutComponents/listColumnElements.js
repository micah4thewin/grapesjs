const listColumnElements = (columnsElement) =>
  Array.from(columnsElement ? columnsElement.children : []).filter(
    (childElement) => childElement.classList && childElement.classList.contains('db-column'),
  );

export default listColumnElements;
