<script lang="ts">
	import { base } from '$app/paths';
	import { SiteBanner, SiteFooter, SiteHeader } from '$lib';
	import { appLinksEnabled } from '$lib/app';
	import './layout.css';

	let { children } = $props();
</script>

<SiteBanner
	linkHref={appLinksEnabled ? undefined : `${base}/contact/?topic=test_access`}
	linkLabel={appLinksEnabled ? undefined : 'Request test access'}
/>
<SiteHeader />
{@render children()}
<SiteFooter />
