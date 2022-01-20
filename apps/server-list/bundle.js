export default {
	imports: () => `
import { getServers } from "/gui/lib/servers.js"
`,
	main: () => `
	globalThis[\`\${id}-ns\`] = ns
	globalThis[\`\${id}-get-servers\`] = getServers
`,
	extractThemes: true,
}
