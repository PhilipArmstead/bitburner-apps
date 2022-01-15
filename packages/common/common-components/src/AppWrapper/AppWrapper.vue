<template>
	<div class='app-wrapper'>
		<app-container
			v-bind='{ title, availableUpdate, options: windowOptions }'
			class='app-container'
			@app:click:update='showUpdateModal = true'
			@app:close='destroy'
		>
			<slot />
		</app-container>
		<update-modal
			v-if='showUpdateModal'
			v-bind='{ appFilePath, id }'
			:version='availableUpdate'
			class='update-modal'
			@modal:close='showUpdateModal = false'
			@app:updated='availableUpdate = null'
		/>
	</div>
</template>

<script>
	import { onMounted, ref } from 'vue'
	import { getAvailableUpdate } from '@bitburner-theme-browser/common-helpers'

	import AppContainer from '../AppContainer/AppContainer.vue'
	import UpdateModal from '../UpdateModal/UpdateModal.vue'

	export default {
		name: 'AppWrapper',
		components: { AppContainer, UpdateModal },
		props: {
			title: {
				type: String,
				default: null,
			},
			id: {
				type: String,
				default: null,
			},
			appFilePath: {
				type: String,
				default: null,
			},
			versionFilePath: {
				type: String,
				default: null,
			},
			windowOptions: {
				type: Object,
				default: () => ({}),
			},
		},
		setup ({ appFilePath, id, versionFilePath }) {
			const showUpdateModal = ref(false)
			const availableUpdate = ref(null)

			onMounted(async () => {
				if (appFilePath && versionFilePath) {
					availableUpdate.value = await getAvailableUpdate(window[`${id}-version`] || '0.0.0', versionFilePath)
				}
			})

			const destroy = () => document.getElementById(id).remove()

			return { availableUpdate, showUpdateModal, destroy }
		},
	}
</script>

<style scoped lang="scss">
	@import "@bitburner-theme-browser/common-styles";

	.app-wrapper, .update-modal, button {
		font-family: $font-primary;
	}

	.update-modal {
		background: rgba(#333, .7);
		height: 100%;
		left: 0;
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 1512;
	}
</style>
