const buildRepeaterItemInnerMarkup = () =>
  [
    '<h4 class="db-repeater-item-heading">{{db:item.name}}</h4>',
    '<p class="db-repeater-item-body">{{db:item.description}}</p>',
    '<span class="db-repeater-item-meta">{{db:item.price}}</span>',
  ].join('');

export default buildRepeaterItemInnerMarkup;
