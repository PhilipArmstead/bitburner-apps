<template>
	<ul class='theme-list'>
		<li v-for='(theme, index) in themes' :key='index' class='theme'>
			<img :src='theme.preview' alt='' class='theme__preview'>
			<h1 class='theme__name'>
				{{ theme.name }}
			</h1>
			<h2 class='theme__author'>
				{{ theme.author }}
			</h2>
			<div class='theme__info'>
				<h3 class='theme__submission-date'>
					{{ formatDate(theme.submittedOn) }}
				</h3>
			</div>
			<button class='theme__cta theme__cta--preview' @click='$emit("theme:preview", theme.content)'>
				Preview
			</button>
		</li>
	</ul>
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
			flex: 1 0 25%;
			flex-direction: column;
			margin-bottom: 16px;
			padding: 8px;

			&__name, &__author, &__submission-date {
				margin: 8px 0 0;
			}

			&__name {
				font-size: 18px;
			}

			&__author {
				color: var(--secondarylight, #DDD);
				font-size: 14px;
			}

			&__info {
				display: flex;
				display: none;
				margin-bottom: 8px;
			}

			&__preview {
				max-height: 110px;
				max-width: 100%;
			}

			&__submission-date {
				font-size: 12px;
				margin-left: auto;
			}

			&__cta {
				border: none;
				border-radius: 4px;
				cursor: pointer;
				font-size: 14px;
				margin-top: auto;
				padding: 8px 14px;
				pointer-events: auto;

				&--preview {
					background: var(--button, #4170FB);
					color: var(--secondarylight, #FFF);
					box-shadow: 0 0 1px 0 var(--welllight);
					margin-left: auto;
				}
			}
		}
	}
</style>
