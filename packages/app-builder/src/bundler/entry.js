const generateThemeExtractor = require('./theme-extractor.js')

/**
 * @param {String} id
 * @param {String} version
 * @returns {String}
 */
module.exports = {
	generateEntry: (id, version, appEntry = () => '', onExitCode = '') => `
export async function main(ns) {
	const doc = globalThis['document']
	const id = '${id}'
	globalThis[\`\${id}-version\`] = '${version}'

	let vueLoaded
	const vueLoad = new Promise((resolve) => (vueLoaded = resolve))

	if (!doc.getElementById('vue-js-lib')) {
		const script = doc.createElement('script')
		script.id = 'vue-js-lib'
		script.src = 'https://cdn.jsdelivr.net/npm/vue@3.2.26/dist/vue.runtime.global.prod.js'
		script.onload = vueLoaded
		doc.head.insertAdjacentElement('beforeend', script)
	} else {
		vueLoaded()
	}

${generateThemeExtractor()}

	// Add app's CSS and mount point
	doc.getElementById(id)?.remove()
	doc.body.insertAdjacentHTML('beforeend', \`<section id='\${id}'></section>\`)

	doc.getElementById(\`\${id}-css\`)?.remove()
	doc.head.insertAdjacentHTML('beforeend', \`<style id='\${id}-css'>\${bundledCss}</style>\`)

	ns.atExit(() => {
		doc.getElementById(id)?.remove()
		doc.getElementById(\`\${id}-css\`)?.remove()
${onExitCode}
	})

	await vueLoad

${appEntry()}
} 
`
}