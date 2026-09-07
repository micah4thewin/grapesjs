const getSubmissionRecipeRecords = () => [
  {
    id: 'formspree',
    label: 'Formspree (recommended)',
    needsUrl: true,
    urlHost: 'formspree.io',
    endpointPrefix: 'https://formspree.io/f/',
    urlPlaceholder: 'Form id or https://formspree.io/f/your-id',
    helpText:
      'Create a free form at formspree.io and paste its id or endpoint URL. Replies arrive in your inbox; file uploads and spam filtering are included.',
  },
  {
    id: 'basin',
    label: 'Basin',
    needsUrl: true,
    urlHost: 'usebasin.com',
    endpointPrefix: 'https://usebasin.com/f/',
    urlPlaceholder: 'Form id or https://usebasin.com/f/your-id',
    helpText: 'Sign in at usebasin.com, create a form and paste its id or endpoint URL.',
  },
  {
    id: 'getform',
    label: 'Getform',
    needsUrl: true,
    urlHost: 'getform.io',
    endpointPrefix: 'https://getform.io/f/',
    urlPlaceholder: 'Form id or https://getform.io/f/your-id',
    helpText: 'Create a form at getform.io and paste its id or endpoint URL.',
  },
  {
    id: 'netlify',
    label: 'Netlify Forms',
    needsUrl: false,
    urlPlaceholder: '',
    helpText: 'Works when this site is hosted on Netlify. Submissions appear in the Netlify dashboard; no URL needed.',
  },
  {
    id: 'apps-script',
    label: 'Google Sheets (Apps Script)',
    needsUrl: true,
    urlHost: 'script.google.com',
    urlPlaceholder: 'https://script.google.com/macros/s/your-id/exec',
    helpText:
      'Deploy a Google Apps Script web app that writes to your sheet and paste its exec URL. The browser cannot read its reply, so the success message shows once the request is sent.',
  },
  {
    id: 'custom',
    label: 'Custom endpoint',
    needsUrl: true,
    isCustom: true,
    urlPlaceholder: 'https://api.example.com/contact',
    helpText:
      'Paste the URL of your own service. Below you can set the method, body format, extra headers and renamed fields.',
  },
  {
    id: 'message',
    label: 'Just show a message (send nothing)',
    needsUrl: false,
    urlPlaceholder: '',
    helpText: 'Visitors see the success message but nothing is stored or sent. Use this for demos only.',
  },
];

export default getSubmissionRecipeRecords;
