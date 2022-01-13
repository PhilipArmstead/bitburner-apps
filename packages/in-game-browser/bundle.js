// TODO: change these to be hooks
// TODO: move the theme variables and apply logic to "immediate" hook

/** @return {String} */
export const appEntry = () => `
	// App-specific setup
	const currentTheme = ns.ui.getTheme()
	const previewTheme = ({ detail }) => {
		try {
			ns.ui.setTheme(JSON.parse(detail))
		} catch (e) {
			console.log(e)
		}
	}
	const resetTheme = () => ns.ui.setTheme(currentTheme)

	const themeToApply = ns.flags([['apply', ""]]).apply
	if (themeToApply) {
		return previewTheme({ detail: themeToApply })
	}

	doc.body.addEventListener('theme:preview', previewTheme)
	doc.body.addEventListener('theme:cancel-preview', resetTheme)

	mount()

	while (doc.getElementById(id)) {
		await ns.asleep(2000)
	}
`

export const onExit = () => `
		doc.body.removeEventListener('theme:preview', previewTheme)
		doc.body.removeEventListener('theme:cancel-preview', resetTheme)
`
