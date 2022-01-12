import generateThemeExtractor from './theme-extractor.js'

/**
 * @param {String} id
 * @param {String} version
 * @returns {String}
 */
export const generateEntry = (id, version, appEntry = () => '') => `
export async function main(ns) {
	const doc = globalThis['document']
	const id = '${id}'
	globalThis[\`\${id}-version\`] = '${version}'

${generateThemeExtractor()}

	// Add app's CSS and mount point
	doc.getElementById(id)?.remove()
	doc.body.insertAdjacentHTML('beforeend', \`<section id='\${id}'></section>\`)

	doc.getElementById(\`\${id}-css\`)?.remove()
	doc.head.insertAdjacentHTML('beforeend', \`<style id='\${id}-css'>\${bundledCss}</style>\`)

	ns.atExit(() => {
		doc.getElementById(id)?.remove()
		doc.getElementById(\`\${id}-css\`)?.remove()
	})

${appEntry()}
} 
`
