const getLinkKindRecords = () => [
  { id: 'none', label: 'No link yet', placeholder: '', inputMode: 'text' },
  { id: 'page', label: 'A page on this site', placeholder: '', inputMode: 'text' },
  { id: 'url', label: 'Web address', placeholder: 'https://example.com/page', inputMode: 'url' },
  { id: 'email', label: 'Email address', placeholder: 'hello@example.com', inputMode: 'email' },
  { id: 'phone', label: 'Phone number', placeholder: '+1 555 123 4567', inputMode: 'tel' },
  { id: 'file', label: 'Uploaded file', placeholder: '', inputMode: 'text' },
];

export default getLinkKindRecords;
