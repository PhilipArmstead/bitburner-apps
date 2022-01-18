<template>
	<app-wrapper v-show='!isPreviewing && !isApplying' v-bind="{ ...$props, title: 'Bitburner Theme Browser', windowOptions }">
		<div class='theme-browser'>
			<h1 class='title'>
				{{ title }}
			</h1>
			<p v-if='themes.length' class='pagination-details'>
				Showing {{ showingFrom }} to {{ showingTo }} of {{ totalItems }}
			</p>
			<theme-list
				v-if='!isLoading'
				:themes='themes'
				class='themes'
				@theme:preview='showPreview'
			/>
			<div v-else class='loader' />
		</div>
	</app-wrapper>
	<div class='preview__ctas' :class='{ "preview__ctas--visible" : isPreviewing }'>
		<button class='preview__cta preview__cta--cancel' @click='cancelPreview'>
			<span class='sr-only'>Cancel</span>
		</button>
		<button class='preview__cta preview__cta--confirm' @click='closeApp'>
			<span class='sr-only'>Confirm</span>
		</button>
	</div>
</template>

<script>
	import { computed, onMounted, ref } from 'vue'
	import { AppWrapper } from '@bitburner-theme-browser/common-components'
	import { closeApp, dispatchEvent } from '@bitburner-theme-browser/common-helpers'

	import ThemeList from './src/components/ThemeList/ThemeList.vue'
	import { getTheme, getThemes, handleThemeResponse } from './src/services/themes'

	export default {
		components: { AppWrapper, ThemeList },
		props: {
			id: {
				type: String,
				required: true,
			},
			appFilePath: {
				type: String,
				default: null,
			},
			versionFilePath: {
				type: String,
				default: null,
			},
		},
		setup ({ id }) {
			const isApplying = ref(true)
			const isLoading = ref(true)
			const isPreviewing = ref(false)
			const themes = ref([])
			const meta = ref({})

			const title = computed(() => isLoading.value ? 'Loading...' : !themes.value.length ? 'Uh oh...' : 'Browse themes')
			const showingFrom = computed(() => Math.max(1, showingTo.value - meta.value.items_per_page))
			const showingTo = computed(() => Math.min(meta.value.total_items, meta.value.page * meta.value.items_per_page))
			const totalItems = computed(() => meta.value.total_items)

			const windowOptions = {
				canDrag: false,
				canMinimise: false,
				canResize: false,
			}

			const cancelPreview = (themeData) => {
				dispatchEvent('theme:cancel-preview', themeData)
				isPreviewing.value = false
			}
			const showPreview = (themeData) => {
				dispatchEvent('theme:preview', themeData)
				isPreviewing.value = true
			}
			const updateThemes = async () => {
				isLoading.value = true

				const response = getThemes()
				const { data, meta: resultsMeta } = await handleThemeResponse(response)
				meta.value = resultsMeta
				themes.value = data

				isLoading.value = false
			}

			onMounted(async () => {
				const themeId = Number(window[`${id}-theme-id`])
				if (themeId) {
					try {
						const { json } = await getTheme(themeId)
						showPreview(json)
						return closeApp(id)
					} catch (e) {
						console.log(e)
					}
				}

				isApplying.value = false
				await updateThemes()
			})

			return {
				isApplying,
				isLoading,
				isPreviewing,
				showingFrom,
				showingTo,
				themes,
				title,
				totalItems,
				windowOptions,
				cancelPreview,
				closeApp: () => closeApp(id),
				showPreview,
			}
		},
	}
</script>

<style scoped lang='scss'>
	@import "@bitburner-theme-browser/common-styles";

	:deep(.app-container .app) {
		left: 50%;
		height: 90vh;
		max-width: 1166px;
		top: 50%;
		transform: translate(-50%, -52%);
		width: 90vw;
	}

	.theme-browser {
		align-content: flex-start;
		align-items: baseline;
		background: $background-colour;
		box-sizing: border-box;
		color: #FFF;
		display: flex;
		flex-wrap: wrap;
		height: inherit;
		justify-content: space-between;
		min-height: 100%;
		padding: 24px 32px;
	}

	.title, .pagination-details {
		flex: 0 1 auto;
		margin: 0;
	}

	.title {
		margin-right: 20px;
	}

	.pagination-details {
		color: #CECECE;
		margin-left: 20px;
	}

	.themes {
		flex: 1 0 100%;
		margin-top: 16px;
	}

	.loader {
		align-self: center;
		background: no-repeat 55% 50%/100px auto url('./assets/icons/loader.svg');
		flex: 1 0 100%;
		height: 200px;
		margin: auto 0 40%;
		width: 200px;
	}

	.preview__ctas {
		bottom: 0;
		display: flex;
		height: 150px;
		justify-content: space-between;
		position: fixed;
		right: 30px;
		width: 150px;

		&:not(.preview__ctas--visible) {
			.preview__cta {
				pointer-events: none;

				&--cancel {
					transform: translate(190px, 160px);
				}

				&--confirm {
					transform: translate(110px, 160px);
				}
			}
		}

		.preview__cta {
			align-items: center;
			background: no-repeat 50% 50%/30px auto;
			border: none;
			border-radius: 50%;
			cursor: pointer;
			display: flex;
			flex: 0 1 44%;
			height: 66px;
			justify-content: center;
			padding: 0;
			position: relative;
			transition: transform .25s cubic-bezier(0.4, 0.0, 0.2, 1);

			&--cancel {
				background-color: #E33030D4;
				background-image: url("../../packages/common/common-assets/icons/cross.svg");
				transform: translateY(40px);
			}

			&--confirm {
				background-color: #72D000D4;
				background-image: url("../../packages/common/common-assets/icons/tick.svg");
			}
		}
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
