import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const bundleFilename = 'main.ts'
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
				{
					apply: 'build',
					enforce: 'post',
					name: 'pack-css',
					generateBundle(opts, bundle) {
						const {
							[stylesheetName]: { source: rawCss },
							[bundleFilename]: component,
						} = bundle

						component.code = `
const winnerdow = globalThis
const rockument = globalThis['document']
const bundledCss = ${JSON.stringify(rawCss)}

function mount() {${component.code.replaceAll(/\bwindow\b/ig, 'winnerdow').replaceAll(/\bdocument\b/ig, 'rockument').replaceAll(/\bns\b/ig, 'n_s')}}

export async function main() {
	const doc = rockument
	const id = 'theme-browser-app'

	doc.getElementById(id)?.remove()
	doc.body.insertAdjacentHTML('beforeend', \`<section id='\${id}'></section>\`)

	doc.getElementById(\`\${id}-css\`)?.remove()
	doc.head.insertAdjacentHTML('beforeend', \`<style id='\${id}-css'>\${bundledCss}</style>\`)

	mount()
}
`

						// remove from final bundle
						delete bundle[stylesheetName]
					},
				},
			],
		},
	},
})
