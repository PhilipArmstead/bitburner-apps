const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')
const svgLoader = require('vite-svg-loader')

const appBuilder = require('./bundler/builder')
const versionOutput = require('./version-output/version-output')


/**
 * @param {{bundleFilename: String?, stylesheetName: String?, id: String, version: String, entryHooks: Object}} options
 * @returns {UserConfigExport}
 */
module.exports = (options) => {
	const { bundleFilename = 'main.js', stylesheetName = 'style.css', id, version, entryHooks } = options

	return defineConfig({
		plugins: [vue(), svgLoader()],
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
					appBuilder(bundleFilename, stylesheetName, id, version, entryHooks),
					versionOutput('version.txt', version),
				],
			},
		},
	})
}
