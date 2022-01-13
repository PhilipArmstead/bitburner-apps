const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')

const appBuilder = require('./bundler/builder')
const versionOutput = require('./version-output/version-output')


/**
 * @param {{
 * bundleFilename: String?, stylesheetName: String?, id: String, version: String, appEntry: Function, onExit: Function
 * }} options
 * @returns {UserConfigExport}
 */
module.exports = (options) => {
	const { bundleFilename = 'main.js', stylesheetName = 'style.css', id, version, appEntry, onExit } = options

	return defineConfig({
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
					globals: { vue: 'Vue' },
				},
				plugins: [
					appBuilder(bundleFilename, stylesheetName, id, version, appEntry, onExit),
					versionOutput('version.txt', version),
				],
			},
		},
	})
}
