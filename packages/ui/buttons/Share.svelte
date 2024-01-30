<script>
	import Icon from '@iconify/svelte';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { innerWidth } from '$lib/stores';

	export let url = '';
	// export let text = '';
	export let shareButton = [
		'link',
		'facebook',
		'twitter',
		'linkedin',
		'whatsapp',
		'line',
		'telegram',
		'instagram' // not supported yet
	];

	export let inline = true;

	let tercopy;
	let openShare;

	let socmed = [
		{
			name: 'Twitter',
			key: 'twitter',
			icon: 'ri:twitter-fill',
			url: 'https://twitter.com/share?url='
		},
		{
			name: 'Facebook',
			key: 'facebook',
			icon: 'ri:facebook-circle-fill',
			url: 'https://facebook.com/sharer.php?u='
		},
		{
			name: 'LinkedIn',
			key: 'linkedin',
			icon: 'ri:linkedin-box-fill',
			url: 'http://www.linkedin.com/shareArticle?mini=true&url='
		},
		{
			name: 'WhatsApp',
			key: 'whatsapp',
			icon: 'ri:whatsapp-fill',
			url: 'https://api.whatsapp.com/send?text='
		},
		{
			name: 'Line',
			key: 'line',
			icon: 'ri:line-fill',
			url: 'https://social-plugins.line.me/lineit/share?url='
		},
		{
			name: 'Telegram',
			key: 'telegram',
			icon: 'cib:telegram-plane',
			url: 'https://telegram.me/share/url?url='
		}
	];

	const copyLink = async (txt) => {
		try {
			await navigator.clipboard.writeText(txt);
			tercopy = true;
			setTimeout(() => {
				tercopy = false;
			}, 5000);
			/* Resolved - text copied to clipboard successfully */
		} catch (err) {
			console.error('failed to copy: ', err);
			/* Rejected - text failed to copy to the clipboard */
		}
	};
</script>

{#if inline}
	<div class="flex items-center gap-2">
		{#if shareButton.includes('link')}
			<button
				class="p-2 flex flex-col items-center justify-center text-base-lightest w-[90px] md:hover:text-primary"
				on:click={() => {
					copyLink(url);
				}}
			>
				<div class="text-3xl">
					<Icon icon={tercopy ? 'eva:checkmark-circle-fill' : 'eva:copy-outline'} />
				</div>
				<p class="font-semibold mt-2 text-[14px]">
					{tercopy ? 'Copied' : 'Copy Link'}
				</p>
			</button>
		{/if}

		{#each socmed as s}
			{#if shareButton.includes(s.key)}
				<a
					href={`${s.url}${url}`}
					target="_blank"
					class="p-2 flex flex-col items-center justify-center text-base-lightest w-[90px] md:hover:text-primary"
				>
					<div class="text-3xl">
						<Icon icon={s.icon} />
					</div>
					<p class="font-semibold mt-2 text-[14px]">{s.name}</p>
				</a>
			{/if}
		{/each}
	</div>
{:else}
	<button
		class="flex items-center gap-2 group btn-share-txt"
		data-text="Bagikan"
		on:click={() => {
			openShare = true;
		}}
	>
		<div class="hidden group-hover:block">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path
					fill="currentColor"
					d="m13.576 17.271l-5.11-2.787a3.5 3.5 0 1 1 0-4.968l5.11-2.787a3.5 3.5 0 1 1 .958 1.755l-5.11 2.787a3.514 3.514 0 0 1 0 1.457l5.11 2.788a3.5 3.5 0 1 1-.958 1.755"
				/>
			</svg>
		</div>
		<div class="group-hover:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path
					fill="currentColor"
					d="m13.12 17.023l-4.199-2.29a4 4 0 1 1 0-5.465l4.2-2.29a4 4 0 1 1 .958 1.755l-4.2 2.29a4.008 4.008 0 0 1 0 1.954l4.2 2.29a4 4 0 1 1-.959 1.755M6 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m11-6a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
				/>
			</svg>
		</div>
		<p class="hidden md:block">Bagikan</p>
	</button>

	<Modal bind:visible={openShare} position={$innerWidth > 768 ? 'center' : 'bottom'}>
		<div class="flex flex-wrap items-center justify-center gap-3 w-full md:w-[460px] p-4">
			{#if shareButton.includes('link')}
				<button
					class="p-2 flex flex-col items-center justify-center text-base-lightest w-[90px] md:hover:text-primary"
					on:click={() => {
						copyLink(url);
					}}
				>
					<div class="text-3xl">
						<Icon icon={tercopy ? 'eva:checkmark-circle-fill' : 'eva:copy-outline'} />
					</div>
					<p class="font-semibold mt-2 text-[14px]">
						{tercopy ? 'Copied' : 'Copy Link'}
					</p>
				</button>
			{/if}

			{#each socmed as s}
				{#if shareButton.includes(s.key)}
					<a
						href={`${s.url}${url}`}
						target="_blank"
						class="p-2 flex flex-col items-center justify-center text-base-lightest w-[90px] md:hover:text-primary"
					>
						<div class="text-3xl">
							<Icon icon={s.icon} />
						</div>
						<p class="font-semibold mt-2 text-[14px]">{s.name}</p>
					</a>
				{/if}
			{/each}
		</div>
	</Modal>
{/if}

<style lang="postcss">
	.btn-share-txt p {
		text-shadow:
			-0.25px -0.25px 0 transparent,
			0.25px 0.25px transparent;
	}
	.btn-share-txt:hover p {
		text-shadow:
			-0.25px -0.25px 0 var(--primary),
			0.25px 0.25px var(--primary);
	}
</style>
