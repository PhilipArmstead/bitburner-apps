import { baseUri, themesEndpoint } from '../../config/app'


/**
 * @param {Number} themeId
 * @returns {Promise<{json: String}>}
 */
export async function getTheme (themeId) {
	return await fetch(`${baseUri}${themesEndpoint}/${themeId}`).then((response) => response.json())
}


/**
 * @returns {Promise<Response>}
 */
export async function getThemes (token) {
	token = token || null

	const headers = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	}

	if (token) {
		headers.Authorization = `Bearer ${token}`
	}

	return fetch(`${baseUri}${themesEndpoint}`, {
		headers: headers,
	})
}


/**
 *
 * @param {Promise<Response>} response
 * @returns {Promise<{
 *  data: {}[],
 *  meta: {items_per_page: Number, page: Number, total_items: Number}}>}
 */
export async function handleThemeResponse (response) {
	const { data, meta } = await response
		.then((response) => response.json())
		.catch(() => ({ data: [], meta: {} }))

	return {
		data: data || [],
		meta,
	}
}
