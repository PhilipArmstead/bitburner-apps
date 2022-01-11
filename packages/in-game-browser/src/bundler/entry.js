/**
 * @param {String} id
 * @param {String} version
 * @returns {String}
 */
export const generateEntry = (id, version) => `
export async function main() {
	const doc = globalThis['document']
	const id = '${id}'
	const appVersion = '${version}'

	doc.getElementById(id)?.remove()
	doc.body.insertAdjacentHTML('beforeend', \`<section id="\${id}"></section>\`)

	doc.getElementById(\`\${id}-css\`)?.remove()
	doc.head.insertAdjacentHTML('beforeend', \`<style id="\${id}-css">\${bundledCss}</style>\`)

	mount()
}
`
