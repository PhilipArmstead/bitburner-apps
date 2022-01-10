<template>
	<app-container title='Bitburner Theme Browser' @app:close='destroyApp'>
		<div class='app'>
			<h1 class='title'>
				Theme Browser
			</h1>
			<theme-list :themes='themes' class='themes' />
		</div>
	</app-container>
</template>

<script lang='ts'>
	import AppContainer from './src/components/AppContainer/AppContainer.vue'
	import ThemeList from './src/components/ThemeList/ThemeList.vue'

	import { destroyApp } from './src/helpers/lifecycle'
	import { getThemes } from './src/services/themes'

	export default {
		components: { AppContainer, ThemeList },
		setup () {
			const themes = getThemes()
			return { themes, destroyApp }
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
	}

	.title {
		margin: 0 0 16px;
	}
</style>
