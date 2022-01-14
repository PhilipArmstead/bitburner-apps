/**
 * @param {String} id
 */
export function closeApp (id) {
	document.querySelector(`#${id} .app-window`).dispatchEvent(new CustomEvent('app:close'))
}


/**
 * @param {String} name
 * @param {*} payload
 */
export function dispatchEvent (name, payload) {
	document.body.dispatchEvent(new CustomEvent(name, { detail: payload }))
}
