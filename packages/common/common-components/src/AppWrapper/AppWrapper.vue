<template>
	<div class='app-wrapper'>
		<app-window
			v-bind='{ title, availableUpdate }'
			class='app-window'
			@app:click:update='showUpdateModal = true'
			@app:close='destroy'
		>
			<slot />
		</app-window>
		<update-modal
			v-if='showUpdateModal'
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

	import AppWindow from '../AppWindow/AppWindow.vue'
	import UpdateModal from '../UpdateModal/UpdateModal.vue'

	export default {
		name: 'AppWrapper',
		components: { AppWindow, UpdateModal },
		props: {
			title: {
				type: String,
				default: null,
			},
			id: {
				type: String,
				default: null,
			},
			versionFilePath: {
				type: String,
				default: null,
			},
		},
		setup ({ id, versionFilePath }) {
			const showUpdateModal = ref(false)
			const availableUpdate = ref(null)

			onMounted(async () => {
				if (versionFilePath) {
					availableUpdate.value = await getAvailableUpdate(window[`${id}-version`] || '0.0.0', versionFilePath)
				}
			})

			const destroy = () => document.getElementById(id).remove()

			return { availableUpdate, showUpdateModal, destroy }
		},
	}
</script>

<style scoped lang="scss">
	.app-wrapper, .update-modal, button {
		font-family: 'Fira Sans', 'Trebuchet MS', Ubuntu, Helvetica, Arial, sans-serif;
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
