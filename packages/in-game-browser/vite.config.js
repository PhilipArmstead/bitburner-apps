import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { appBuilder, versionOutput } from '@bitburner-theme-browser/app-builder'

import appEntry, { onExitCode } from './bundle'
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
			external: ['vue'],
			output: {
			globals: { vue: 'Vue'},
			},
			plugins: [
				appBuilder(bundleFilename, stylesheetName, id, version, appEntry, onExitCode),
				versionOutput('version.txt', version),
			],
		},
	},
})
