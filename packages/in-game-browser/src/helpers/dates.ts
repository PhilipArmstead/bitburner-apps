export function formatDate(ts: DOMTimeStamp) : String {
	return new Date(ts).toLocaleDateString()
}
