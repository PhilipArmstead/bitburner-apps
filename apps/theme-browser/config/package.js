import { project } from '@bitburner-theme-browser/common-config'

const { repositoryBranch, repositoryRaw } = project

const packageName = 'theme-browser'
export default {
	appFilePath: `${repositoryRaw}/${repositoryBranch}/apps/${packageName}/dist/main.js`,
	versionFilePath: `${repositoryRaw}/${repositoryBranch}/apps/${packageName}/dist/version.txt`,
}
