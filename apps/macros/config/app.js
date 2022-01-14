const { project : { repositoryBranch, repositoryRaw } } = require('@bitburner-theme-browser/common-config')

const packageName = 'macros'
export const id = 'macros-app'
export const appFilePath = `${repositoryRaw}/${repositoryBranch}/apps/${packageName}/dist/main.js`
export const versionFilePath = `${repositoryRaw}/${repositoryBranch}/apps/${packageName}/dist/version.txt`
