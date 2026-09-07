const getInputTypeOptionRecords = () => [
  { id: 'text', label: 'Text', inputmode: '', autocomplete: '', placeholder: 'Type your answer' },
  { id: 'email', label: 'Email', inputmode: 'email', autocomplete: 'email', placeholder: 'you@example.com' },
  { id: 'tel', label: 'Phone', inputmode: 'tel', autocomplete: 'tel', placeholder: '+1 555 000 0000' },
  { id: 'url', label: 'Web address', inputmode: 'url', autocomplete: 'url', placeholder: 'https://example.com' },
  { id: 'number', label: 'Number', inputmode: 'decimal', autocomplete: 'off', placeholder: '0' },
  { id: 'password', label: 'Password', inputmode: '', autocomplete: 'off', placeholder: '' },
  { id: 'date', label: 'Date', inputmode: '', autocomplete: 'off', placeholder: '' },
  { id: 'time', label: 'Time', inputmode: '', autocomplete: 'off', placeholder: '' },
];

export default getInputTypeOptionRecords;
