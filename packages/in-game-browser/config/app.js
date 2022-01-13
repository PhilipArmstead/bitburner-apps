// What the actual fuck is wrong with importing an ES module here?
// const { project : { repositoryBranch, repositoryRaw } } = require('@bitburner-theme-browser/common-config')

const repositoryRaw = 'https://raw.githubusercontent.com/PhilipArmstead/bitburner-theme-browser'
const repositoryBranch = 'master'

const packageName = 'in-game-browser'
export const id = 'theme-browser-app'
export const appFilePath = `${repositoryRaw}/${repositoryBranch}/packages/${packageName}/dist/main.js`
export const versionFilePath = `${repositoryRaw}/${repositoryBranch}/packages/${packageName}/dist/version.txt`
