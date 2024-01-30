<script>
	import { page } from '$app/stores';

	export let title = '';
	export let metadata = {};
	export let googleTracking = '';

	const defaultdata = {
		type: 'website',
		locale: 'id_ID',
		title: 'vcomm',
		description: '',
		image: `${$page.url.origin}/Logo.png`,
		imgAlt: 'vcomm',
		url: 'https://vcom-demo.volantis.io',
		card: 'summary_large_image'
	};

	$: if (googleTracking) {
		if (typeof gtag !== 'undefined') {
			gtag('config', googleTracking, {
				page_path: $page.url.pathname
			});
		}
	}
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title || metadata.title || defaultdata.title}</title>
	<meta name="title" content={metadata.title || defaultdata.title} />
	<meta name="description" content={metadata.description || defaultdata.description} />

	{#if metadata.robots}
		<meta
			name="robots"
			content={Array.isArray(metadata.robots) ? metadata.robots.join(',') : metadata.robots}
		/>
	{/if}

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={metadata.type || defaultdata.type} />
	<meta property="og:locale" content={metadata.locale || defaultdata.locale} />
	<meta property="og:title" content={metadata.title || defaultdata.title} />
	<meta property="og:url" content={metadata.url || defaultdata.url} />
	<meta property="og:description" content={metadata.description || defaultdata.description} />
	<meta property="og:image" content={metadata.image || defaultdata.image} />

	<!-- Twitter -->
	<!-- <meta property="twitter:card" content={metadata.card || defaultdata.card} />
	<meta property="twitter:url" content={metadata.url || defaultdata.url} />
	<meta property="twitter:title" content={metadata.title || defaultdata.title} />
	<meta property="twitter:description" content={metadata.description || defaultdata.description} />
	<meta property="twitter:image" content={metadata.image || defaultdata.image} /> -->

	{#if googleTracking}
		<script async src="https://www.googletagmanager.com/gtag/js?id={googleTracking}"></script>
		<script defer>
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
		</script>
	{/if}
</svelte:head>
