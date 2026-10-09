const defaultAppOrigin = 'https://app.cadence.engineer';

function normalizeAppOrigin(value: string | undefined) {
	const configuredOrigin = value?.trim() || defaultAppOrigin;
	const originWithScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(configuredOrigin)
		? configuredOrigin
		: `https://${configuredOrigin.replace(/^\/+/, '')}`;

	return new URL(originWithScheme).origin;
}

export const appOrigin = normalizeAppOrigin(import.meta.env.PUBLIC_APP_ORIGIN);

// Let the app check the browser session before choosing Daily or sign-in.
export const appUrl = `${appOrigin}/`;

export const appLinksEnabled = import.meta.env.PUBLIC_APP_LINKS_ENABLED === 'true';

// Absolute origin of this site, used for social-preview metadata.
export const siteOrigin = normalizeAppOrigin(
	import.meta.env.PUBLIC_SITE_ORIGIN || 'https://cadence.engineer'
);
