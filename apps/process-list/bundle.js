export default {
	main: () => `
	const directories = ns.getRunningScript().filename.split('/')
	const currentDirectory = directories.length === 1 ? '' : \`/\${directories.slice(1, directories.length - 1).join('/')}/\`
	const configFilename = \`\${currentDirectory}config.txt\`
	let config = {}

	if (ns.fileExists(configFilename)) {
		try {
			config = JSON.parse(ns.read(configFilename)).processList
		} catch (e) {
			return ns.tprint(e.message)
		}
	} else {
		ns.tprint(\`No config file was detected (tried \${configFilename})\`)
	}

	globalThis[\`\${id}-process-list\`] = config
`,
	extractThemes: true,
}
