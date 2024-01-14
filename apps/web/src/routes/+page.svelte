<script>
	import { InputText, InputTextarea, Modal, Button } from '@kolase/ui';

	let openModal;
</script>

<h1>Web</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div style="width: 320px; margin-top: 12px;">
	<InputText type="password" />
</div>

<div style="width: 320px; margin-top: 12px;">
	<InputTextarea rows={3} />
</div>

<div style="margin-top: 12px;">
	<button
		on:click={() => {
			openModal = true;
		}}
	>
		Open Modal
	</button>

	<div style="margin-top:6px">
		<Button variant="primary"></Button>
	</div>
	<div style="margin-top:6px">
		<Button variant="secondary"></Button>
	</div>
	<div style="margin-top:6px">
		<Button variant="tertiary"></Button>
	</div>
</div>

<Modal bind:visible={openModal}><p style="padding: 4px; margin: 0px">cek</p></Modal>
