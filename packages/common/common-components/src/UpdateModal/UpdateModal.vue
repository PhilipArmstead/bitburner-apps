<template>
	<div ref='element' @click.stop='$emit("modal:close")' @app:updated='updateComplete'>
		<div class='modal' @click.stop>
			<template v-if='!hasUpdated'>
				<h1 class='modal__title'>
					Do you want to update to v{{ version }}?
				</h1>
				<div class='modal__ctas'>
					<button class='cta cta--cancel' @click='$emit("modal:close")'>
						Nope
					</button>
					<button class='cta cta--confirm' @click='doUpdate'>
						Sure!
					</button>
				</div>
			</template>
			<template v-else>
				<h1 class='modal__title'>
					App successfully updated
				</h1>
				<p class='modal__message'>
					Restart the app in your own time to get the latest version.
				</p>
				<div class='modal__ctas'>
					<button class='cta cta--confirm' @click='$emit("modal:close")'>
						Okay!
					</button>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	import { ref } from 'vue'

	import { dispatchEvent } from '@bitburner-theme-browser/common-helpers/src/lifecycle/lifecycle'
	import { appFilePath, id } from '@bitburner-theme-browser/in-game-browser/config/app'

	export default {
		name: 'UpdateModal',
		props: {
			version: {
				type: String,
				default: null,
			},
		},
		setup () {
			const element = ref(null)
			const hasUpdated = ref(false)

			const doUpdate = () => dispatchEvent(`app:update:${id}`, { element: element.value, path: appFilePath })
			const updateComplete = () => (hasUpdated.value = true)

			return { element, hasUpdated, doUpdate, updateComplete }
		},
	}
</script>

<style scoped lang='scss'>
	.modal {
		background: #FFF;
		border: 1px solid #0003;
		border-radius: 6px;
		display: flex;
		flex-wrap: wrap;
		left: 50%;
		padding: 24px;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 40vw;

		&__title {
			color: #212529;
			font-size: 20px;
			font-weight: 500;
			line-height: 1.5;
			margin: 0;
		}

		&__message {
			line-height: 1.4;
		}

		&__ctas, &__message {
			flex: 1 0 100%;
			margin: 16px 0 0;
		}

		&__ctas {
			display: flex;
			justify-content: flex-end;
		}

		.cta {
			border: 1px solid transparent;
			border-radius: 4px;
			cursor: pointer;
			display: inline-block;
			font-weight: 400;
			font-size: 16px;
			line-height: 1.5;
			margin-left: 12px;
			padding: 6px 12px;
			text-align: center;
			transition: .15s ease-in-out;
			transition-property: color, background-color, border-color, box-shadow;
			vertical-align: middle;

			&:hover {
				text-decoration: none;
			}

			&--cancel {
				background-color: #6C757D;
				border-color: #6C757D;
				color: #FFF;

				&:hover {
					background-color: #5A6268;
					border-color: #545B62;
					color: #FFF;
				}

				&:active {
					background-color: #545B62;
					border-color: #4E555B;
					color: #FFF;
				}
			}

			&--confirm {
				background-color: #28A745;
				border-color: #28A745;
				color: #FFF;

				&:hover {
					background-color: #218838;
					border-color: #1E7E34;
					color: #FFF;
				}

				&:active {
					background-color: #1E7E34;
					border-color: #1C7430;
					color: #FFF;
				}
			}
		}
	}
</style>
