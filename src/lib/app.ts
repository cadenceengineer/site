const defaultAppOrigin = 'https://app.cadence.engineer';

function normalizeAppOrigin(value: string | undefined) {
	const configuredOrigin = value?.trim() || defaultAppOrigin;
	const originWithScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(configuredOrigin)
		? configuredOrigin
		: `https://${configuredOrigin.replace(/^\/+/, '')}`;

	return new URL(originWithScheme).origin;
}

export const appOrigin = normalizeAppOrigin(import.meta.env.PUBLIC_APP_ORIGIN);

export const signInUrl = `${appOrigin}/signin`;

export const appLinksEnabled = import.meta.env.PUBLIC_APP_LINKS_ENABLED === 'true';

// The pricing section is hidden while CadenceEngineer is in early access.
export const pricingEnabled = import.meta.env.PUBLIC_PRICING_ENABLED === 'true';

// Absolute origin of this site, used for social-preview metadata.
export const siteOrigin = normalizeAppOrigin(
	import.meta.env.PUBLIC_SITE_ORIGIN || 'https://cadence.engineer'
);
