const generateEntry = require('./entry')
const appInjector = require('./app-injector')

/**
 * @param {String} bundleFilename
 * @param {String} stylesheetName
 * @param {String} id
 * @param {String} version
 * @param {{imports: Function?, immediate: Function?, main: Function?, exit: Function?}} entryHooks
 * @returns {{apply: String, generateBundle({}, {}): void, name: String, enforce: String}}
 */
module.exports = (bundleFilename, stylesheetName, id, version, entryHooks = {}) => {
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
${generateEntry(id, version, entryHooks)}
${'\n'.repeat(15)}
${appInjector(component.code, rawCss)}
`.trim()

			// remove from final bundle
			delete bundle[stylesheetName]
		},
	}
}
