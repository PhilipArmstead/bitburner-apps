<template>
	<div
		class='app-container'
		:class='{
			"app--is-minimised": isMinimised,
			"app--can-resize": windowOptions.canResize,
		}'
	>
		<div
			ref='process'
			class='app'
			:style='{
				transform: `translate(${left}px, ${top}px)`,
				width: `${processWidth}px`,
				height: `${processHeight}px`,
			}'
		>
			<div class='app__toolbar' @mousedown='beginGrabbing'>
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
						<icon-update class='icon icon--update' />
					</button>
					<button
						v-if='windowOptions.canMinimise'
						class='btn btn--small app__cta-minimise'
						@click='toggleMinimise'
						@mousedown.stop
					>
						<icon-minimise v-show='!isMinimised' class='icon icon--minimise' />
						<icon-restore v-show='isMinimised' class='icon icon--restore' />
					</button>
					<button
						class='btn btn--small app__cta-close'
						title='Close'
						@click="$emit('app:close')"
						@mousedown.stop
					>
						<icon-close class='icon icon--close' />
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
	import { onMounted, onUnmounted, ref } from 'vue'

	import IconClose from '../../assets/icons/close.svg'
	import IconMinimise from '../../assets/icons/minimise.svg'
	import IconRestore from '../../assets/icons/restore.svg'
	import IconUpdate from '../../assets/icons/update.svg'

	export default {
		name: 'AppContainer',
		components: { IconClose, IconMinimise, IconRestore, IconUpdate },
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
			options: {
				type: Object,
				default: () => ({}),
			},
		},
		setup ({ options }) {
			const process = ref(null)
			const hasInitialised = ref(false)
			const processWidth = ref()
			const processHeight = ref()
			const heightBeforeMinimise = ref()
			const winHeight = ref()
			const winWidth = ref()
			const left = ref()
			const top = ref()
			let grabStart = {}
			let modalStart = {}
			const isMinimised = ref(false)

			const windowOptions = Object.assign({
				canDrag: true,
				canMinimise: true,
				canResize: true,
			}, options)

			const setPosition = () => {
				const width = process.value.offsetWidth
				const height = process.value.offsetHeight
				winHeight.value = window.innerWidth
				winWidth.value = window.innerHeight
				left.value = winHeight.value / 2 - width / 2
				top.value = winWidth.value / 2 - height / 2
			}

			onMounted(() => {
				if (windowOptions.canResize) {
					new ResizeObserver(([{ borderBoxSize: [{ inlineSize, blockSize }] }]) => {
						if (hasInitialised.value && !isMinimised.value) {
							processWidth.value = inlineSize
							processHeight.value = blockSize
						}

						hasInitialised.value = true
					}).observe(process.value)
				} else {
					hasInitialised.value = true
				}

				if (windowOptions.canDrag) {
					setPosition()
				}
			})

			const beginGrabbing = ({ x, y, button }) => {
				if (!windowOptions.canDrag) {
					return
				}

				const body = document.body

				if (!button) {
					grabStart = { x, y }
					processWidth.value = process.value.offsetWidth
					processHeight.value = process.value.offsetHeight
					modalStart = { x: left.value, y: top.value }
					winHeight.value = window.innerWidth
					winWidth.value = window.innerHeight

					body.addEventListener('mousemove', mouseMove)
					body.addEventListener('mouseup', endGrabbing)
					body.addEventListener('mouseleave', endGrabbing)
				}
			}

			const endGrabbing = () => {
				const body = document.body
				body.removeEventListener('mousemove', mouseMove)
				body.removeEventListener('mouseup', endGrabbing)
				body.removeEventListener('mouseleave', endGrabbing)
			}

			onUnmounted(endGrabbing)

			const mouseMove = ({ x, y }) => {
				let leftFinal = modalStart.x + (x - grabStart.x)
				let topFinal = modalStart.y + (y - grabStart.y)

				const leftIsBeforeScreen = leftFinal < 0
				const leftIsAfterScreen = leftFinal + processWidth.value > winHeight.value
				if (leftIsBeforeScreen || leftIsAfterScreen) {
					if (leftIsBeforeScreen) {
						leftFinal = 0
					} else {
						leftFinal = winHeight.value - processWidth.value
					}

					modalStart.x = leftFinal
					grabStart.x = Math.max(Math.min(x, winHeight.value - 5), 5)
				}

				const topIsBeforeScreen = topFinal < 0
				const topIsAfterScreen = topFinal + processHeight.value > winWidth.value
				if (topIsBeforeScreen || topIsAfterScreen) {
					if (topIsBeforeScreen) {
						topFinal = 0
					} else {
						topFinal = winWidth.value - processHeight.value
					}

					modalStart.y = topFinal
					grabStart.y = Math.max(Math.min(y, winWidth.value), 5)
				}

				left.value = leftFinal
				top.value = topFinal
			}

			const toggleMinimise = () => {
				if (!isMinimised.value) {
					heightBeforeMinimise.value = processHeight.value
				}

				isMinimised.value = !isMinimised.value

				if (!isMinimised.value) {
					processHeight.value = heightBeforeMinimise.value
				}
			}

			return {
				isMinimised,
				left,
				process,
				processHeight,
				processWidth,
				top,
				windowOptions,
				beginGrabbing,
				setPosition,
				toggleMinimise,
			}
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

		&.app--can-resize .app {
			resize: both;
		}

		&.app--is-minimised .app {
				height: auto !important;
				min-height: 0;
				min-width: 0;
				resize: none;

				.app__content {
					display: none;
				}
		}

		* {
			box-sizing: border-box;
		}

		.app {
			align-items: flex-start;
			border: 1px solid #4E4E4E6B;
			display: inline-flex;
			flex-direction: column;
			left: 0;
			height: 500px;
			overflow: hidden;
			pointer-events: auto;
			position: absolute;
			resize: none;
			top: 0;
			transform: translate(-50%, -52%);
			width: 300px;

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
