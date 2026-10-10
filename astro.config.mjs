// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.calcvantage.com',
	trailingSlash: 'never',
	redirects: {
		'/blog/emergency-fund-calculator': '/blog/emergency-fund-size',
	},
});
