<template>
	<app-wrapper 
		v-show='!isPreviewing && !isApplying' 
		v-bind="{ ...$props, title: 'Bitburner Theme Browser', windowOptions }"
		@keydown.stop
		@keyup.stop
		@keypress.stop
	>
		<div class='theme-browser'>
			<tb-header
				:title='title'
				:user='user || null'
				@login:click='triggerLoginRegister'
			/>
			<form v-show='showThemeSubmit' @submit='onThemeSubmit'>
				<div>
					<label for='name'>Theme Name</label>
					<input 
						id='name'
						name='name' 
						type='text' 
						placeholder='BB Monokai'
						@keydown.stop
					>
				</div>
				<div class='buttons'>
					<button type='submit'>
						Submit
					</button>
					<button type='cancel' @click='cancelForm'>
						Cancel
					</button>
				</div>
			</form>
			<form v-show='showLogin' @submit='onLogin'>
				<div>
					<label for='email'>Email</label>
					<input 
						id='email'
						name='email' 
						type='email' 
						placeholder='elliot.alderson@allsafe.org'
						@keydown.stop
					>
				</div>
				<div>
					<label for='password'>Password</label>
					<input 
						id='password'
						name='password'
						type='password' 
						placeholder='password'
						@keydown.stop
					>
				</div>
				<div class='buttons'>
					<button type='submit'>
						Login
					</button>
					<button type='cancel' @click='cancelForm'>
						Cancel
					</button>
				</div>
				<div>
					If you don't already have an account then <a @click='toggleLoginRegister'>Register</a>
				</div>
			</form>
			<form v-show='showRegister' @submit='onRegister'>
				<div>
					<label for='name'>Name</label>
					<input 
						id='name' 
						name='name'
						type='text' 
						placeholder='Elliot Alderson'
						@keydown.stop
					>
				</div>
				<div>
					<label for='email'>Email</label>
					<input 
						id='email' 
						name='email'
						type='email' 
						placeholder='elliot.alderson@allsafe.org'
						@keydown.stop
					>
				</div>
				<div>
					<label for='password'>Password</label>
					<input
						id='password' 
						name='password'
						type='password' 
						placeholder='password'
					>
				</div>
				<div>
					<label for='password_confirm'>Password Confirmation</label>
					<input 
						id='password_confirm' 
						name='password_confirm'
						type='password' 
						placeholder='password'
					>
				</div>
				<div class='buttons'>
					<button type='submit'>
						Register
					</button>
					<button type='cancel' @click='cancelForm'>
						Cancel
					</button>
				</div>
				<div>
					If you already have an account then <a @click='toggleLoginRegister'>Login</a>
				</div>
			</form>
			<div v-if='!showRegister && !showLogin && !showThemeSubmit'>
				<div class='pagination-wrapper'>
					<div style='margin-right: auto;'>
						<button
							v-if='!!(user && user.id)' 
							@click='toggleSubmitTheme'
						>
							Submit my theme
						</button>
					</div>

					<p v-if='themes.length' class='pagination-details'>
						Showing {{ showingFrom }} to {{ showingTo }} of {{ totalItems }}
					</p>
				</div>
				<div v-if='!showThemeSubmit'>
					<theme-list
						v-if='!isLoading'
						:themes='themes'
						:user='user'
						class='themes'
						@theme:preview='showPreview'
						@theme:reload='reloadTheme'
					/>
					<div v-else class='loader' />
				</div>
			</div>
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

	import { baseUri } from './config/app'
	import ThemeList from './src/components/ThemeList/ThemeList.vue'
	import TbHeader from './src/components/TbHeader/TbHeader.vue'
	import { getTheme, getThemes, handleThemeResponse } from './src/services/themes'

	export default {
		components: { AppWrapper, ThemeList, TbHeader },
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

			const showThemeSubmit = ref(false)
			const showLogin = ref(false)
			const showRegister = ref(false)
			const user = ref({})

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

				const token = getToken()
				const response = getThemes(token)
				const { data, meta: resultsMeta } = await handleThemeResponse(response)
				meta.value = resultsMeta
				themes.value = data

				isLoading.value = false
			}

			// const d = eval('document')
			const onLogin = async (e) => {
				e.preventDefault()

				let fields = {
					email: null,
					password: null,
				}

				// get the email and password
				for (let i = 0; i < e.target.length; i++) {
					if (e.target[i].nodeName !== 'INPUT') {
						continue
					}

					fields[e.target[i].name] = e.target[i].value
				}

				if (!fields.email || !fields.password) {
					return
				}

				const response = await fetch (`${baseUri}/api/sanctum/token`, {
					'method': 'POST',
					'headers': {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
					},
					'body': JSON.stringify({
						email: fields.email,
						password: fields.password,
						device_name: 'BitBurner ThemeBrowser',
					}),
				}).then(r => r.json())

				localStorage.setItem('token', JSON.stringify(response))

				showLogin.value = false
				showRegister.value = false
				showThemeSubmit.value = false

				checkLogin()
			}

			const onThemeSubmit = async (e) => {
				e.preventDefault()

				let fields = {
					name: null,
					json: null,
				}

				const token = getToken()
				if (!token) {
					return
				}

				for (let i = 0; i < e.target.length; i++) {
					if (e.target[i].nodeName !== 'INPUT') {
						continue
					}

					fields[e.target[i].name] = e.target[i].value
				}

				if (!fields.name) {
					return
				}

				const callback = (themeData) => {
					fetch (`${baseUri}/api/themes`, {
						'method': 'POST',
						'headers': {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
						'body': JSON.stringify({
							name: fields.name,
							json: themeData,
						}),
					}).then(r => r.json())
				}

				dispatchEvent('theme:submit', { callback })

				showLogin.value = false
				showRegister.value = false
				showThemeSubmit.value = false
			}

			const onRegister = async (e) => {
				e.preventDefault()

				let fields = {
					email: null,
					password: null,
				}

				// get the name, email, password and confirmation
				for (let i = 0; i < e.target.length; i++) {
					if (e.target[i].nodeName !== 'INPUT') {
						continue
					}

					fields[e.target[i].name] = e.target[i].value
				}

				if (!fields.email || !fields.name || !fields.password_confirm || !fields.password) {
					return
				}

				if (fields.password !== fields.password_confirm) {
					return
				}

				const response = await fetch (`${baseUri}/api/sanctum/token`, {
					'method': 'POST',
					'headers': {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
					},
					'body': JSON.stringify({
						name: fields.name,
						email: fields.email,
						password: fields.password,
						device_name: 'BitBurner ThemeBrowser',
					}),
				}).then(r => r.json())

				localStorage.setItem('token', JSON.stringify(response))

				showLogin.value = false
				showRegister.value = false
				showThemeSubmit.value = false

				checkLogin()
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

				await checkLogin()

				isApplying.value = false
				await updateThemes()
			})

			const getToken = () => {
				// grab the token
				// TODO: How do ns?
				let token = localStorage.getItem('token')
				if (token) {
					try {
						token = JSON.parse(token).token
					} catch (e) {
						token = false
					}
				}

				return token
			}

			const checkLogin = async () => {
				const token = getToken()

				if (token) {
					user.value = await fetch(`${baseUri}/api/user`, {
						'headers': {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
					}).then(r => r.json()).then((u) => {
						u.token = token
						return u
					})
				}
			}

			const triggerLoginRegister = () => {
				if (showLogin.value || showRegister.value) {
					showLogin.value = false
					showRegister.value = false
				} else {
					showLogin.value = true
				}
			}

			const toggleLoginRegister = () => {
				if (showLogin.value) {
					showLogin.value = false
					showRegister.value = true
				} else if (showRegister.value) {
					showRegister.value = false
					showLogin.value = true
				}
			}

			const toggleSubmitTheme = () => {
				showThemeSubmit.value = !showThemeSubmit.value
			}

			const cancelForm = () => {
				showThemeSubmit.value = false
				showLogin.value = false
				showRegister.value = false
			}

			const reloadTheme = async (themeId) => {
				const headers = {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				}

				const token = getToken()
				if (token) {
					headers.Authorization = `Bearer ${token}`
				}

				const theme = await fetch(`${baseUri}/api/themes/${themeId}`, {
					headers: headers,
				})
					.then(r => r.json())

				for (let i = 0; i < themes._rawValue.length; i++) {
					if (themes.value[i].id === theme.id) {
						themes.value[i] = theme
					}
				}
			}

			return {
				cancelForm,
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
				user,
				onThemeSubmit,
				onLogin,
				onRegister,
				showThemeSubmit,
				showLogin,
				showRegister,
				triggerLoginRegister,
				toggleLoginRegister,
				toggleSubmitTheme,
				reloadTheme,
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

		input, button {
			box-sizing: border-box;
			background: rgba(255, 255, 255, 0.3);
			color: white;
			appearance: none;
			border: 0;
			padding: 6px 12px;
			line-height: 1.4em;
			margin: 0 0 1em;
			width: 100%;
			max-width: 100%;
			border-radius: 4px;

			&:focus, &:hover, &:active {
				background: rgba(255, 255, 255, 0.6);
			}
		}

		input {
			display: block;
			width: 100%;
		}

		button {
			cursor: pointer;
			flex-basis: 50%;
			display: inline-block;
			width: auto;
			padding: 8px 12px;
			border-radius: 0;

			&:first-child {
				border-top-left-radius: 4px;
				border-bottom-left-radius: 4px;
			}

			&:last-child {
				border-top-right-radius: 4px;
				border-bottom-right-radius: 4px;
			}
		}
	}

	.title, .pagination-details {
		flex: 0 1 auto;
		margin: 0;
	}

	.title {
		margin-right: 20px;
	}

	.pagination-wrapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		button {
			flex: 0 0 auto;
		}

		.pagination-details {
			color: #CECECE;
			margin-left: auto;
		}
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

	form {
		display: flex;
		flex-direction: column;
		width: 60%;
		margin: 0 auto;

		div {
			width: 100%;
			display: flex;
			flex-direction: column;

			&.buttons {
				flex-direction: row;
			}

			label {
				margin-bottom: 0.4em;
			}
		}
	}

	.app__content {
		overflow-y: scroll;
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
