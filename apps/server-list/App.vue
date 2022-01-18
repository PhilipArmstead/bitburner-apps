<template>
	<app-wrapper v-bind="{ ...$props, title: 'Server list' }">
		<div class="list">
			<table class="list-table">
				<thead>
					<tr class="list__head">
						<td class='cell cell--rooted' title='Is server rooted?' />
						<td class='cell cell--backdoored' title='Is server backdoored?' />
						<td class='cell cell--player-owned' title='Is server player-owned?' />
						<td class='cell cell--hostname'>
							Name
						</td>
						<td class='cell cell--required-hacking-skill' title='Required hacking skill'>
							Req. hack
						</td>
						<td class='cell cell--open-ports-required' title='Open ports required'>
							Ports
						</td>
						<td class='cell cell--ram' title='RAM in-use/total'>
							RAM
						</td>
						<td class='cell cell--security' title='Server security'>
							Security
						</td>
						<td class='cell cell--money' title='Money available/max'>
							Money
						</td>
						<td class='cell cell--growth' title='Growth'>
							Growth
						</td>
						<td class='cell cell--time-to-hack' title='Time to hack'>
							Time to hack
						</td>
					</tr>
				</thead>
				<tbody>
					<server-item v-for='server in servers' :key='server.hostname' :server="server" />
				</tbody>
			</table>
		</div>
	</app-wrapper>
</template>

<script>
	import { computed, onMounted, ref } from 'vue'
	import { AppWrapper } from '@bitburner-theme-browser/common-components'

	import ServerItem from './src/components/ServerItem/ServerItem.vue'

	export default {
		components: { AppWrapper, ServerItem },
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
					'hasAdminRights': true,
					'hostname': 'n00dles',
					'maxRam': 4,
					'ramUsed': 0,
					'purchasedByPlayer': false,
					'backdoorInstalled': true,
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
					'hasAdminRights': false,
					'hostname': 'joesguns',
					'maxRam': 4,
					'ramUsed': 0,
					'purchasedByPlayer': false,
					'backdoorInstalled': false,
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
					'hasAdminRights': true,
					'hostname': 'pserv',
					'maxRam': 512,
					'ramUsed': 64,
					'purchasedByPlayer': true,
					'backdoorInstalled': false,
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

			const player = ref({})
			const playerPortsOwned = computed(() => 3) // TODO

			// In this, get icons, titles, statuses etc pre-generated
			const servers = computed(() => window[`${id}-server-list`].map((server) => {
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
					serverGrowth: server.serverGrowth,
				}
			}))

			const refreshPlayer = () => {
				player.value = window[`${id}-ns`]?.getPlayer()
				setTimeout(refreshPlayer, 2000)
			}

			onMounted(refreshPlayer)

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
					if (status === 1 && player.value.hacking >= server.requiredHackingSkill) {
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

			return { servers }
		},
	}
</script>

<style scoped lang="scss">
	@import "@bitburner-theme-browser/common-styles";

	:deep(.app-container .app) {
		height: 40vh;
		width: 60vw;
	}

	:deep(.app-container .app__content) {
		background: var(--backgroundprimary, $background-colour);
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
		}

		&__head .cell {
			padding: 0 6px;

			&--sorting {
				position: relative;

				&::before {
					background: no-repeat 0 0/100% auto url("../../packages/common/common-assets/icons/arrow.svg");
					content: "";
					height: 16px;
					position: absolute;
					right: 0;
					top: 0;
					width: 16px;
				}
			}
		}
	}
</style>
