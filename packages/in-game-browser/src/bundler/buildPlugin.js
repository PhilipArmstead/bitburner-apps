import { generateEntry } from './entry'
import { appWrapper } from './wrapper'

const version = require('../../package.json').version

/**
 * @param {String} bundleFilename
 * @param {String} stylesheetName
 * @param {String} id
 * @returns {{apply: String, generateBundle({}, {}): void, name: String, enforce: String}}
 */
export default (bundleFilename, stylesheetName, id) => {
	return {
		apply: 'build',
		enforce: 'post',
		name: 'pack-css',
		generateBundle (opts, bundle) {

			const {
				[stylesheetName]: { source: rawCss },
				[bundleFilename]: component,
			} = bundle

			component.code = `
${generateEntry(id, version)}
${'\n'.repeat(50)}
${appWrapper(component.code, rawCss)}
`

			// remove from final bundle
			delete bundle[stylesheetName]
		},
	}
}
