import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import buildPlugin from './src/bundler/plugins/builder'
import versionOutput from './src/bundler/plugins/versionOutput'
import appEntry, { onExitCode } from './src/bundler/main'
import { id } from './config/app'

const version = require('./package.json').version
const bundleFilename = 'main.js'
const stylesheetName = 'style.css'

export default defineConfig({
	plugins: [vue()],
	build: {
		lib: {
			entry: bundleFilename,
			name: bundleFilename,
			fileName: () => bundleFilename,
			formats: ['iife'],
		},
		cssCodeSplit: false,
		rollupOptions: {
			plugins: [
				buildPlugin(bundleFilename, stylesheetName, id, version, appEntry, onExitCode),
				versionOutput('version.txt', version),
			],
		},
	},
})
