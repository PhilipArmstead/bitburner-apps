/**
 * @returns {Promise<{data: {preview: string, content: string, likes: number, downloads: number, author: string, name: *, submittedOn, id: number}[]}>}
 */
export async function getThemes () {
	return fetch('https://bitburner.daft.host/api/themes')
}
