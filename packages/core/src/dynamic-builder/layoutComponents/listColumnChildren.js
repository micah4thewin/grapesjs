const listColumnChildren = (columnsComponent) =>
  columnsComponent.components().filter((childComponent) => childComponent.is && childComponent.is('db-column'));

export default listColumnChildren;
