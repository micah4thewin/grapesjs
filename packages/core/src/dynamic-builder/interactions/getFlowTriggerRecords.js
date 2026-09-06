const getFlowTriggerRecords = () => [
  { id: 'click', label: 'When clicked', hint: 'Runs when a visitor clicks this element.', fields: [] },
  { id: 'hover', label: 'On hover in', hint: 'Runs when the pointer enters this element.', fields: [] },
  { id: 'hover-out', label: 'On hover out', hint: 'Runs when the pointer leaves this element.', fields: [] },
  { id: 'page-load', label: 'On page load', hint: 'Runs once as soon as the page is ready.', fields: [] },
  {
    id: 'delay',
    label: 'After a delay',
    hint: 'Runs once, this many milliseconds after the page loads.',
    fields: [{ name: 'delay', label: 'Delay (ms)', type: 'number', default: '3000' }],
  },
  {
    id: 'interval',
    label: 'Every few seconds',
    hint: 'Repeats on a timer for as long as the page is open.',
    fields: [{ name: 'interval', label: 'Every (ms)', type: 'number', default: '5000' }],
  },
  { id: 'in-view', label: 'When scrolled into view', hint: 'Runs the first time this element is seen.', fields: [] },
  { id: 'submit', label: 'On form submit', hint: 'Runs when this form (or the form around it) submits.', fields: [] },
  { id: 'change', label: 'On value change', hint: 'Runs when this field changes.', fields: [] },
  {
    id: 'key',
    label: 'On key press',
    hint: 'Runs when a visitor presses this key anywhere on the page.',
    fields: [{ name: 'key', label: 'Key', type: 'text', placeholder: 'Escape', default: 'Escape' }],
  },
  {
    id: 'leave-intent',
    label: 'When leaving the page',
    hint: 'Runs once when the pointer exits the top of the window.',
    fields: [],
  },
];

export default getFlowTriggerRecords;
