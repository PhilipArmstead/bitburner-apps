import createApp from '@bitburner-theme-browser/app-builder'

import { appEntry, onExit } from './bundle'
import { id } from './config/app'
import { version } from './package.json'

export default createApp({
	appEntry,
	onExit,
	id,
	version,
})
