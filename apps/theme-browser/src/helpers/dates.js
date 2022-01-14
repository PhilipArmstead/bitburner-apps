/**
 * @param {Number} ts
 * @returns {String}
 */
export function formatDate (ts) {
	return new Date(ts).toLocaleDateString()
}
