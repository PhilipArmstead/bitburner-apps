/**
 * @returns {Promise<Response>}
 */
export async function getThemes () {
	return fetch('https://bitburner.daft.host/api/themes')
}
