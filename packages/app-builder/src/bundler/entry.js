const themeExtractor = require('./theme-extractor.js')

/**
 * @param {String} id
 * @param {String} version
 * @param {{imports: Function?, immediate: Function?, main: Function?, exit: Function?, extractThemes: Boolean?}} entryHooks
 * @returns {String}
 */
module.exports = (id, version, entryHooks) => `
${entryHooks.imports ? entryHooks.imports() : ''}

export async function main(ns) {
${entryHooks.immediate ? entryHooks.immediate() : ''}

	// Boilerplate
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

${entryHooks.extractThemes ? themeExtractor : ''}

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

	// Unset some stuff on app death
	ns.atExit(() => {
		doc.getElementById(id)?.remove()
		doc.getElementById(\`\${id}-css\`)?.remove()
		doc.body.removeEventListener('app:update:${id}', updateApp)

${entryHooks.exit ? `
		try {${entryHooks.exit()}
		} catch (e) {
			console.log(e)
		}
` : ''}
	})

	await vueLoad

${entryHooks.main ? entryHooks.main() : ''}

	// Let's go
	mount()

${entryHooks.keepAlive ? `
	while (doc.getElementById(id)) {
		await ns.asleep(2000)
	}
` : ''}
} 
`
