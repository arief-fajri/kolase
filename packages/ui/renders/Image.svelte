<script>
	export let src = '';
	export let imageClass = 'w-full h-full object-center object-cover';
	export let wrapperClass = '';

	let loaded;
	let error;
</script>

<div class="wrapper {wrapperClass}">
	{#if error}
		<div class="error">
			<svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" viewBox="0 0 1024 1024">
				<path
					fill="currentColor"
					d="M832.6 191.4c-84.6-84.6-221.5-84.6-306 0l-96.9 96.9l51 51l96.9-96.9c53.8-53.8 144.6-59.5 204 0c59.5 59.5 53.8 150.2 0 204l-96.9 96.9l51.1 51.1l96.9-96.9c84.4-84.6 84.4-221.5-.1-306.1M446.5 781.6c-53.8 53.8-144.6 59.5-204 0c-59.5-59.5-53.8-150.2 0-204l96.9-96.9l-51.1-51.1l-96.9 96.9c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l96.9-96.9l-51-51zM260.3 209.4a8.03 8.03 0 0 0-11.3 0L209.4 249a8.03 8.03 0 0 0 0 11.3l554.4 554.4c3.1 3.1 8.2 3.1 11.3 0l39.6-39.6c3.1-3.1 3.1-8.2 0-11.3z"
				/>
			</svg>
		</div>
	{:else}
		<img
			{src}
			alt=""
			class={imageClass}
			on:load={() => {
				loaded = true;
			}}
			on:error={() => {
				console.log('error');
				error = true;
				loaded = true;
			}}
		/>
	{/if}
	{#if !loaded}
		<div class="loader">
			<div class="placeholder w-full h-full" />
		</div>
	{/if}
</div>

<style>
	.wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.wrapper .error {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background: rgb(224, 224, 224);
	}
	.loader {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(224, 224, 224, 0.7);
	}
	.placeholder {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
		background: rgb(224, 224, 224);
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
</style>
