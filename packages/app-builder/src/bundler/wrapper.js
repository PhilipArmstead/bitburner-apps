const windowReplacement = 'winnerdow'
const documentReplacement = 'rockument'


/**
 * @param {String} code
 * @param {String} css
 * @returns {String}
 */
module.exports = {
	appWrapper: (code, css) => `
const bundledCss = ${JSON.stringify(css)}

function mount() {
	const ${windowReplacement} = globalThis
	const ${documentReplacement} = globalThis['document'];
	${code.replaceAll(/\bwindow\b/ig, windowReplacement).replaceAll(/\bdocument\b/ig, documentReplacement)}
}
`
}