<template>
	<div class='app-container'>
		<div class='app'>
			<div class='app__toolbar'>
				<h1 class='app__title'>
					{{ title }}
				</h1>
				<div class='app__cta-group'>
					<button
						v-if='availableUpdate'
						class='btn btn--small app__cta-update-available'
						:title='`Version ${availableUpdate} is available`'
						@click="$emit('app:click:update')"
						@mousedown.stop
					>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 417 417' class='icon icon--update'>
							<path fill='#FFF' d='M120 90h180v235H120z' />
							<path
								fill='currentColor'
								d='M208.5 417a208.5 208.5 0 1 0 0-417 208.5 208.5 0 0 0 0 417zm-81.3-197.5 68.3-118.3a15 15 0 0 1 26 0l68.2 118.3a15 15 0 0 1-13 22.5h-33.2v66.2a15 15 0 0 1-15 15h-40a15 15 0 0 1-15-15V242h-33.3a15 15 0 0 1-13-22.5z'
							/>
						</svg>
					</button>
					<button
						class='btn btn--small app__cta-close'
						title='Close'
						@click="$emit('app:close')"
						@mousedown.stop
					>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18' class='icon icon--close'>
							<g stroke='currentColor' stroke-width='1.5'>
								<line
									x1='3'
									y1='3'
									x2='15'
									y2='15'
								/>
								<line
									x2='3'
									y1='3'
									x1='15'
									y2='15'
								/>
							</g>
						</svg>
					</button>
				</div>
			</div>
			<div class='app__content'>
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
	import { onMounted, ref } from 'vue'

	export default {
		name: 'AppContainer',
		components: {  },
		props: {
			title: {
				type: String,
				required: true,
			},
			availableUpdate: {
				type: [String, Promise],
				default: null,
			},
			versionFilePath: {
				type: String,
				default: null,
			},
			id: {
				type: String,
				default: null,
			},
		},
	}
</script>

<style scoped lang="scss">
	.app-container {
		bottom: 0;
		left: 0;
		pointer-events: none;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1510;

		* {
			box-sizing: border-box;
		}

		.app {
			align-items: flex-start;
			border: 1px solid #4E4E4E6B;
			display: inline-flex;
			flex-direction: column;
			left: 50%;
			height: 90vh;
			overflow: hidden;
			pointer-events: auto;
			position: absolute;
			resize: none;
			top: 50%;
			transform: translate(-50%, -52%);
			width: 90vw;

			&__toolbar {
				background: #111;
				color: #FFF;
				display: flex;
				padding: 4px 3px 4px 8px;
				user-select: none;
				width: 100%;
			}

			&__title {
				align-self: center;
				flex: 0 1 100%;
				font-family: var(--font-family, monospace);
				font-size: 13px;
				font-weight: bold;
				line-height: 1;
				margin: 0 20px 0 0;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			&__cta-group {
				align-items: center;
				display: flex;
				flex: 0 1 100%;
				justify-content: flex-end;
				margin-left: auto;

				> * {
					background-position: 50% 50%;
					background-size: 14px auto;
					flex: 0 1 auto;
				}

				.icon {
					width: 16px;

					&--restore {
						color: #D6CEC8;
					}

					&--update {
						color: #6BD700;
					}
				}

				.btn {
					background: none;
					border: none;
					color: #A9A9A9;
					cursor: pointer;
					display: flex;
				}
			}

			&__icon {
				align-self: center;
				max-height: 16px;
				margin-right: 6px;
				object-fit: contain;
				width: 16px;
			}

			&__menu {
				width: 100%;
				background: rgb(212, 208, 200);
				color: #333;
				padding-left: 5px;
				padding-bottom: 2px;

				span {
					border: 1px inset transparent;
					cursor: pointer;
					font-size: 15px;
					margin-right: 12px;
					padding: 0 1px;

					&:hover {
						border: 1px inset #BDBDBD;
					}
				}
			}

			&__content {
				flex: 0 1 100%;
				overflow: auto;
				scrollbar-color: var(--primary, #272727) var(--primarydark, #B7B7B7);
				scrollbar-width: thin;
				width: 100%;

				&::-webkit-scrollbar {
					display: block;
					width: 10px;
				}

				&::-webkit-scrollbar-track {
					background-color: var(--primarydark, #B7B7B7);
				}

				&::-webkit-scrollbar-thumb {
					background-color: var(--primary, #272727);
				}
			}

			.btn {
				background: none;
				box-shadow: none;
			}
		}
	}
</style>
