<template>
	<app-wrapper v-bind="{ ...$props, title: 'Server list' }">
		<div class='list'>
			<table class='list-table'>
				<thead>
					<tr class='list__head'>
						<td
							v-for='(header, index) in headers'
							:key='index'
							:title='header.title'
							class='cell'
							:class='[`cell--${header.className}`, {"cell--sorting": sortKey === header.sortKey, "cell--sorting-reverse": !sortAscending }]'
							@click='applySort(header.sortKey)'
						>
							<component :is='header.component' />
							{{ header.content }}
						</td>
					</tr>
				</thead>
				<tbody>
					<server-item v-for='server in servers' :key='server.hostname' :server='server' />
				</tbody>
			</table>
		</div>
	</app-wrapper>
</template>

<script>
	import { computed, onMounted, ref } from 'vue'
	import { AppWrapper } from '@bitburner-theme-browser/common-components'

	// import IconContract from './assets/icons/contract.svg'
	import IconDoor from './assets/icons/door.svg'
	import IconSkull from './assets/icons/skull.svg'
	import ServerItem from './src/components/ServerItem/ServerItem.vue'

	export default {
		components: { AppWrapper, IconDoor, IconSkull, ServerItem },
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
			window[`${id}-server-list`] = [
				{
					'hasAdminRights': 1,
					'hostname': 'n00dles',
					'maxRam': 4,
					'ramUsed': 0,
					'purchasedByPlayer': 0,
					'backdoorInstalled': 1,
					'hackDifficulty': 1,
					'minDifficulty': 1,
					'moneyAvailable': 70000,
					'moneyMax': 1750000,
					'numOpenPortsRequired': 0,
					'openPortCount': 0,
					'requiredHackingSkill': 1,
					'serverGrowth': 3000,
				},
				{
					'hasAdminRights': 0,
					'hostname': 'joesguns',
					'maxRam': 4,
					'ramUsed': 0,
					'purchasedByPlayer': 0,
					'backdoorInstalled': 0,
					'hackDifficulty': 12.00000046,
					'minDifficulty': 5,
					'moneyAvailable': 135896.1235879,
					'moneyMax': 1750000,
					'numOpenPortsRequired': 3,
					'openPortCount': 1,
					'requiredHackingSkill': 45,
					'serverGrowth': 40,
				},
				{
					'hasAdminRights': 1,
					'hostname': 'pserv',
					'maxRam': 512,
					'ramUsed': 64,
					'purchasedByPlayer': 1,
					'backdoorInstalled': 0,
					'hackDifficulty': 1,
					'minDifficulty': 1,
					'moneyAvailable': 0,
					'moneyMax': 0,
					'numOpenPortsRequired': 0,
					'openPortCount': 0,
					'requiredHackingSkill': 1,
					'serverGrowth': 0,
				},
			]

			const sortKey = ref(null)
			const sortAscending = ref(true)
			const player = ref({})
			const playerPortsOwned = computed(() => 3) // TODO

			// In this, get icons, titles, statuses etc pre-generated
			const servers = computed(
				() => window[`${id}-server-list`].map((server) => {
					const hasRoot = getServerRootStatus(server)
					const hasBackdoor = getServerBackdoorStatus(server, hasRoot)
					const portClass = getServerPortStatus(server)
					const moneyAvailable = Math.round(server.moneyAvailable)
					const moneyAvailablePercentage = Math.round(moneyAvailable / server.moneyMax * 100)

					return {
						hostname: server.hostname,
						purchasedByPlayer: server.purchasedByPlayer,
						requiredHackingSkill: server.requiredHackingSkill,
						hasBackdoor,
						hasRoot,
						openPortCount: server.openPortCount,
						numOpenPortsRequired: server.numOpenPortsRequired,
						portClass,
						ramUsed: server.ramUsed,
						maxRam: server.maxRam,
						hackDifficulty: toFixedNumber(server.hackDifficulty,2),
						minDifficulty: server.minDifficulty,
						moneyAvailable,
						moneyAvailableFormatted: moneyAvailable ? `$${new Intl.NumberFormat({ currency: 'USD' }).format(moneyAvailable)}` : '',
						moneyAvailablePercentage,
						moneyAvailablePercentageFormatted: moneyAvailable ? `(${moneyAvailablePercentage}%)` : '',
						moneyMax: server.moneyMax,
						serverGrowth: server.serverGrowth,
						sortHasBackdoor: hasBackdoor.status,
						sortHasRoot: hasRoot.status,
					}
				}).sort((a, b) => {
					const valA = a[sortKey.value]
					const valB = b[sortKey.value]
					if (typeof valA === 'undefined' && typeof valB === 'undefined') {
						return 0
					} else {
						if (typeof valA === 'string') {
							return sortAscending.value ? valA.localeCompare(valB) : valB.localeCompare(valA)
						} else {
							return sortAscending.value ? valA - valB : valB - valA
						}
					}
				})
			)

			const refreshPlayer = () => {
				player.value = window[`${id}-ns`]?.getPlayer()
				setTimeout(refreshPlayer, 2000)
			}

			onMounted(refreshPlayer)

			const applySort = (key) => {
				if (sortKey.value === key) {
					sortAscending.value = !sortAscending.value
				} else {
					sortKey.value = key
					sortAscending.value = false
				}
			}

			const headers = [
				{ className: 'rooted', sortKey: 'sortHasRoot', title: 'Is server rooted?', component:  IconSkull },
				{ className: 'backdoored', sortKey: 'sortHasBackdoor', title: 'Is server backdoored?', component:  IconDoor },
				{ className: 'player-owned', sortKey: 'purchasedByPlayer', title: 'Is server player-owned?', component:  IconSkull },
				{ className: 'hostname', sortKey: 'hostname', content: 'Name' },
				{ className: 'required-hacking-skill', sortKey: 'requiredHackingSkill', content: 'Req. hack', title: 'Required hacking skill' },
				{ className: 'open-ports-required', sortKey: 'numOpenPortsRequired', content: 'Ports', title: 'Open ports required' },
				{ className: 'ram', sortKey: 'maxRam', content: 'RAM', title: 'RAM in-use/total' },
				{ className: 'security', sortKey: 'hackDifficulty', content: 'Security', title: 'Server security' },
				{ className: 'money', sortKey: 'moneyMax', content: 'Money', title: 'Money available/max' },
				{ className: 'growth', sortKey: 'serverGrowth', content: 'Growth', title: 'Growth' },
				// { className: 'time-to-hack', sortKey: 'serverGrowth', content: 'Time to hack', title: 'Time to hack' },
			]

			// TODO: make these external
			const toFixedNumber = (value, decimalPlaces) => Number(value.toFixed(decimalPlaces))
			const getServerPortStatus = (server) => {
				if (server.openPortCount >= server.numOpenPortsRequired) {
					return 'true'
				} else if (playerPortsOwned >= server.numOpenPortsRequired) {
					return 'maybe'
				} else {
					return 'false'
				}
			}
			const getServerRootStatus = (server) => {
				let hasRoot = {
					className: 'true',
					status: 1,
					title: 'This server is rooted',
				}

				if (!server.hasAdminRights) {
					if (playerPortsOwned.value >= server.numOpenPortsRequired || server.openPortCount > server.numOpenPortsRequired) {
						hasRoot.className = 'maybe'
						hasRoot.status = 0
						hasRoot.title = 'Click to root'
					} else {
						hasRoot.className = 'false'
						hasRoot.status = -1
						hasRoot.title =
							`${server.hostname} needs ${server.numOpenPortsRequired} port${server.numOpenPortsRequired !== 1 ?
								's' :
								''} open to root `
					}
				}

				return hasRoot
			}
			const getServerBackdoorStatus = (server, { status }) => {
				let hasBackdoor = {
					className: 'true',
					title: 'This server has a backdoor',
					status: 1,
				}

				if (!server.backdoorInstalled ) {
					if (status === 1 && player.value?.hacking >= server.requiredHackingSkill) {
						hasBackdoor.className = 'maybe'
						hasBackdoor.status = 0
						hasBackdoor.title = 'Click to install backdoor'
					} else {
						hasBackdoor.className = 'false'
						hasBackdoor.status = -1
						hasBackdoor.title = `${server.hostname} has a minimum required hacking skill of ${server.requiredHackingSkill}`
					}
				}

				return hasBackdoor
			}

			return { headers, servers, sortAscending, sortKey, applySort }
		},
	}
</script>

<style scoped lang="scss">
	@import '@bitburner-theme-browser/common-styles';

	:deep(.app-container .app) {
		height: 40vh;
		width: 60vw;
	}

	:deep(.app-container .app__content) {
		background: var(--backgroundprimary, $background-colour);
		scrollbar-width: auto;
	}

	.list {
		align-content: flex-start;
		box-sizing: border-box;
		color: #FFF;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		min-height: 100%;
		padding: 6px;

		&-table {
			border-collapse: collapse;
			border-spacing: 0;
			width: 100%;
		}

		&__head {
			.cell {
				border-bottom: 1px solid;
				padding-bottom: 6px;

				&--sorting {
					padding-right: 20px;
					position: relative;

					&::before {
						background: no-repeat 0 50%/100% auto url('../../packages/common/common-assets/icons/arrow.svg');
						content: '';
						height: 100%;
						position: absolute;
						right: 4px;
						top: 0;
						width: 12px;
					}
				}

				&:not(&--sorting-reverse)::before {
					transform: rotate(180deg);
				}
			}
		}

		.icon {
			width: 20px;
		}
	}

	:deep(.cell), .cell {
		padding-left: 6px;
		padding-right: 6px;
		white-space: nowrap;
	}
</style>
