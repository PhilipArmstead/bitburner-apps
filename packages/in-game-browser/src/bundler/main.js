/** @return {String} */
export default () => `
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

	doc.body.addEventListener('theme:preview', previewTheme)
	doc.body.addEventListener('theme:cancel-preview', resetTheme)

	mount()

	ns.atExit(() => {
		doc.getElementById(id)?.remove()
		doc.body.removeEventListener('theme:preview', previewTheme)
		doc.body.removeEventListener('theme:cancel-preview', resetTheme)
	})

	while (doc.getElementById(id)) {
		await ns.asleep(2000)
	}
`