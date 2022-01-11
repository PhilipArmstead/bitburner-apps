const windowReplacement = 'winnerdow'
const documentReplacement = 'rockument'

export const appWrapper = (code: String, css: Object) => {
	return `
const bundledCss = ${JSON.stringify(css)}

function mount() {
	const ${windowReplacement} = globalThis
	const ${documentReplacement} = globalThis['document']
	${code.replaceAll(/\bwindow\b/ig, '${windowReplacement}').replaceAll(/\bdocument\b/ig, '${documentReplacement}')}
}
`
}