<script>
	import '../app.css';
	import Sidebar from '../lib/layouts/Sidebar.svelte';
</script>

<svelte:head>
	<title>KOLASE</title>
</svelte:head>

<Sidebar />

<main class="p-8">
	<slot />
</main>

<style>
	main {
		margin-left: 180px; /* Same width as the sidebar + left position in px */
	}
</style>
