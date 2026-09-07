import buildDirectionsUrl from './buildDirectionsUrl.js';
import buildPhoneHref from './buildPhoneHref.js';
import getDefaultContactRecord from './getDefaultContactRecord.js';

const buildContactDefaultChildren = (contactRecord) => {
  const safeRecord = contactRecord || getDefaultContactRecord();
  const hoursPresets = [
    ['Monday to Friday', '9:00 - 18:00'],
    ['Saturday', '10:00 - 16:00'],
    ['Sunday', 'Closed'],
  ];
  const buildContactLink = (fieldName, linkText, linkHref, linkName, traitLabel) => ({
    tagName: 'p',
    name: linkName,
    classes: ['db-contact-line'],
    components: [
      {
        type: 'link',
        name: linkName + ' link',
        classes: ['db-contact-link'],
        attributes: { href: linkHref, 'data-db-field': fieldName },
        components: linkText,
        traits: [{ type: 'db-url', name: 'href', label: traitLabel }],
      },
    ],
  });
  return [
    { tagName: 'h3', type: 'text', name: 'Contact title', classes: ['db-contact-title'], components: 'Visit us' },
    {
      tagName: 'address',
      name: 'Address',
      classes: ['db-contact-address'],
      components: [
        {
          tagName: 'p',
          type: 'text',
          name: 'Street address',
          classes: ['db-contact-line'],
          attributes: { 'data-db-field': 'address' },
          components: safeRecord.address,
        },
        buildContactLink(
          'phone',
          safeRecord.phone,
          buildPhoneHref(safeRecord.phone),
          'Phone',
          'Phone link (tel:)',
        ),
        buildContactLink(
          'email',
          safeRecord.email,
          'mailto:' + safeRecord.email,
          'Email',
          'Email link (mailto:)',
        ),
      ],
    },
    {
      tagName: 'dl',
      name: 'Opening hours',
      classes: ['db-contact-hours'],
      components: hoursPresets.map(([dayText, hoursText]) => ({
        tagName: 'div',
        name: 'Hours row',
        classes: ['db-contact-hours-row'],
        components: [
          { tagName: 'dt', type: 'text', name: 'Day', components: dayText },
          { tagName: 'dd', type: 'text', name: 'Hours', components: hoursText },
        ],
      })),
    },
    {
      type: 'db-button',
      name: 'Directions button',
      classes: ['db-button', 'db-button-secondary', 'db-button-md', 'db-contact-directions'],
      attributes: {
        'data-db-variant': 'secondary',
        'data-db-size': 'md',
        'data-db-field': 'directions',
        href: buildDirectionsUrl(safeRecord.address),
        target: '_blank',
        rel: 'noopener',
      },
      components: 'Get directions',
    },
  ];
};

export default buildContactDefaultChildren;
