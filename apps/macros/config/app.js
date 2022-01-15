import { project } from '@bitburner-theme-browser/common-config'

const { repositoryBranch, repositoryRaw } = project

const packageName = 'macros'
export default {
	id: 'macros-app',
	appFilePath: `${repositoryRaw}/${repositoryBranch}/apps/${packageName}/dist/main.js`,
	versionFilePath: `${repositoryRaw}/${repositoryBranch}/apps/${packageName}/dist/version.txt`,
}
