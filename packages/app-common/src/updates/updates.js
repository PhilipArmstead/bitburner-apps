/**
 * @param {String} currentVersion
 * @param {String} latestVersionPath
 * @return {String|null}
 */
export const getAvailableUpdate = async (currentVersion, latestVersionPath) => {
	const latestVersion = await fetch(latestVersionPath).then((result) => result.text())

	return isVersionHigher(latestVersion, currentVersion) ? latestVersion : null
}


/**
 * @param {String} v1
 * @param {String} v2
 * @returns {boolean}
 */
const isVersionHigher = (v1, v2) => {
	const parsedV1 = v1.split('.').map(Number)
	const parsedV2 = v2.split('.').map(Number)

	for (let i = 0; i < parsedV1.length; ++i) {
		if (parsedV1[i] > parsedV2[i] || 0) {
			return true
		} else if (parsedV2[i] > parsedV1[i] || 0) {
			return false
		}
	}

	return false
}
