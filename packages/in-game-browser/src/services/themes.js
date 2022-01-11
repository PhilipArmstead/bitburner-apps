/**
 * @returns {
 * {preview: string, content: string, likes: number, downloads: number, author: string, name: *, submittedOn, id: number}[]
 * }
 */
export function getThemes () {
	// TODO: replace this with an API call
	const now = +new Date()
	const themeData = JSON.stringify({ 'primarylight':'#28CF28','primary':'#21A821','primarydark':'#177317','successlight':'#1CFF1C','success':'#16CA16','successdark':'#0D910D','errorlight':'#FF3B3B','error':'#C32D2D','errordark':'#8E2121','secondarylight':'#B3B3B3','secondary':'#838383','secondarydark':'#676767','warninglight':'#FFFF3A','warning':'#C3C32A','warningdark':'#8C8C1E','infolight':'#64CBFF','info':'#3399CC','infodark':'#246D91','welllight':'#404040','well':'#1C1C1C','white':'#C3C3C3','black':'#0A0B0B','hp':'#C62E2E','money':'#D6BB27','hack':'#ADFF2F','combat':'#E8EDCD','cha':'#8B5FAF','int':'#537CC8','rep':'#E8EDCD','disabled':'#5AB5A5','backgroundprimary':'#0C0D0E','backgroundsecondary':'#121415','button':'#252829' })
	return ['Light green', 'Dark blue', 'Cerulean', 'Midnight', 'White mode', 'High contrast', 'Pewter', 'testtest'].map((name) => (
		{
			id: 1,
			name,
			author: 'Jeff',
			content: themeData,
			preview: 'https://via.placeholder.com/150',
			submittedOn: +new Date(Math.random() * now),
			likes: Math.floor(Math.random() * 200),
			downloads: Math.floor(Math.random() * 500),
		}
	))
}
