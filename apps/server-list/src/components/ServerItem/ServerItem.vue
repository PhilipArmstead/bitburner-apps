<template>
	<tr class='server'>
		<td class='cell cell--rooted cell--align-center'>
			<button class='icon-cta' :title='server.hasRoot.title' @click='root'>
				<icon-skull
					class='icon icon--skull'
					:class='[`icon--${server.hasRoot.className}`]'
				/>
			</button>
		</td>
		<td class='cell cell--backdoored cell--align-center'>
			<button class='icon-cta' :title='server.hasBackdoor.title' @click='backdoor'>
				<icon-door
					class='icon icon--door'
					:class='[`icon--${server.hasBackdoor.className}`]'
				/>
			</button>
		</td>
		<td class='cell cell--player-owned cell--align-center'>
			<icon-tick v-if='server.purchasedByPlayer' class='icon icon--tick' />
		</td>
		<td class='cell cell--contracts'>
			<button
				v-for='contract in server.contracts'
				:key='contract'
				class='icon-cta'
				:title='`Run ${contract}`'
				@click='runContract(contract)'
			>
				<icon-contract class='icon icon--door' />
			</button>
		</td>
		<td class='cell cell--hostname'>
			<button class='cta' :title='`Connect to ${server.hostname}`' @click='join'>
				{{ server.hostname }}
			</button>
		</td>
		<td class='cell cell--required-hacking-skill'>
			{{ server.requiredHackingSkillDisplay }}
		</td>
		<td class='cell cell--open-ports-required' :class='[`cell--${server.portClass}`]'>
			{{ server.portDisplay }}
		</td>
		<td class='cell cell--ram'>
			{{ server.ramUsed.toFixed(2) }}/{{ server.maxRam }}
		</td>
		<td class='cell cell--ram cell--align-right'>
			{{ server.ramUsedPercentageFormatted }}
		</td>
		<td class='cell cell--security'>
			{{ server.difficultyDisplay }}
		</td>
		<td class='cell cell--money'>
			{{ server.moneyAvailableFormatted }}
		</td>
		<td class='cell cell--money-percent cell--align-right'>
			{{ server.moneyAvailablePercentageFormatted }}
		</td>
		<td class='cell cell--growth'>
			{{ server.serverGrowthDisplay }}
		</td>
		<td class='cell cell--threads-to-grow'>
			{{ server.growThreadsDisplay }}
		</td>
	</tr>
</template>

<script>
	import * as Icon from '@bitburner-theme-browser/common-assets'
	import { inputTerminalCommands } from '@bitburner-theme-browser/common-helpers'

	import IconContract from '../../../assets/icons/contract.svg'
	import IconDoor from '../../../assets/icons/door.svg'
	import IconSkull from '../../../assets/icons/skull.svg'

	export default {
		name: 'ServerItem',
		components: { IconContract, IconDoor, IconSkull, IconTick: Icon.IconTick },
		props: {
			server: {
				type: Object,
				required: true,
			},
			cracksOwned: {
				type: Array,
				default: () => [],
			},
		},
		setup (props) {
			const getJoinCommand = (servers) => ['home', ...servers.slice(1).map((node) => `connect ${node}`)]
			const getRootCommand = (servers) => [
				...getJoinCommand(servers),
				...props.cracksOwned.slice(0, props.server.numOpenPortsRequired).map((crack) => `run ${crack}`),
				'run NUKE.exe',
			]
			const backdoor = () => inputTerminalCommands([
				...getRootCommand(props.server.ancestors),
				'backdoor',
			])
			const join = () => inputTerminalCommands(getJoinCommand(props.server.ancestors))
			const root = () => inputTerminalCommands(getRootCommand(props.server.ancestors))
			const runContract = (contract) => inputTerminalCommands([
				...getRootCommand(props.server.ancestors),
				`run ${contract}`,
			])

			return { backdoor, join, root, runContract }
		},
	}
</script>

<style scoped lang="scss">
	.server:first-child {
		.cell {
			padding-top: 6px;
		}
	}

	.cell {
		border: 1px solid #3e3e3e2e;
		border-bottom: none;
		border-right: none;
		padding: 3px;

		&--true {
			color: #090;
		}

		&--maybe {
			color: yellow;
		}

		&--false {
			color: #900;
		}

		&--align-center {
			text-align: center;
		}

		&--align-right {
			text-align: right;
		}

		&--contracts {
			.icon {
				color: yellow;
			}
		}
	}

	.icon {
		width: 20px;

		&--true {
			color: #0C0;
		}

		&--maybe {
			color: yellow;
		}

		&--false {
			color: #C00;
		}

		&--hidden {
			display: none;
		}
	}

	.cta, .icon-cta {
		background: none;
		border: none;
		cursor: pointer;
		outline: none;
		padding: 0;
	}

	.cta {
		border-bottom: 1px dotted;
		color: inherit;
		cursor: pointer;
	}
</style>
