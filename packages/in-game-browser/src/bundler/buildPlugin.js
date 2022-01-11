import { generateEntry } from './entry'
import { appWrapper } from './wrapper'

const version = require('../../package.json').version

export default (bundleFilename, stylesheetName) => {
	return {
		apply: 'build',
		enforce: 'post',
		name: 'pack-css',
		generateBundle(opts, bundle) {

			const {
				[stylesheetName]: { source: rawCss },
				[bundleFilename]: component,
			} = bundle

			component.code = `
${generateEntry('theme-browser-app', version)}
${'\n'.repeat(50)}
${appWrapper(component.code, rawCss)}
`

			// remove from final bundle
			delete bundle[stylesheetName]
		}
	}
}