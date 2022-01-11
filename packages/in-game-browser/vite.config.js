import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import buildPlugin from './src/bundler/buildPlugin'
import { id } from './config/app'

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
			plugins: [buildPlugin(bundleFilename, stylesheetName, id)],
		},
	},
})
