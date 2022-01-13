const generateEntry = require('./entry')
const appWrapper = require('./wrapper')

/**
 * @param {String} bundleFilename
 * @param {String} stylesheetName
 * @param {String} id
 * @param {String} version
 * @param {Function} appEntry
 * @param {Function} onExit
 * @returns {{apply: String, generateBundle({}, {}): void, name: String, enforce: String}}
 */
module.exports = (bundleFilename, stylesheetName, id, version, appEntry = () => '', onExit = () => {}) => {
	return {
		apply: 'build',
		enforce: 'post',
		name: 'combine-outputs',
		generateBundle (opts, bundle) {
			const {
				[stylesheetName]: { source: rawCss },
				[bundleFilename]: component,
			} = bundle

			component.code = `
${generateEntry(id, version, appEntry, onExit)}
${'\n'.repeat(15)}
${appWrapper(component.code, rawCss)}
`.trim()

			// remove from final bundle
			delete bundle[stylesheetName]
		},
	}
}
