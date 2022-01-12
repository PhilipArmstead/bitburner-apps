/**
 * @param {String} versionFilename
 * @param {String} version
 * @returns {{apply: String, generateBundle(): void, name: String, enforce: String}}
 */
module.exports = (versionFilename, version) => {
	return {
		apply: 'build',
		enforce: 'post',
		name: 'output-version',
		generateBundle () {
			this.emitFile({
				type: 'asset',
				fileName: versionFilename,
				source: version,
			})
		},
	}
}
