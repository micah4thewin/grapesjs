import buildSchemaSelectFieldMarkup from './buildSchemaSelectFieldMarkup.js';
import buildSchemaTextFieldMarkup from './buildSchemaTextFieldMarkup.js';
import buildSchemaTextareaFieldMarkup from './buildSchemaTextareaFieldMarkup.js';

const buildProductFieldsMarkup = (productRecord) =>
  [
    '<div class="gjs-db-schema-group" data-db-schema-group="Product" hidden>',
    buildSchemaTextFieldMarkup('product.name', 'Product name', 'The name as shown on the page.', productRecord.name),
    buildSchemaTextareaFieldMarkup(
      'product.description',
      'Description',
      'A short description of what it is and who it is for.',
      productRecord.description,
    ),
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup('product.image', 'Image', 'Full address of a product photo.', productRecord.image, {
      type: 'url',
      placeholder: 'https://www.example.com/product.jpg',
    }),
    buildSchemaTextFieldMarkup(
      'product.sku',
      'Product code',
      'Optional. Your own reference or SKU.',
      productRecord.sku,
    ),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup('product.brand', 'Brand', 'The maker or brand name.', productRecord.brand),
    buildSchemaTextFieldMarkup(
      'product.price',
      'Price',
      'Numbers only, for example 19.99; the currency goes in the next field.',
      productRecord.price,
      { type: 'number', min: '0', step: '0.01', inputmode: 'decimal', placeholder: '19.99' },
    ),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup(
      'product.priceCurrency',
      'Currency',
      'Three-letter code such as USD, EUR or GBP.',
      productRecord.priceCurrency,
      { placeholder: 'USD', maxlength: '3' },
    ),
    buildSchemaSelectFieldMarkup(
      'product.availability',
      'Availability',
      'Whether visitors can buy it right now.',
      productRecord.availability || 'InStock',
      [
        ['InStock', 'In stock'],
        ['OutOfStock', 'Out of stock'],
        ['PreOrder', 'Pre-order'],
        ['Discontinued', 'Discontinued'],
      ],
    ),
    '</div>',
    '</div>',
  ].join('');

export default buildProductFieldsMarkup;
