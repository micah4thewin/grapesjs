const buildInputPreset = (presetId, presetLabel, hintText, labelText, controlAttributes) => ({
  id: presetId,
  label: presetLabel,
  hint: hintText,
  labelText,
  helpText: '',
  controlDefinition: { type: 'db-input', attributes: controlAttributes },
});

const getFieldPresetRecords = () => [
  buildInputPreset('text', 'Short text', 'One line, like a name or a city', 'Your answer', {
    type: 'text',
    name: 'answer',
    placeholder: 'Type your answer',
  }),
  {
    id: 'textarea',
    label: 'Long text',
    hint: 'A bigger box for messages',
    labelText: 'Message',
    helpText: '',
    controlDefinition: {
      type: 'db-textarea',
      attributes: { name: 'message', rows: '5', placeholder: 'Write your message here' },
    },
  },
  buildInputPreset('email', 'Email', 'Checks the address looks right', 'Email address', {
    type: 'email',
    name: 'email',
    autocomplete: 'email',
    inputmode: 'email',
    placeholder: 'you@example.com',
  }),
  buildInputPreset('tel', 'Phone', 'Opens the number keypad on phones', 'Phone number', {
    type: 'tel',
    name: 'phone',
    autocomplete: 'tel',
    inputmode: 'tel',
    placeholder: '+1 555 000 0000',
  }),
  buildInputPreset('number', 'Number', 'Digits only, with optional limits', 'Number', {
    type: 'number',
    name: 'quantity',
    inputmode: 'decimal',
    autocomplete: 'off',
    placeholder: '0',
  }),
  buildInputPreset('date', 'Date', 'Shows a date picker', 'Date', {
    type: 'date',
    name: 'date',
    autocomplete: 'off',
  }),
  {
    id: 'select',
    label: 'Dropdown',
    hint: 'Pick one from a list',
    labelText: 'Topic',
    helpText: '',
    controlDefinition: { type: 'db-select' },
  },
  {
    id: 'radio',
    label: 'Choice list',
    hint: 'Pick one, all choices visible',
    standaloneDefinition: { type: 'db-radio-group' },
  },
  {
    id: 'checkbox',
    label: 'Checkbox',
    hint: 'A yes or no tick box',
    standaloneDefinition: { type: 'db-checkbox' },
  },
  {
    id: 'file',
    label: 'File',
    hint: 'Lets visitors attach a file',
    labelText: 'Attachment',
    helpText: 'PDF or image up to 10 MB.',
    controlDefinition: { type: 'db-file-input' },
  },
];

export default getFieldPresetRecords;
