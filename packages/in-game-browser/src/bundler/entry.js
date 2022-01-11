/**
 * @param {String} id
 * @param {String} version
 * @returns {String}
 */
export const generateEntry = (id, version) => `
export async function main(ns) {
	const doc = globalThis['document']
	const id = '${id}'
	const appVersion = '${version}'

	doc.getElementById(id)?.remove()
	doc.body.insertAdjacentHTML('beforeend', \`<section id="\${id}"></section>\`)

	doc.getElementById(\`\${id}-css\`)?.remove()
	doc.head.insertAdjacentHTML('beforeend', \`<style id="\${id}-css">\${bundledCss}</style>\`)

	const currentTheme = ns.ui.getTheme()
	const previewTheme = ({ detail }) => ns.ui.setTheme(detail)
	const resetTheme = () => ns.ui.setTheme(currentTheme)

	doc.body.addEventListener('theme:preview', previewTheme)
	doc.body.removeEventListener('theme:preview', previewTheme)
	
	mount()

	while (doc.getElementById(id)) {
		ns.asleep(2000)
	}

	doc.getElementById(id)?.remove()
} 
`
