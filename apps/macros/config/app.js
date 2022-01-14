// What the actual fuck is wrong with importing an ES module here?
// const { project : { repositoryBranch, repositoryRaw } } = require('@bitburner-theme-browser/common-config')

const repositoryRaw = 'https://raw.githubusercontent.com/PhilipArmstead/bitburner-apps'
const repositoryBranch = 'master'

// TODO: calculate this + path from root to dist with node Path
const packageName = 'macros'
export const id = 'macros-app'
export const appFilePath = `${repositoryRaw}/${repositoryBranch}/apps/${packageName}/dist/main.js`
export const versionFilePath = `${repositoryRaw}/${repositoryBranch}/apps/${packageName}/dist/version.txt`
