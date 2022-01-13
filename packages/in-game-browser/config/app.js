const { project : { repositoryBranch, repositoryRaw } } = require('@bitburner-theme-browser/common-config')

const packageName = 'in-game-browser'
export const id = 'theme-browser-app'
export const appFilePath = `${repositoryRaw}/${repositoryBranch}/packages/${packageName}/dist/main.js`
export const versionFilePath = `${repositoryRaw}/${repositoryBranch}/packages/${packageName}/dist/version.txt`
