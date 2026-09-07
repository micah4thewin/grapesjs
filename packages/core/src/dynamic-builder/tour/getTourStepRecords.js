const getTourStepRecords = () => [
  {
    id: 'blocks-rail',
    selector: '[data-db-tool="blocks"]',
    title: 'Everything you can add lives here',
    description:
      'These buttons down the left open your tools. Blocks is the first one and it holds every ready-made piece you can put on a page.',
    side: 'right',
    align: 'start',
  },
  {
    id: 'blocks-dock',
    selector: '[data-db-dock]',
    title: 'Drag a block onto the page',
    description:
      'Pick a heading, a picture or a whole section and drag it onto the page. Nothing is final, so try one and move it around.',
    side: 'right',
    align: 'center',
  },
  {
    id: 'stage',
    selector: '[data-db-stage-canvas]',
    title: 'This is your page',
    description: 'Click any part of the page to select it. Double-click writing to type over it in place.',
    side: 'left',
    align: 'center',
  },
  {
    id: 'inspector',
    selector: '[data-db-inspector]',
    title: 'Change whatever you selected',
    description:
      'With something selected, this panel is where you set its wording, its link, its colours and how much space it takes.',
    side: 'left',
    align: 'start',
  },
  {
    id: 'pages',
    selector: '[data-db-tool="pages"]',
    title: 'A site can have many pages',
    description: 'Open Pages to add an About or Contact page, and to move between the pages you already have.',
    side: 'right',
    align: 'start',
  },
  {
    id: 'preview',
    selector: '[data-db-stage-preview]',
    title: 'Check it the way a visitor sees it',
    description:
      'Preview hides the editing tools so you can read the page as it will really look. Press it again to come back.',
    side: 'bottom',
    align: 'end',
  },
  {
    id: 'download',
    selector: '.gjs-db-download-button',
    title: 'Take the finished site with you',
    description:
      'Download packs every page, picture and style into one zip file that you can hand to a host and put online.',
    side: 'bottom',
    align: 'end',
  },
  {
    id: 'help',
    selector: '[data-db-tour-help]',
    title: 'Come back to this any time',
    description: 'This question mark starts the tour again. It is also in the Tools menu if you prefer the top bar.',
    side: 'right',
    align: 'end',
  },
];

export default getTourStepRecords;
