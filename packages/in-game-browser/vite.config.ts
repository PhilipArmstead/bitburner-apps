import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import svgLoader from 'vite-svg-loader'

export default defineConfig({
	// build: {
	// 	outDir: `../../${WEB_ROOT}`,
	// },
	// plugins: [vue(), svgLoader()],
	plugins: [vue()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: undefined,
			},
		},
	},
})
