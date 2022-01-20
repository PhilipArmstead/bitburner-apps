<template>
	<tr class='server'>
		<td class='cell cell--rooted'>
			<button class='icon-cta' :title='server.hasRoot.title' @click='root'>
				<icon-skull
					class='icon icon--skull'
					:class='[`icon--${server.hasRoot.className}`]'
				/>
			</button>
		</td>
		<td class='cell cell--backdoored'>
			<button class='icon-cta' :title='server.hasBackdoor.title' @click='backdoor'>
				<icon-door
					class='icon icon--door'
					:class='[`icon--${server.hasBackdoor.className}`]'
				/>
			</button>
		</td>
		<td class='cell cell--player-owned'>
			<icon-tick v-if='server.purchasedByPlayer' class='icon icon--tick' />
		</td>
		<td class='cell cell--hostname'>
			<button class='cta' :title='`Connect to ${server.hostname}`' @click='connect'>
				{{ server.hostname }}
			</button>
		</td>
		<td class='cell cell--required-hacking-skill'>
			{{ server.requiredHackingSkill }}
		</td>
		<td class='cell cell--open-ports-required' :class='[`cell--${server.portClass}`]'>
			{{ server.openPortCount }}/{{ server.numOpenPortsRequired }}
		</td>
		<td class='cell cell--ram'>
			{{ server.ramUsed }}/{{ server.maxRam }}
		</td>
		<td class='cell cell--security'>
			{{ server.hackDifficulty }} ({{ server.minDifficulty }})
		</td>
		<td class='cell cell--money'>
			{{ server.moneyAvailableFormatted }} {{ server.moneyAvailablePercentageFormatted }}
		</td>
		<td class='cell cell--growth'>
			{{ server.serverGrowth }}
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
			const getConnectCommand = (servers) => servers.slice(1).map((node) => `connect ${node}`)
			const getRootCommand = (servers) => [
				...getConnectCommand(servers),
				...props.cracksOwned.slice(0, props.server.numOpenPortsRequired).map((crack) => `run ${crack}`),
				"run NUKE.exe"
			]
			const backdoor = () => inputTerminalCommands([
				...getRootCommand(props.server.ancestors),
				"backdoor"
			])
			const connect = () => inputTerminalCommands(getConnectCommand(props.server.ancestors))
			const root = () => inputTerminalCommands(getRootCommand(props.server.ancestors))

			return { backdoor, connect, root }
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
