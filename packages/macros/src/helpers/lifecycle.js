/**
 * @param {String} id
 */
export function destroyApp (id) {
	document.getElementById(id).remove()
}


/**
 * @param {String} name
 * @param {*} payload
 */
export function dispatchEvent (name, payload) {
	document.body.dispatchEvent(new CustomEvent(name, { detail: payload }))
}
