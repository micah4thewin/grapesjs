const isDisposableColumn = (columnComponent) =>
  columnComponent
    .components()
    .every((innerComponent) =>
      Boolean(innerComponent.getAttributes && innerComponent.getAttributes()['data-db-placeholder']),
    );

export default isDisposableColumn;
