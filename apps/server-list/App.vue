<template>
	<app-wrapper v-bind="{ ...$props, title: 'Server list' }">
		<div class='server-list'>
			<table>
				<thead>
					<tr>
						<td class='cell cell--rooted' title='Is server rooted?' />
						<td class='cell cell--backdoored' title='Is server backdoored?' />
						<td class='cell cell--player-owned' title='Is server player-owned?' />
						<td class='cell cell--hostname'>Name</td>
						<td class='cell cell--required-hacking-skill' title='Required hacking skill'>Req. hack</td>
						<td class='cell cell--open-ports-required' title='Open ports required'>Ports</td>
						<td class='cell cell--ram' title='RAM in-use/total'>RAM</td>
						<td class='cell cell--security' title='Server security'>Security</td>
						<td class='cell cell--money' title='Money available/max'>Money</td>
						<td class='cell cell--growth' title='Growth'>Growth</td>
						<td class='cell cell--time-to-hack' title='Time to hack'>Time to hack</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for='server in servers' :key='server.hostname'>
						<td class='cell cell--rooted'>{{ server.hasAdminRights }}</td>
						<td class='cell cell--backdoored'>{{ server.backdoorInstalled }}</td>
						<td class='cell cell--player-owned'>{{ server.purchasedByPlayer }}</td>
						<td class='cell cell--hostname'>{{ server.hostname }}</td>
						<td class='cell cell--required-hacking-skill'>{{ server.requiredHackingSkill }}</td>
						<td class='cell cell--open-ports-required'>{{ server.openPortCount }}/{{ server.numOpenPortsRequired }}</td>
						<td class='cell cell--ram'>{{ server.ramUsed }}/{{ server.maxRam }}</td>
						<td class='cell cell--security'>{{ server.hackDifficulty }} ({{ server.minDifficulty }})</td>
						<td class='cell cell--money'>{{ server.moneyAvailable }} ({{ server.moneyMax / server.moneyAvailable * 100 }})</td>
						<td class='cell cell--growth'>{{ server.serverGrowth }}</td>
						<td class='cell cell--time-to-hack'>0s</td>
					</tr>
				</tbody>
			</table>
		</div>
<!--					<button class='server__cta' @click='inputTerminalCommands(commands)'>-->
	</app-wrapper>
</template>

<script>
	import { computed } from 'vue'
	import { AppWrapper } from '@bitburner-theme-browser/common-components'
	import { inputTerminalCommands } from '@bitburner-theme-browser/common-helpers'

	import * as config from './config/app'

	export default {
		components: { AppWrapper },
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
			window[`${config.id}-server-list`] = [
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

			// In this, get icons, titles, statuses etc pre-generated
			const servers = computed(() => window[`${config.id}-server-list`])

			return { config, servers, inputTerminalCommands }
		},
	}
</script>

<style scoped lang="scss">
	@import "@bitburner-theme-browser/common-styles";

	:deep(.app-container .app) {
		height: 40vh;
		width: 60vw;
	}

	.server-list {
		align-content: flex-start;
		background: var(--backgroundprimary, $background-colour);
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		min-height: 100%;
		padding: 6px;
	}
</style>
