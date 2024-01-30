<script>
</script>

<div class="flex items-center">
	{#each { length: 5 } as _}
		<div class="-ml-1 first:ml-0 overflow-hidden participant">
			<!-- <img src="" alt=""> -->
		</div>
	{/each}
	<div class="-ml-1 participant-length">
		<p>+9</p>
	</div>
</div>

<style>
	.participant,
	.participant-length {
		border-radius: 9999px;
		width: 24px;
		height: 24px;
		background: var(--surface-container);
		box-shadow: inset 0 0 0 1px var(--primary);
	}
	.participant-length {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--primary);
		color: var(--on-primary);
		font-size: 12px;
	}
</style>
