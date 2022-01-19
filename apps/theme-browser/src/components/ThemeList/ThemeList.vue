<template>
	<ul v-if='themes.length' class='theme-list'>
		<li v-for='(theme, index) in themes' :key='index' class='theme'>
			<img
				:src='theme.images[1]?.src'
				alt=''
				class='theme__preview'
				@click='$emit("theme:preview", theme.json)'
			>
			<h1 class='theme__name'>
				{{ theme.name }}
			</h1>
			<h2 class='theme__author'>
				{{ theme.author.name }}
			</h2>
			<div :v-if='user' :class='{ voting: true, hasActive: theme.user_vote !== null && theme.user_vote !== undefined }'>
				<button :class='{active: theme.user_vote === -1}' @click="onClickVote(theme, 'downvote')">
					👎
				</button>
				<span>{{ theme.vote }}</span>
				<button :class='{active: theme.user_vote === 1}' @click="onClickVote(theme, 'upvote')">
					👍
				</button>
			</div>
		</li>
	</ul>
	<p v-else>
		Sorry, we couldn't fetch any themes at the moment :(
	</p>
</template>

<script>
	import { baseUri } from '../../../config/app'
	import { formatDate } from '../../helpers/dates'

	export default {
		name: 'ThemeList',
		props: {
			themes: {
				type: Array,
				default: () => [],
			},
			user: {
				type: Object,
				default: () => ({}),
			},
		},
		setup (props, context) {
			const onClickVote = (theme, vote) => {
				fetch(`${baseUri}/api/themes/${theme.id}/${vote}`,
					{
						'method': 'POST',
						'headers': {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
							'Authorization': `Bearer ${props.user.token}`,
						},
					}
				).then(() => {
					context.emit('theme:reload', theme.id)
				})
			}

			return { onClickVote, formatDate }
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
				margin: 14px 0 auto;
			}

			&__author {
				color: #ccced0;
				font-size: 14px;
				margin: 14px 0 0;
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

			.voting {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin: 14px 0 0;

				&.hasActive {
					button {
						opacity: 0.2;
					}
				}

				button {
					background: none;
					padding: 5px;
					border: none;
					appearance: none;
					text-align: center;
					width: 42px;
					font-size: 1.5rem;
					flex: 0 0 auto;
					cursor: pointer;
					transition: opacity .2s ease-in-out;

					&.active, &:hover, &:active {
						opacity: 1;
					}
				}

				span {
					text-align: center;
					flex: 1 1 auto;
				}
			}
		}
	}
</style>
