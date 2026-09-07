const buildEqualColumnTemplate = (columnCount) =>
  columnCount > 1 ? `repeat(${columnCount}, minmax(0, 1fr))` : 'minmax(0, 1fr)';

export default buildEqualColumnTemplate;
