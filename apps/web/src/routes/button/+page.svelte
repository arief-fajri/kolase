<script>
	import { Button } from '@kolase/ui';
</script>

<section>
	<div class="mb-8">
		<h1 class="font-semibold mb-2">BUTTON SIZE</h1>
		<div class="w-full flex flex-wrap items-center gap-4">
			<Button text="xsmall" size="xsmall" />
			<Button text="small" size="small" />
			<Button text="medium" size="medium" />
			<Button text="large" size="large" />
			<Button text="xlarge" size="xlarge" />
		</div>
	</div>

	<div class="mb-8">
		<h1 class="font-semibold mb-2">BUTTON VARIANT</h1>
		<div class="w-full flex flex-wrap items-center gap-4">
			<Button text="primary" variant="primary" />
			<Button text="secondary" variant="secondary" />
			<Button text="tertiary" variant="tertiary" />
			<Button text="tab" variant="tab" />
			<Button text="label" variant="label" />
			<Button text="danger" variant="danger" />
			<Button text="text only" variant="textOnly">
				<!-- <p>TEXT ONLY</p> -->
			</Button>
		</div>
	</div>

	<div class="mb-8">
		<h1 class="font-semibold mb-2">BUTTON VARIANT OVERIDE</h1>
		<div class="w-full flex flex-wrap items-center gap-4">
			<Button text="menu" variant="menu" isActive />
		</div>
	</div>
</section>
