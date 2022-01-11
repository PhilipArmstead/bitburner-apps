<template>
	<app-container v-show='!isPreviewing' title='Bitburner Theme Browser' @app:close='destroy'>
		<div class='app'>
			<h1 class='title'>
				Theme Browser
			</h1>
			<theme-list :themes='themes' class='themes' @theme:preview='showPreview' />
			<p class='version'>
				{{ version }}
			</p>
		</div>
	</app-container>
	<div class='preview__ctas' :class='{ "preview__ctas--visible" : isPreviewing }'>
		<button class='preview__cta preview__cta--cancel' @click='cancelPreview'>
			<span class='sr-only'>Cancel</span>
		</button>
		<button class='preview__cta preview__cta--confirm' @click='destroy'>
			<span class='sr-only'>Confirm</span>
		</button>
	</div>
</template>

<script>
	import AppContainer from './src/components/AppContainer/AppContainer.vue'
	import ThemeList from './src/components/ThemeList/ThemeList.vue'

	import { ref } from 'vue'
	import { destroyApp, dispatchEvent } from './src/helpers/lifecycle'
	import { getThemes } from './src/services/themes'
	import { id } from './config/app'
	import { version } from './package.json'

	export default {
		components: { AppContainer, ThemeList },
		setup () {
			const isPreviewing = ref(false)
			const themes = getThemes()
			const destroy = () => destroyApp(id)

			const cancelPreview = (themeData) => {
				dispatchEvent('theme:cancel-preview', themeData)
				isPreviewing.value = false
			}
			const showPreview = (themeData) => {
				dispatchEvent('theme:preview', themeData)
				isPreviewing.value = true
			}

			return { isPreviewing, themes, version: window[`${id}-version`] || version, cancelPreview, destroy, showPreview }
		},
	}
</script>

<style scoped lang='scss'>
	.app {
		background: #FFF;
		color: #333;
		display: flex;
		flex-direction: column;
		padding: 24px 32px;
		position: relative;
	}

	.title {
		margin: 0 0 16px;
	}

	.preview__ctas {
		bottom: 0;
		display: flex;
		height: 16vmax;
		justify-content: space-between;
		position: fixed;
		right: 30px;
		transition: transform .25s cubic-bezier(0.4, 0.0, 0.2, 1);
		width: 16vmax;

		&:not(.preview__ctas--visible) {
			transform: translate(150px, 150px);

			.preview__cta {
				pointer-events: none;
			}
		}

		.preview__cta {
			align-items: center;
			border: none;
			border-radius: 50%;
			cursor: pointer;
			display: flex;
			flex: 0 1 48%;
			height: 7.68vmax;
			justify-content: center;
			padding: 0;
			position: relative;

			&::after {
				color: #FFF;
				font-family: sans-serif;
				font-size: 6vmax;
				line-height: 1;
			}

			&--cancel {
				background: #e33030d4;
				transform: translateY(5vmax);

				&::after {
					content: '𐄂';
					transform: translateY(-5%);
				}
			}

			&--confirm {
				background: #72d000d4;

				&::after {
					content: '🗸';
				}
			}
		}
	}

	.version {
		margin: 0;
		position: absolute;
		right: 0;
		top: 0;
	}

	.sr-only {
		clip: rect(1px, 1px, 1px, 1px);
		clip-path: inset(50%);
		height: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		width: 1px;
	}

	@keyframes slide-up-left {
		0% {
			transform: translate(150px, 150px);
		}

		100% {
			transform: translate(0, 0);
		}
	}
</style>
