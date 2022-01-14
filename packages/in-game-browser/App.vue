<template>
	<app-wrapper v-show='!isPreviewing' v-bind="{ id, title: 'Bitburner Theme Browser', versionFilePath }">
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
	import { getThemes, handleThemeResponse } from './src/services/themes'
	import { id, versionFilePath } from './config/app'

	export default {
		components: { AppWrapper, ThemeList },
		setup () {
			const isLoading = ref(true)
			const isPreviewing = ref(false)
			const themes = ref([])
			const meta = ref({})

			const title = computed(() => isLoading.value ? 'Loading...' : !themes.value.length ? 'Uh oh...' : 'Browse themes')
			const showingFrom = computed(() => Math.max(1, showingTo.value - meta.value.items_per_page))
			const showingTo = computed(() => Math.min(meta.value.total_items, meta.value.page * meta.value.items_per_page))
			const totalItems = computed(() => meta.value.total_items)


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

			onMounted(async () => await updateThemes())

			return {
				id,
				isLoading,
				isPreviewing,
				showingFrom,
				showingTo,
				themes,
				title,
				totalItems,
				versionFilePath,
				cancelPreview,
				closeApp: () => closeApp(id),
				showPreview,
			}
		},
	}
</script>

<style scoped lang='scss'>
	:deep(.app) {
		max-width: 1166px;
	}

	.theme-browser {
		align-items: baseline;
		background: #171A22;
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
		margin-top: 16px;
	}

	.loader {
		align-self: center;
		background: no-repeat 55% 50%/100px auto url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cg fill=\'%23900\'%3E%3Ccircle cx=\'60\' cy=\'50\' r=\'4\'%3E%3Canimate attributeName=\'cx\' repeatCount=\'indefinite\' dur=\'1s\' values=\'95;35\' keyTimes=\'0;1\' begin=\'-0.67s\'/%3E%3Canimate attributeName=\'fill-opacity\' repeatCount=\'indefinite\' dur=\'1s\' values=\'0;1;1\' keyTimes=\'0;0.2;1\' begin=\'-0.67s\'/%3E%3C/circle%3E%3Ccircle cx=\'60\' cy=\'50\' r=\'4\'%3E%3Canimate attributeName=\'cx\' repeatCount=\'indefinite\' dur=\'1s\' values=\'95;35\' keyTimes=\'0;1\' begin=\'-0.33s\'/%3E%3Canimate attributeName=\'fill-opacity\' repeatCount=\'indefinite\' dur=\'1s\' values=\'0;1;1\' keyTimes=\'0;0.2;1\' begin=\'-0.33s\'/%3E%3C/circle%3E%3Ccircle cx=\'60\' cy=\'50\' r=\'4\'%3E%3Canimate attributeName=\'cx\' repeatCount=\'indefinite\' dur=\'1s\' values=\'95;35\' keyTimes=\'0;1\' begin=\'0s\'/%3E%3Canimate attributeName=\'fill-opacity\' repeatCount=\'indefinite\' dur=\'1s\' values=\'0;1;1\' keyTimes=\'0;0.2;1\' begin=\'0s\'/%3E%3C/circle%3E%3C/g%3E%3Cg fill=\'%2380f20d\' transform=\'translate(-15 0)\'%3E%3Cpath d=\'M50 50L20 50A30 30 0 0 0 80 50Z\'%3E%3CanimateTransform attributeName=\'transform\' type=\'rotate\' repeatCount=\'indefinite\' dur=\'1s\' values=\'0 50 50;45 50 50;0 50 50\' keyTimes=\'0;0.5;1\'/%3E%3C/path%3E%3Cpath d=\'M50 50L20 50A30 30 0 0 1 80 50Z\'%3E%3CanimateTransform attributeName=\'transform\' type=\'rotate\' repeatCount=\'indefinite\' dur=\'1s\' values=\'0 50 50;-45 50 50;0 50 50\' keyTimes=\'0;0.5;1\'/%3E%3C/path%3E%3C/g%3E%3C/svg%3E');
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
				background-image: url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 47.095 47.095\'%3E%3Cpath fill=\'%23FFF\' d=\'m45.363 36.234-13.158-13.16 12.21-12.21a5.906 5.906 0 0 0 0-8.358 5.908 5.908 0 0 0-8.356 0l-12.212 12.21-12.809-12.81a5.91 5.91 0 1 0-8.358 8.358l12.81 12.81L1.732 36.831a5.91 5.91 0 1 0 8.356 8.359l13.759-13.758 13.16 13.16a5.908 5.908 0 0 0 8.356 0 5.907 5.907 0 0 0 0-8.358z\'/%3E%3C/svg%3E');
				transform: translateY(40px);
			}

			&--confirm {
				background-color: #72D000D4;
				background-image: url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 122.877 101.052\'%3E%3Cpath fill=\'white\' d=\'M4.43 63.63A14.383 14.383 0 0 1 .003 53.52a14.393 14.393 0 0 1 4.015-10.281 14.372 14.372 0 0 1 10.106-4.425 14.373 14.373 0 0 1 10.283 4.012l24.787 23.851L98.543 3.989l1.768 1.349-1.77-1.355a2.27 2.27 0 0 1 .479-.466A14.383 14.383 0 0 1 109.243.022V.018l.176.016c3.623.24 7.162 1.85 9.775 4.766a14.383 14.383 0 0 1 3.662 10.412h.004l-.016.176a14.362 14.362 0 0 1-4.609 9.632L59.011 97.11l.004.004a2.157 2.157 0 0 1-.372.368 14.392 14.392 0 0 1-9.757 3.569 14.381 14.381 0 0 1-9.741-4.016L4.43 63.63z\'/%3E%3C/svg%3E');
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
