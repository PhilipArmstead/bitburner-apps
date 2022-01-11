<template>
	<div class='app-container'>
		<div class='app'>
			<div class='app__toolbar'>
				<h1 class='app__title'>
					{{ title }}
				</h1>
				<div class='app__cta-group'>
					<button
						class='btn btn--small app__cta-close'
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
	export default {
		name: 'AppContainer',
		props: {
			title: {
				type: String,
				required: true,
			},
		},
	}
</script>

<style scoped lang='scss'>
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
				padding: 3px 3px 3px 8px;
				user-select: none;
				width: 100%;
			}

			&__title {
				align-self: center;
				flex: 0 1 100%;
				font-size: 13px;
				font-weight: bold;
				line-height: 20px;
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
					width: 14px;

					&--restore {
						color: #D6CEC8;
					}
				}

				.btn {
					background: none;
					border: none;
					color: #A9A9A9;
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
				width: 100%;

				&::-webkit-scrollbar {
					display: block;
					width: 10px;
				}

				&::-webkit-scrollbar-track {
					background-color: transparent;
				}

				&::-webkit-scrollbar-thumb {
					background-color: #79797a;
				}
			}

			.btn {
				background: none;
				box-shadow: none;
			}
		}
	}
</style>
