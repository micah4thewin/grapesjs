const buildPublishNextStepsMarkup = () =>
  [
    '<details class="gjs-db-export-details">',
    '<summary class="gjs-db-export-summary">What to do with the download</summary>',
    '<ol class="gjs-db-export-steps">',
    '<li>Unzip the file. You get one HTML file per page plus styles.css and site.js.</li>',
    '<li>Upload the whole folder to any static web host: drag it onto Netlify Drop, push it to GitHub Pages, ',
    'or deploy it with Cloudflare Pages.</li>',
    '<li>Point your domain at the host and enter the same address in Site settings so links and the sitemap match.</li>',
    '</ol>',
    '</details>',
  ].join('');

export default buildPublishNextStepsMarkup;
