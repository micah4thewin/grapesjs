import buildSchemaSelectFieldMarkup from './buildSchemaSelectFieldMarkup.js';
import buildSchemaTextFieldMarkup from './buildSchemaTextFieldMarkup.js';
import buildSchemaTextareaFieldMarkup from './buildSchemaTextareaFieldMarkup.js';

const buildProductFieldsMarkup = (productRecord) =>
  [
    '<div class="gjs-db-schema-group" data-db-schema-group="Product" hidden>',
    buildSchemaTextFieldMarkup('product.name', 'Product name', '', productRecord.name),
    buildSchemaTextareaFieldMarkup('product.description', 'Description', '', productRecord.description),
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup('product.image', 'Image URL', '', productRecord.image),
    buildSchemaTextFieldMarkup('product.sku', 'SKU', '', productRecord.sku),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup('product.brand', 'Brand', '', productRecord.brand),
    buildSchemaTextFieldMarkup('product.price', 'Price', 'Number only, for example 19.99.', productRecord.price),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup(
      'product.priceCurrency',
      'Currency',
      'ISO 4217 code, for example USD.',
      productRecord.priceCurrency,
    ),
    buildSchemaSelectFieldMarkup('product.availability', 'Availability', '', productRecord.availability || 'InStock', [
      ['InStock', 'In stock'],
      ['OutOfStock', 'Out of stock'],
      ['PreOrder', 'Pre-order'],
      ['Discontinued', 'Discontinued'],
    ]),
    '</div>',
    '</div>',
  ].join('');

export default buildProductFieldsMarkup;
