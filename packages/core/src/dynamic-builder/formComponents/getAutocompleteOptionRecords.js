const getAutocompleteOptionRecords = () => [
  { id: '', label: 'Automatic' },
  { id: 'off', label: 'Off' },
  { id: 'name', label: 'Full name' },
  { id: 'given-name', label: 'First name' },
  { id: 'family-name', label: 'Last name' },
  { id: 'email', label: 'Email' },
  { id: 'tel', label: 'Phone' },
  { id: 'organization', label: 'Company' },
  { id: 'street-address', label: 'Street address' },
  { id: 'address-level2', label: 'City' },
  { id: 'postal-code', label: 'Postal code' },
  { id: 'country-name', label: 'Country' },
  { id: 'url', label: 'Website' },
  { id: 'bday', label: 'Birthday' },
];

export default getAutocompleteOptionRecords;
