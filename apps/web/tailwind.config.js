/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@kolase/ui/**/*.{html,js,svelte,ts}',
		'../../packages/ui/**/*.svelte' // for using 'packages/ui'
	],
	theme: {
		extend: {}
	},
	plugins: []
};