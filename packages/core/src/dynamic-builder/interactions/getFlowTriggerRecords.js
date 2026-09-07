const getFlowTriggerRecords = () => [
  {
    id: 'click',
    label: 'When clicked',
    hint: 'Runs when a visitor clicks this element or presses Enter on it. Anything that is not already a button or link becomes keyboard focusable.',
    fields: [],
  },
  {
    id: 'hover',
    label: 'On hover in',
    hint: 'Runs when the pointer enters this element, or when it gets keyboard focus.',
    fields: [],
  },
  {
    id: 'hover-out',
    label: 'On hover out',
    hint: 'Runs when the pointer leaves this element, or when keyboard focus moves away.',
    fields: [],
  },
  { id: 'page-load', label: 'On page load', hint: 'Runs once as soon as the page is ready.', fields: [] },
  {
    id: 'delay',
    label: 'After a delay',
    hint: 'Runs once, this long after the page loads.',
    fields: [{ name: 'delay', label: 'Wait for', type: 'seconds', default: '3000' }],
  },
  {
    id: 'interval',
    label: 'On a timer',
    hint: 'Repeats for as long as the page is open.',
    fields: [{ name: 'interval', label: 'Every', type: 'seconds', default: '5000' }],
  },
  { id: 'in-view', label: 'When scrolled into view', hint: 'Runs the first time this element is seen.', fields: [] },
  { id: 'submit', label: 'On form submit', hint: 'Runs when this form (or the form around it) submits.', fields: [] },
  { id: 'change', label: 'On value change', hint: 'Runs when this field changes.', fields: [] },
  {
    id: 'key',
    label: 'On key press',
    hint: 'Runs when a visitor presses this key anywhere on the page. Typing inside a form field is ignored unless you allow it.',
    fields: [
      { name: 'key', label: 'Key', type: 'text', placeholder: 'Escape', default: 'Escape' },
      { name: 'whileTyping', label: 'Also while typing in a field', type: 'checkbox', default: 'false' },
    ],
  },
  {
    id: 'remembered',
    label: 'When a remembered value exists',
    hint: 'Runs on page load when a value saved earlier with "Remember a value" is present, for example after a visitor closed a banner.',
    fields: [
      { name: 'key', label: 'Name of the value', type: 'text', placeholder: 'banner-closed' },
      { name: 'value', label: 'Only if it equals (optional)', type: 'text', placeholder: 'yes' },
    ],
  },
  {
    id: 'leave-intent',
    label: 'When leaving the page',
    hint: 'Runs once when the pointer exits the top of the window.',
    fields: [],
  },
];

export default getFlowTriggerRecords;
