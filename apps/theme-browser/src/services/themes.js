import { themesEndpoint } from '../../config/app'


/**
 * @param {Number} themeId
 * @returns {Promise<{json: String}>}
 */
export async function getTheme (themeId) {
	return await fetch(`${themesEndpoint}/${themeId}`).then((response) => response.json())
}


/**
 * @returns {Promise<Response>}
 */
export async function getThemes () {
	return fetch(themesEndpoint)
}


/**
 *
 * @param {Promise<Response>} response
 * @returns {Promise<{
 *  data: {name: String, json: String, images:{src: String}[], author: {name: String}}[],
 *  meta: {items_per_page: Number, page: Number, total_items: Number}}>}
 */
export async function handleThemeResponse (response) {
	const { data, meta } = await response
		.then((response) => response.json())
		.catch(() => ({ data: [], meta: {} }))

	return {
		data: data.map(({ name, json, images, author }) => ({ name, json, src: images[1]?.src, author: author.name })),
		meta,
	}
}
