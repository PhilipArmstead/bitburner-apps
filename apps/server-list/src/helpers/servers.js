export function getItems(ns, servers, hackingSkill, playerPortsOwned) {
	return getAllItems(servers).flat()

	function getAllItems(servers, ancestors = ['home']) {
			return Object.entries(servers).map(([hostname, obj]) => {
				return [
					{ ...getItem(hostname), ancestors: ancestors.concat(hostname) },
					(obj.connections ? [ ...getAllItems(obj.connections, ancestors.concat(hostname)) ] : []).flat()
				].flat()
			})
		}

	/**
	 * @param {String} hostname
	 * @return {{hostname: String, contractCount: Number, hasBackdoorTitle: String, hasBackdoorClass: String, hasRootTitle: String, hasRootClass: String, ancestors: {String}[], connections: {Object}[], purchasedByPlayer: {Boolean}}}
	 */
	function getItem (hostname) {
		const server = ns.getServer(hostname)

		const hasRoot = getServerRootStatus(server, playerPortsOwned)
		const hasBackdoor = getServerBackdoorStatus(server, hasRoot, hackingSkill)
		const portClass = getServerPortStatus(server, playerPortsOwned)
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
			hackDifficulty: toFixedNumber(server.hackDifficulty, 2),
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
	}
}


function getServerPortStatus (server, playerPortsOwned) {
	if (server.openPortCount >= server.numOpenPortsRequired) {
		return 'true'
	} else if (playerPortsOwned >= server.numOpenPortsRequired) {
		return 'maybe'
	} else {
		return 'false'
	}
}

function getServerRootStatus (server, playerPortsOwned) {
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

function getServerBackdoorStatus (server, { status }, hackingSkill) {
	let hasBackdoor = {
		className: 'true',
		title: 'This server has a backdoor',
		status: 1,
	}

	if (!server.backdoorInstalled) {
		if (status === 1 && hackingSkill >= server.requiredHackingSkill) {
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

const toFixedNumber = (value, decimalPlaces) => Number(value.toFixed(decimalPlaces))
