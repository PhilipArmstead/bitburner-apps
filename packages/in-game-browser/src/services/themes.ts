export function getThemes () {
	// TODO: replace this with an API call
	const now = +new Date()
	return ['Light green', 'Dark blue', 'Cerulean', 'Midnight', 'White mode', 'High contrast', 'Pewter', 'testtest'].map((name) => ({
		id: 1,
		name,
		author: 'Jeff',
		themeData: '{primary: red}',
		preview: 'https://via.placeholder.com/150',
		submittedOn: +new Date(Math.random() * now),
		like: Math.floor(Math.random() * 200),
		downloads: Math.floor(Math.random() * 500),
	}))
}
