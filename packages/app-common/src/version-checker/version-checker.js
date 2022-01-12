/**
  * @param {String} currentVersion
  * @param {String} latestVersion
  * @return {String}
  */
export const isUpdateAvailable = (currentVersion, latestVersion) => isVersionHigher(latestVersion, currentVersion) ? latestVersion : null

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