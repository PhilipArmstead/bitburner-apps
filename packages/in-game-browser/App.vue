<template>
	<app-container title='Bitburner Theme Browser' @app:close='destroy'>
		<div class='app'>
			<h1 class='title'>
				Theme Browser
			</h1>
			<theme-list :themes='themes' class='themes' @theme:preview='showPreview' />
		</div>
	</app-container>
</template>

<script>
	import AppContainer from './src/components/AppContainer/AppContainer.vue'
	import ThemeList from './src/components/ThemeList/ThemeList.vue'

	import { destroyApp, dispatchEvent } from './src/helpers/lifecycle'
	import { getThemes } from './src/services/themes'
	import { id } from './config/app'

	export default {
		components: { AppContainer, ThemeList },
		setup () {
			const themes = getThemes()
			const destroy = () => destroyApp(id)

			const showPreview = (themeData) => {
				dispatchEvent('theme:preview', themeData)
			}

			return { themes, destroy, showPreview }
		},
	}
</script>

<style scoped lang="scss">
	.app {
		background: #FFF;
		color: #333;
		display: flex;
		flex-direction: column;
		padding: 24px 32px;
	}

	.title {
		margin: 0 0 16px;
	}
</style>
