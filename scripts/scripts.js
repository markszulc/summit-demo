import {
  sampleRUM,
  buildBlock,
  getMetadata,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
  toClassName,
} from './lib-franklin.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list
window.hlx.RUM_GENERATION = 'project-1'; // add your RUM generation information here

// Define the custom audiences mapping for experimentation
const EXPERIMENTATION_CONFIG = {
  audiences: {
    device: {
      mobile: () => window.innerWidth < 600,
      desktop: () => window.innerWidth >= 600,
    },
  },
};

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  const subhead = main.querySelector('h4');
  const cta = document.createElement('p');
  cta.className = "cta";
  cta.innerHTML = '<span class="evo-button__content"><span class="evo-button__content__copy">Schedule a consultation</span><span class="evo-button__content__icon ml-2"><evo-icon name="arrow-right"><!----><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" class="icon icon-md icon-fill-text icon-stroke-text " style="" viewBox="0 0 24 24"><path class="icon-arrow-right__arrow" d="M0,7.5v-1A.477.477,0,0,1,.45,6H15L11,1.558a.54.54,0,0,1,0-.71l.639-.7a.419.419,0,0,1,.639,0L17.8,6.28a.8.8,0,0,1,.2.53v.38a.816.816,0,0,1-.2.53l-5.526,6.132a.419.419,0,0,1-.639,0L11,13.142a.529.529,0,0,1,0-.7L15,8H.45A.477.477,0,0,1,0,7.5Z" transform="translate(3 5)"></path></svg></evo-icon></span></span>';
  const herocontent = document.createElement("div");
  herocontent.classList.add('banner-content');
  herocontent.append(h1);
  herocontent.append(subhead);
  herocontent.append(cta);
  
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, herocontent] }));
    main.prepend(section);
  }
}

/**
 * Builds sidebar block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildSidebarBlock(main) {
  const section = document.createElement('sidebar');
  section.innerHTML = '<ul><li><img src="icons/bullseye.svg" role="presentation">Plan</li><li><img src="icons/invest.svg" role="presentation">Invest</li><li><img src="icons/insure.svg" role="presentation">Insure</li><li><img src="icons/retire.svg" role="presentation">Retire</li><li><img src="icons/help.svg" role="presentation">Help</li></ul>';
  section.className = 'sidebar-wrapper';
  const parentdiv = document.body;
  const header = document.querySelector('header');
  header.insertAdjacentElement("afterend", section);
}


/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
    buildSidebarBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {

  // load experiments
  const experiment = toClassName(getMetadata('experiment'));
  const instantExperiment = getMetadata('instant-experiment');
  if (instantExperiment || experiment) {
    const { runExperiment } = await import('./experimentation/index.js');
    await runExperiment(experiment, instantExperiment, EXPERIMENTATION_CONFIG);
  }
  
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    await waitForLCP(LCP_BLOCKS);
  }
}

/**
 * Adds the favicon.
 * @param {string} href The favicon URL
 */
export function addFavIcon(href) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = href;
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  addFavIcon(`${window.hlx.codeBasePath}/styles/favicon.ico`);
  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));

    // Load experimentation preview overlay
    if (window.location.hostname === 'localhost' || window.location.hostname.endsWith('.hlx.page')) {
      const preview = await import(`${window.hlx.codeBasePath}/tools/preview/preview.js`);
      await preview.default();
      if (window.hlx.experiment) {
        const experimentation = await import(`${window.hlx.codeBasePath}/tools/preview/experimentation.js`);
        experimentation.default();
      }
    }
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  const prubody = document.querySelector('body');
  prubody.classList.add('prudentialgrid');
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
