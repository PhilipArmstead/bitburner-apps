import createApp from '@bitburner-theme-browser/app-builder'

import entryHooks from './bundle'
import config from './config/app'
import { version } from './package.json'

export default createApp({
	entryHooks,
	id: config.id,
	version,
})
