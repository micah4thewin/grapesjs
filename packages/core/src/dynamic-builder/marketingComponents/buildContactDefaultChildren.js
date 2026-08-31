const buildContactDefaultChildren = () => {
  const hoursPresets = [
    ['Monday to Friday', '9:00 - 18:00'],
    ['Saturday', '10:00 - 16:00'],
    ['Sunday', 'Closed'],
  ];
  return [
    {
      tagName: 'h3',
      type: 'text',
      name: 'Contact title',
      classes: ['db-contact-title'],
      components: 'Visit our studio',
    },
    {
      tagName: 'address',
      name: 'Contact details',
      classes: ['db-contact-address'],
      components: [
        {
          tagName: 'p',
          type: 'text',
          name: 'Street address',
          classes: ['db-contact-line'],
          components: '480 Market Street, Suite 210, San Francisco, CA 94104',
        },
        {
          tagName: 'p',
          classes: ['db-contact-line'],
          components: [
            {
              tagName: 'a',
              name: 'Phone link',
              classes: ['db-contact-link'],
              attributes: { href: 'tel:+14155550137' },
              components: '+1 (415) 555-0137',
              traits: [{ type: 'db-url', name: 'href', label: 'Phone link (tel:)' }],
            },
          ],
        },
        {
          tagName: 'p',
          classes: ['db-contact-line'],
          components: [
            {
              tagName: 'a',
              name: 'Email link',
              classes: ['db-contact-link'],
              attributes: { href: 'mailto:hello@example.com' },
              components: 'hello@example.com',
              traits: [{ type: 'db-url', name: 'href', label: 'Email link (mailto:)' }],
            },
          ],
        },
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
          { tagName: 'dt', type: 'text', components: dayText },
          { tagName: 'dd', type: 'text', components: hoursText },
        ],
      })),
    },
    {
      type: 'db-button',
      classes: ['db-button', 'db-contact-directions'],
      attributes: {
        'data-db-variant': 'secondary',
        href: 'https://maps.google.com/?q=480+Market+Street+San+Francisco',
      },
      components: 'Get directions',
    },
  ];
};

export default buildContactDefaultChildren;
