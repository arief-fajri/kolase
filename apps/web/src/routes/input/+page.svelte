<script>
	import { InputText, InputTextarea, InputNumber, Checkbox } from '@kolase/ui';
</script>

<section>
	<div class="mb-8">
		<h1 class="font-semibold mb-2">INPUT</h1>
		<div class="w-full flex flex-wrap items-center gap-4">
			<div class="w-[320px]">
				<InputText type="text" label="Text" />
			</div>
			<div class="w-[320px]">
				<InputText type="number" label="Number/Tel" />
			</div>
			<div class="w-[320px]">
				<InputText type="password" label="Password" />
			</div>
			<div class="w-[320px]">
				<InputText type="text" label="Disabled" disabled />
			</div>
			<div class="w-[320px]">
				<InputNumber label="Number Only" />
			</div>
			<div class="w-[320px]">
				<Checkbox label="Number Only" />
			</div>
		</div>
	</div>

	<div class="mb-8">
		<h1 class="font-semibold mb-2">TEXTAREA</h1>
		<div class="w-full flex flex-wrap items-center gap-4">
			<div class="w-[320px]">
				<InputTextarea rows={3} label="Descriptions" />
			</div>
		</div>
	</div>
</section>
