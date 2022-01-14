const themeExtractor = require('./theme-extractor.js')

/**
 * @param {String} id
 * @param {String} version
 * @param {Function} appEntry
 * @param {Function} onExit
 * @returns {String}
 */
module.exports = (id, version, appEntry = () => '', onExit = () => {
}) => `
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

${themeExtractor}

	// Add app's CSS and mount point
	doc.getElementById(id)?.remove()
	doc.body.insertAdjacentHTML('beforeend', \`<section id="\${id}"></section>\`)

	doc.getElementById(\`\${id}-css\`)?.remove()
	doc.head.insertAdjacentHTML('beforeend', \`<style id="\${id}-css">\${bundledCss}</style>\`)

	const updateApp = async ({ detail: { element, path }}) => {
		await ns.wget(path, ns.getScriptName())
		element.dispatchEvent(new CustomEvent('app:updated'))
	}

	doc.body.addEventListener('app:update:${id}', updateApp)

	ns.atExit(() => {
		doc.getElementById(id)?.remove()
		doc.getElementById(\`\${id}-css\`)?.remove()
		doc.body.removeEventListener('app:update:${id}', updateApp)

		try {
${onExit()}
		} catch (e) {
			console.log(e)
		}
	})

	await vueLoad

${appEntry()}

	mount()

	while (doc.getElementById(id)) {
		await ns.asleep(2000)
	}
} 
`
