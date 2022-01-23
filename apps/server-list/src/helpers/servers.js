export const getServers = (ns) => {
	return runScan(ns).connections
}

export const getItems =(ns, servers, hackingSkill, playerPortsOwned) => {
	const formatter = new Intl.NumberFormat()
	const currencyFormatter = new Intl.NumberFormat({ currency: 'USD' })
	const getAllItems =(servers, ancestors = ['home']) => {
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
	const getItem = (hostname) => {
		const server = ns.getServer(hostname)

		const hasRoot = getServerRootStatus(server, playerPortsOwned)
		const hasBackdoor = getServerBackdoorStatus(server, hasRoot, hackingSkill)
		const portClass = getServerPortStatus(server, playerPortsOwned)
		const moneyAvailable = Math.round(server.moneyAvailable)
		const moneyAvailablePercentage = Math.round(moneyAvailable / server.moneyMax * 100)
		const hackDifficulty = toFixedNumber(server.hackDifficulty, 2)
		const contracts = ns.ls(hostname, ".cct")
		const growThreads = server.moneyMax ? Math.ceil(ns.growthAnalyze(hostname, server.moneyMax / Math.max(server.moneyAvailable, 1))) : -1

		return {
			hostname: server.hostname,
			purchasedByPlayer: server.purchasedByPlayer,
			requiredHackingSkill: server.requiredHackingSkill,
			requiredHackingSkillDisplay: formatter.format(server.requiredHackingSkill),
			hasBackdoor,
			hasRoot,
			openPortCount: server.openPortCount,
			numOpenPortsRequired: server.numOpenPortsRequired,
			portDisplay: !server.purchasedByPlayer ? server.numOpenPortsRequired : '',
			portClass,
			ramUsed: toFixedNumber(server.ramUsed, 2),
			maxRam: server.maxRam,
			hackDifficulty,
			minDifficulty: server.minDifficulty,
			difficultyDisplay: moneyAvailable ? `${hackDifficulty} (${server.minDifficulty})` : '',
			moneyAvailable,
			moneyAvailableFormatted: moneyAvailable ? `$${currencyFormatter.format(moneyAvailable)}` : '',
			moneyAvailablePercentage,
			moneyAvailablePercentageFormatted: moneyAvailable ? `(${moneyAvailablePercentage}%)` : '',
			moneyMax: server.moneyMax,
			serverGrowth: server.serverGrowth,
			serverGrowthDisplay: server.serverGrowth || '',
			sortHasBackdoor: hasBackdoor.status,
			sortHasRoot: hasRoot.status,
			contracts,
			contractsLength: contracts.length,
			growThreads,
			growThreadsDisplay: growThreads > 0 ? formatter.format(growThreads): '',
		}
	}

	return getAllItems(servers).flat()
}


const getServerPortStatus = (server, playerPortsOwned) => {
	if (server.openPortCount >= server.numOpenPortsRequired) {
		return 'true'
	} else if (playerPortsOwned >= server.numOpenPortsRequired) {
		return 'maybe'
	} else {
		return 'false'
	}
}

const getServerRootStatus = (server, playerPortsOwned) => {
	let hasRoot = {
		className: 'true',
		status: 1,
		title: 'This server is rooted',
	}

	if (!server.hasAdminRights) {
		if (playerPortsOwned >= server.numOpenPortsRequired || server.openPortCount > server.numOpenPortsRequired) {
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

const getServerBackdoorStatus = (server, { status }, hackingSkill) => {
	let hasBackdoor = {
		className: 'true',
		title: 'This server has a backdoor',
		status: 1,
	}

	if (!server.purchasedByPlayer) {
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
	} else {
		hasBackdoor.className = 'hidden'
		hasBackdoor.status = -2
	}

	return hasBackdoor
}


/**
 * @param {NS} ns
 * @return {{ connections: Object }} results
 **/
const runScan = (ns) => {
	const found = new Set()
	const tree = {}
	scan(ns, tree, found)

	return tree
}

/**
 * @param {NS} ns
 * @param {Object} tree
 * @param {Set} found
 * @param {String?} host
 **/
const scan = (ns, tree, found, host = "home") => {
	found.add(host)

	const targets = ns.scan(host).filter((server, i) => i || host === "home")

	if (targets.length) {
		tree.connections = {}
	}

	targets.forEach((server) => {
		tree.connections[server] = {}

		if (!found.has(server)) {
			scan(ns, tree.connections[server], found, server)
		} else {
			tree.connections[server].duplicate = true
		}
	})
}

const toFixedNumber = (value, decimalPlaces) => Number(value.toFixed(decimalPlaces))
