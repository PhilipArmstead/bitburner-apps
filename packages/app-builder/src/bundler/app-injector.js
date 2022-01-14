const windowReplacement = 'winnerdow'
const documentReplacement = 'rockument'


/**
 * Take the App's JS/CSS and dump them in to a script as a callable function and a string of CSS respectively.
 * @param {String} code
 * @param {Object} css
 * @returns {String}
 */
module.exports = (code, css) => `
const bundledCss = ${JSON.stringify(css)}

function mount() {
	const ${windowReplacement} = globalThis
	const ${documentReplacement} = globalThis['document'];
	${code.replaceAll(/\bwindow\b/ig, windowReplacement).replaceAll(/\bdocument\b/ig, documentReplacement)}
}
`
