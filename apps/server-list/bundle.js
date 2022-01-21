export default {
	main: () => `
	globalThis[\`\${id}-ns\`] = ns
`,
	keepAlive: true,
}
