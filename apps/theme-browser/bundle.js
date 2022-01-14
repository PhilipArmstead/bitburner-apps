export default {
	immediate: () => `
	// Immediate app-specific code
	const previewTheme = ({ detail }) => {
		try {
			ns.ui.setTheme(JSON.parse(detail))
		} catch (e) {
			console.log(e)
		}
	}

	const { apply: themeToApply, 'apply-id': themeIdToApply } = ns.flags([['apply', ""], ['apply-id', ""]])
	if (themeToApply) {
		return previewTheme({ detail: themeToApply })
	}
`,
	main: () => `
	// App-specific setup
	const currentTheme = ns.ui.getTheme()
	const resetTheme = () => ns.ui.setTheme(currentTheme)

	globalThis[\`\${id}-theme-id\`] = themeIdToApply

	doc.body.addEventListener('theme:preview', previewTheme)
	doc.body.addEventListener('theme:cancel-preview', resetTheme)
`,
	exit: () => `
			doc.body.removeEventListener('theme:preview', previewTheme)
			doc.body.removeEventListener('theme:cancel-preview', resetTheme)
`,
}
