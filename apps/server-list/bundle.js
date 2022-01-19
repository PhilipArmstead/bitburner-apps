export default {
	imports: () => `
import { getServers } from "/gui/lib/servers.js"
`,
	main: () => `
	window[\`\${id}-server-list\`] = getServers(ns)
`,
	extractThemes: true,
}
