const stylesheetId = 'theme-variables'

module.exports = `
	// Extract current theme as CSS varibles for apps
	let stylesheet = doc.getElementById('${stylesheetId}')
	if (!stylesheet) {
		stylesheet = doc.createElement('style')
		stylesheet.id = '${stylesheetId}'
		doc.head.insertAdjacentElement('beforeend', stylesheet)
	}

	stylesheet.innerHTML = \`:root {
		--font-family: \${getComputedStyle(doc.querySelector('p'))['font-family']};
\${Object.entries(ns.ui.getTheme()).map(([key, value]) => \`--\${key}: \${value};\`).join('\\n')}
	}\`
`

// TODO: reinstate this when the browser version is updated
// 		--font-family: "${ns.ui.getStyles().fontFamily.replaceAll(/, /g, '", "')}";
