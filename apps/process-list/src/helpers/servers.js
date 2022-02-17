let cachedServers = []
let cacheLifetime = 0

/**
 * @param {NS} ns
 * @return {String[]}
 **/
export const getSlavedServers = (ns) => {
	if (!cacheLifetime--) {
		cacheLifetime = 50
		cachedServers = scanServer(ns).filter(ns.hasRootAccess).filter(ns.getServerMaxRam)
	}

	return cachedServers
}

/**
 * @param {NS} ns
 * @param {String} server
 * @param {Set<String>} results
 * @return {String[]}
 **/
const scanServer = (ns, server = 'home', results = new Set()) => {
	results.add(server)

	for (const result of ns.scan(server)) {
		if (!results.has(result)) {
			scanServer(ns, result, results)
		}
	}

	return [...results]
}
