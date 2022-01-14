import createApp from '@bitburner-theme-browser/app-builder'

import entryHooks from './bundle'
import { id } from './config/app'
import { version } from './package.json'

export default createApp({
	entryHooks,
	id,
	version,
})
