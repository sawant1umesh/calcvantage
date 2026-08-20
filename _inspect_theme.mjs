import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });

  // Inspect the theme-switcher and all its ancestors
  const info = await page.evaluate(() => {
    const themeSwitcher = document.querySelector('#theme-switcher');
    if (!themeSwitcher) return { error: '#theme-switcher not found' };

    const headerActions = document.querySelector('.header-actions');
    const headerContainer = document.querySelector('.header-container');
    const appHeader = document.querySelector('.app-header');

    const getComputed = (el) => {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        display: s.display,
        position: s.position,
        flexDirection: s.flexDirection,
        justifyContent: s.justifyContent,
        alignItems: s.alignItems,
        gap: s.gap,
        margin: s.margin,
        marginRight: s.marginRight,
        padding: s.padding,
        paddingRight: s.paddingRight,
        paddingLeft: s.paddingLeft,
        maxWidth: s.maxWidth,
        width: s.width,
        left: r.left,
        right: r.right,
        top: r.top,
        bottom: r.bottom,
        rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        overflow: s.overflow,
        overflowX: s.overflowX,
      };
    };

    // Walk up ancestors
    const ancestors = [];
    let el = themeSwitcher;
    while (el && el !== document.body) {
      ancestors.push({
        tag: el.tagName,
        class: el.className,
        id: el.id,
        computed: getComputed(el),
      });
      el = el.parentElement;
    }

    // Check for any absolute/fixed positioning in header area
    const allHeaderEls = appHeader ? appHeader.querySelectorAll('*') : [];
    const positioned = [];
    allHeaderEls.forEach(child => {
      const s = window.getComputedStyle(child);
      if (s.position === 'absolute' || s.position === 'fixed') {
        positioned.push({
          tag: child.tagName,
          class: child.className,
          position: s.position,
          left: s.left,
          right: s.right,
          top: s.top,
          transform: s.transform,
        });
      }
    });

    // Get header-actions computed
    const headerActionsComputed = headerActions ? {
      display: window.getComputedStyle(headerActions).display,
      flex: window.getComputedStyle(headerActions).flex,
      flexDirection: window.getComputedStyle(headerActions).flexDirection,
      marginRight: window.getComputedStyle(headerActions).marginRight,
      rect: headerActions.getBoundingClientRect(),
      children: Array.from(headerActions.children).map(c => ({
        tag: c.tagName,
        class: c.className,
        display: window.getComputedStyle(c).display,
        marginRight: window.getComputedStyle(c).marginRight,
        marginLeft: window.getComputedStyle(c).marginLeft,
        rect: c.getBoundingClientRect(),
      })),
    } : null;

    // Get viewport width
    const viewportWidth = window.innerWidth;

    // Get theme-switcher rect specifically
    const themeSwitcherRect = themeSwitcher.getBoundingClientRect();
    const themeSwitcherComputed = window.getComputedStyle(themeSwitcher);

    return {
      viewportWidth,
      themeSwitcher: {
        rect: themeSwitcherRect,
        marginRight: themeSwitcherComputed.marginRight,
        marginLeft: themeSwitcherComputed.marginLeft,
        display: themeSwitcherComputed.display,
        position: themeSwitcherComputed.position,
        transform: themeSwitcherComputed.transform,
      },
      headerActions: headerActionsComputed,
      headerContainer: {
        display: window.getComputedStyle(headerContainer).display,
        justifyContent: window.getComputedStyle(headerContainer).justifyContent,
        paddingRight: window.getComputedStyle(headerContainer).paddingRight,
        paddingLeft: window.getComputedStyle(headerContainer).paddingLeft,
        rect: headerContainer.getBoundingClientRect(),
      },
      positioned,
      ancestors: ancestors.slice(0, 6),
    };
  });

  console.log(JSON.stringify(info, null, 2));

  // Take a screenshot of just the header area
  const header = page.locator('.app-header');
  await header.screenshot({ path: 'D:\\Demo\\mortgage_calculator\\_header_screenshot.png' });
  console.log('Header screenshot saved.');

  await browser.close();
})();
