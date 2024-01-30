<script>
	import { createEventDispatcher } from 'svelte';
	import Icon from '@iconify/svelte';

	export let ratio = '16/9';
	export let accept = 'image/*';

	let fileUploaded = {};
	let uploading;

	const dispatch = createEventDispatcher();

	const getAsset = (file) => {
		uploading = true;
		let fi = file;
		let reader = new FileReader();
		reader.readAsDataURL(fi);
		reader.onload = (e) => {
			fileUploaded = { url: e.target.result, file: fi, type: fi.type };
			dispatch('input', fileUploaded);
		};
	};
</script>

<div class="upload-wrapper" style="--ratio: {ratio}">
	{#if fileUploaded.url}
		<img
			src={fileUploaded.url}
			alt=""
			class="w-full h-full object-center object-cover"
			on:load={() => {
				setTimeout(() => {
					uploading = false;
				}, 1000);
			}}
		/>
		<label class="change-file">
			<input
				type="file"
				{accept}
				on:click={(e) => {
					e.target.value = null;
				}}
				on:change={(e) => {
					const file = e.target.files[0];
					getAsset(file);
				}}
			/>
			<slot name="change-button">
				<div class="rounded-full p-2 bg-gray-500">
					<div class="text-2xl text-white">
						<Icon icon="eva:upload-fill" />
					</div>
				</div>
			</slot>
		</label>
	{:else}
		<label class="upload-button">
			<input
				type="file"
				{accept}
				on:click={(e) => {
					e.target.value = null;
				}}
				on:change={(e) => {
					const file = e.target.files[0];
					getAsset(file);
				}}
			/>
			<slot name="cover-button">
				<div class="rounded-full p-2 bg-gray-500 mb-3">
					<div class="text-2xl text-white">
						<Icon icon="eva:upload-fill" />
					</div>
				</div>
				<p class="font-semibold">Unggah Bukti tugas</p>
			</slot>
		</label>
	{/if}

	{#if uploading}
		<div class="uploading">
			<slot name="loading">
				<div class="text-[--surface]">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="4rem"
						height="4rem"
						viewBox="0 0 24 24"
						{...$$props}
					>
						<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
							<path
								stroke-dasharray="2 4"
								stroke-dashoffset="6"
								d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"
							>
								<animate
									attributeName="stroke-dashoffset"
									dur="0.6s"
									repeatCount="indefinite"
									values="6;0"
								/>
							</path>
							<path
								stroke-dasharray="30"
								stroke-dashoffset="30"
								d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21"
							>
								<animate
									fill="freeze"
									attributeName="stroke-dashoffset"
									begin="0.1s"
									dur="0.3s"
									values="30;0"
								/>
							</path>
							<path stroke-dasharray="10" stroke-dashoffset="10" d="M12 16v-7.5">
								<animate
									fill="freeze"
									attributeName="stroke-dashoffset"
									begin="0.5s"
									dur="0.2s"
									values="10;0"
								/>
							</path>
							<path stroke-dasharray="6" stroke-dashoffset="6" d="M12 8.5l3.5 3.5M12 8.5l-3.5 3.5">
								<animate
									fill="freeze"
									attributeName="stroke-dashoffset"
									begin="0.7s"
									dur="0.2s"
									values="6;0"
								/>
							</path>
						</g>
					</svg>
				</div>
			</slot>
		</div>
	{/if}
</div>

<style>
	.upload-wrapper {
		position: relative;
		overflow: hidden;
		border-radius: 0.5rem;
		background: var(--surface-container);
		width: 100%;
		aspect-ratio: var(--ratio);
	}

	.uploading {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(6px);
	}

	.upload-button {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.change-file {
		position: absolute;
		cursor: pointer;
		bottom: 10px;
		right: 10px;
	}

	input {
		position: absolute;
		width: 0;
		height: 0;
		visibility: hidden;
	}
</style>
