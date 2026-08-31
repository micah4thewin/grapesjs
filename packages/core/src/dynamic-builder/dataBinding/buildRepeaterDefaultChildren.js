const buildRepeaterDefaultChildren = () =>
  [
    '<div data-db-type="repeater-item" data-db-repeater-item="true" class="db-repeater-item">',
    '<h4 class="db-repeater-item-heading">{{db:item.name}}</h4>',
    '<p class="db-repeater-item-body">{{db:item.description}}</p>',
    '<span class="db-repeater-item-meta">{{db:item.price}}</span>',
    '</div>',
  ].join('');

export default buildRepeaterDefaultChildren;
