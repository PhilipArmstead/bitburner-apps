<template>
	<ul v-if='themes.length' class='theme-list'>
		<li v-for='(theme, index) in themes' :key='index' class='theme'>
			<img
				:src='theme.src'
				alt=''
				class='theme__preview'
				@click='$emit("theme:preview", theme.json)'
			>
			<h1 class='theme__name'>
				{{ theme.name }}
			</h1>
			<h2 class='theme__author'>
				{{ theme.author }}
			</h2>
		</li>
	</ul>
	<p v-else>
		Sorry, we couldn't fetch any themes at the moment :(
	</p>
</template>

<script>
	import { formatDate } from '../../helpers/dates'

	export default {
		name: 'ThemeList',
		props: {
			themes: {
				type: Array,
				default: () => [],
			},
		},
		setup () {
			return { formatDate }
		},
	}
</script>

<style scoped lang='scss'>
	.theme-list {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		margin: 0;
		padding: 0;

		.theme {
			box-sizing: border-box;
			display: flex;
			flex: 0 0 33%;
			flex-direction: column;
			margin: 0;
			padding: 16px;

			&__name, &__author {
				text-align: center;
			}

			&__name {
				color: #80f20d;
				font-size: 18px;
				font-weight: 500;
				margin: 14px 0 0;
			}

			&__author {
				color: #ccced0;
				font-size: 14px;
				margin: 8px 0 0;
			}

			&__preview {
				aspect-ratio: 1.5;
				cursor: pointer;
				display: block;
				height: auto;
				pointer-events: auto;
				transition: transform .2s cubic-bezier(0.4, 0.0, 0.2, 1);
				width: 100%;

				&:hover {
					transform: scale(1.1);
				}
			}
		}
	}
</style>
