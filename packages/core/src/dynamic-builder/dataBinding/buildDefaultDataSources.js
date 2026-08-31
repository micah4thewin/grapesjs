const buildDefaultDataSources = () => ({
  siteInfo: {
    name: 'Northwind Studio',
    tagline: 'Design-forward websites for growing teams',
    email: 'hello@northwind.studio',
    phone: '+1 (555) 010-2030',
    address: '410 Harbor Lane, Portland, OR 97209',
  },
  teamMembers: [
    { name: 'Avery Collins', role: 'Creative Director', bio: 'Leads brand and product design across every project.' },
    { name: 'Jordan Blake', role: 'Lead Engineer', bio: 'Builds fast, accessible sites and keeps tooling sharp.' },
    { name: 'Riley Chen', role: 'Content Strategist', bio: 'Turns rough ideas into clear, persuasive copy.' },
  ],
  testimonials: [
    {
      quote: 'They rebuilt our site in three weeks and doubled signups.',
      author: 'Maya Torres',
      company: 'Brightlane',
    },
    { quote: 'Clear process, sharp design, zero surprises at launch.', author: 'Sam Whitfield', company: 'Fernworks' },
    { quote: 'The best agency partner we have worked with, hands down.', author: 'Priya Nair', company: 'Cloudmesa' },
  ],
  faqs: [
    { question: 'How long does a typical project take?', answer: 'Most sites launch within four to six weeks.' },
    { question: 'Do you offer ongoing maintenance?', answer: 'Monthly care plans cover updates and small changes.' },
    {
      question: 'Can you migrate our existing content?',
      answer: 'We migrate pages, posts, and media in every rebuild.',
    },
    {
      question: 'What platforms do you build on?',
      answer: 'Fast static sites with a visual editor your team can use.',
    },
  ],
  products: [
    { name: 'Starter Site', price: '$2,400', description: 'A five page marketing site with custom design and CMS.' },
    { name: 'Growth Site', price: '$5,800', description: 'Ten pages, blog, integrations, and conversion tracking.' },
    { name: 'Commerce Site', price: '$9,500', description: 'Full storefront with checkout, catalog, and analytics.' },
  ],
});

export default buildDefaultDataSources;
