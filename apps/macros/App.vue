<template>
	<app-wrapper v-bind="{ ...$props, title: 'Macros' }">
		<div class='macro-list'>
			<div v-for='(lists, category) in items' :key='category' class='macro__group'>
				<h1 v-if="category !== 'uncategorised'" class='macro__title'>
					{{ category }}
				</h1>
				<div v-for='(commands, label) in lists' :key='label' class='macro'>
					<button class='macro__cta' @click='inputTerminalCommands(commands)'>
						{{ label }}
					</button>
				</div>
			</div>
		</div>
	</app-wrapper>
</template>

<script>
	import { onMounted, ref } from 'vue'
	import { AppWrapper } from '@bitburner-theme-browser/common-components'
	import { inputTerminalCommands } from '@bitburner-theme-browser/common-helpers'

	export default {
		components: { AppWrapper },
		props: {
			id: {
				type: String,
				required: true,
			},
			appFilePath: {
				type: String,
				default: null,
			},
			versionFilePath: {
				type: String,
				default: null,
			},
		},
		setup ({ id }) {
			const items = ref({})

			// window[`${id}-macro-list`] = {
			// 	'Root everything': ['home', 'run /util/server/root-everything.js'],
			// 	'Show servers': ['home', 'run /gui/server-list.js'],
			// 	'Show processes': ['home', 'run /gui/process-list.js'],
			// 	'Buy': {
			// 		'Buy hacks': ['buy BruteSSH.exe', 'buy FTPCrack.exe', 'buy relaySMTP.exe', 'buy HTTPWorm.exe', 'buy SQLInject.exe'],
			// 		'Buy servers': ['home', 'run server-purchase.js --once'],
			// 	},
			// }

			const generateList = () => {
				const list = window[`${id}-macro-list`] || {}
				items.value = {
					uncategorised: Object.fromEntries(Object.entries(list)
						.filter(([, list]) => Array.isArray(list))
						.map(([label, commands]) => [label, commands])),
					...Object.fromEntries(Object.entries(list)
						.filter(([, list]) => !Array.isArray(list))
						.map(([label, commands]) => [label, commands])),
				}
			}

			onMounted((() => generateList()))

			return { items, inputTerminalCommands }
		},
	}
</script>

<style scoped lang="scss">
	@import "@bitburner-theme-browser/common-styles";

	:deep(.app-container .app) {
		height: 400px;
		width: 250px;
	}

	.macro-list {
		align-content: flex-start;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		min-height: 100%;
		padding: 6px;
	}

	.macro {
		margin: 0 15px 8px 3px;

		&__group {
			display: flex;
			flex: 1 0 100%;
			flex-wrap: wrap;
		}

		&__title {
			color: var(--secondary, #FFF);
			flex: 1 0 100%;
			font-family: $font-primary;
			font-size: 16px;
		}

		&__cta {
			background: none;
			border: none;
			border-radius: 2px;
			box-shadow: 0 0 0 1px var(--primary-dark, #444);
			color: var(--primary, #17af17);
			cursor: pointer;
			font-family: var(--fontfamily, monospace);
			line-height: 1;
			margin: 0;
			padding: 6px 8px;
			transition: box-shadow .2s linear;
			width: auto;

			&:hover {
				box-shadow: 0 0 0 1px var(--primary-light, #BBB);
			}
		}
	}
</style>
