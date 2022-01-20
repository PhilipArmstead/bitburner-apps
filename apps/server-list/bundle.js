export default {
	imports: () => `
import { getServers } from "/gui/lib/servers.js"
`,
	main: () => `
	window[\`\${id}-ns\`] = ns
	window[\`\${id}-get-servers\`] = getServers
`,
	extractThemes: true,
}
