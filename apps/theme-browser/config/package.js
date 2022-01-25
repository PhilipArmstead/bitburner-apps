import { project } from '@bitburner-theme-browser/common-config'

const { repositoryBranch, repositoryRaw } = project

const packageName = 'theme-browser'
export default {
	appFilePath: `${repositoryRaw}/${repositoryBranch}/dist/${packageName}/main.js`,
	versionFilePath: `${repositoryRaw}/${repositoryBranch}/dist/${packageName}/version.txt`,
}
