<script>
	import Icon from '@iconify/svelte';
	import Button from './Button.svelte';

	export let tag = '';
</script>

<Button variant="tag" size="xsmall" text={`#${tag}`}></Button>
