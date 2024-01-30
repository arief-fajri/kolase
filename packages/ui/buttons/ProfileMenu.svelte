<script>
	import { goto } from '$app/navigation';
	import { clickOutside } from '$lib/helpers/click-outside';

	import DropdownWrapper from '$lib/components/dropdowns/DropdownWrapper.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import { sid, user } from '$lib/stores';
	import { fetchApi } from '$lib/helpers/fetch-api';
	import { apiRoutes } from '$lib/config';

	export let profileWidth = 36;
	export let profileHeight = 36;
	export let mainMenu = [];

	let visible;
	let processingSignOut;

	$: if ($sid && !$user.id) {
		fetchApi(apiRoutes.account).then((res) => {
			if (res.status === 200) {
				user.set(res.body);
			}
		});
	}

	const signOut = async () => {
		processingSignOut = true;
		const reqFetchLogout = await fetchApi(apiRoutes.signout, { method: 'POST' });

		if (reqFetchLogout.status === 200) {
			const reqLogout = await fetch('/logout', { method: 'POST' });

			if (reqLogout.status === 200) {
				visible = false;
				location.href = '/login';
			}
		}
	};
</script>

<div
	class="relative z-[100]"
	use:clickOutside
	on:outclick={() => {
		visible = false;
	}}
>
	<button
		style="--profile-width: {profileWidth}px; --profile-height: {profileHeight}px"
		on:click={() => {
			visible = !visible;
		}}
	>
		<div class="profile-picture overflow-hidden" class:isActive={visible}>
			{#if $user.avatar}
				<img src={$user.avatar} alt="" class="w-full h-full object-center object-cover" />
			{/if}
		</div>
	</button>
	<DropdownWrapper bind:visible top={profileHeight + 12} rtl width="240px">
		<div slot="items" class="p-2">
			<div class="flex items-center gap-2 border-b pb-2">
				<div
					class="flex-none w-[48px] h-[48px] rounded-full bg-[--primary-container] overflow-hidden"
				>
					{#if $user.avatar}
						<img src={$user.avatar} alt="" class="w-full h-full object-center object-cover" />
					{/if}
				</div>
				<div class="truncate">
					<p class="font-semibold truncate">
						{$user.name || $user.username || $user.email || 'noName'}
					</p>
					{#if $user.email && ($user.name || $user.username)}
						<p class="text-[12px]">{$user.email || ''}</p>{/if}
				</div>
			</div>
			{#if mainMenu.length}
				<div class="pt-2">
					{#each mainMenu as menu}
						<Button
							text={menu.name}
							variant="tertiary"
							size="small"
							customClass="w-full"
							on:click={() => {
								goto(menu.url);
								visible = false;
							}}
						/>
					{/each}
				</div>
			{/if}
			<div class="pt-2">
				<Button
					bind:processing={processingSignOut}
					text="Keluar"
					variant="tertiary"
					size="small"
					customClass="w-full"
					on:click={signOut}
				/>
			</div>
		</div>
	</DropdownWrapper>
</div>

<style lang="postcss">
	button {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.profile-picture {
		width: var(--profile-width);
		height: var(--profile-height);
		border-radius: 9999px;
		background: var(--primary-container);
		transition: 0.2s ease;
	}

	.profile-picture:hover,
	.profile-picture.isActive {
		box-shadow:
			0 0 0 2px hsl(0, 0%, 100%),
			0 0 0 4px hsl(0, 0%, 75%);
	}
</style>
