const getFlowRecipeRecords = () => [
  {
    id: 'exit-offer',
    label: 'Exit-intent offer',
    trigger: 'leave-intent',
    actions: [
      {
        type: 'alert',
        options: {
          kind: 'info',
          title: 'Before you go',
          text: 'Take 10% off your first order with the code WELCOME10.',
          confirmText: 'Copy the code',
          cancelText: 'No thanks',
        },
      },
      { type: 'copy-text', options: { text: 'WELCOME10' } },
    ],
  },
  {
    id: 'copy-coupon',
    label: 'Copy coupon code',
    trigger: 'click',
    actions: [
      { type: 'copy-text', options: { text: 'WELCOME10' } },
      { type: 'set-text', options: { text: 'Copied!' } },
      { type: 'wait', options: { delay: '1500' } },
      { type: 'set-text', options: { text: 'Copy code' } },
    ],
  },
  {
    id: 'back-to-top',
    label: 'Back to top',
    trigger: 'click',
    actions: [{ type: 'scroll-to', options: { target: 'body' } }],
  },
  {
    id: 'reveal-more',
    label: 'Reveal more content',
    trigger: 'click',
    actions: [
      { type: 'toggle', options: { target: '#more-content' } },
      { type: 'set-text', options: { text: 'Show less' } },
    ],
  },
  {
    id: 'confirm-external',
    label: 'Confirm before leaving to another site',
    trigger: 'click',
    actions: [
      {
        type: 'alert',
        options: {
          kind: 'question',
          title: 'Leaving this site',
          text: 'You are about to open another website. Continue?',
          confirmText: 'Continue',
          cancelText: 'Stay here',
        },
      },
      { type: 'open-url', options: { url: 'https://example.com', newTab: 'true' } },
    ],
  },
];

export default getFlowRecipeRecords;
