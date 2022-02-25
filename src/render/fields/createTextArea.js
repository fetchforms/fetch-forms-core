export default function createTextArea(fieldHtml) {
	var textArea = document.createElement("textarea");

	const htmlKeys = Object.keys(fieldHtml);
	for (let key of htmlKeys) {
		textArea.setAttribute(key, fieldHtml[key]);
	}
	textArea.setAttribute("class", "fetch-input");

	return textArea;
}
