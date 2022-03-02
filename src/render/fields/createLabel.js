export default function createLabel(label, fieldName, noMargin) {
	const htmlLabel = document.createElement("label");
	htmlLabel.setAttribute("for", fieldName);
	htmlLabel.setAttribute("class", "fetch-label");
	if (noMargin) {
		htmlLabel.classList.add("no-margin");
	}
	htmlLabel.innerHTML = label;

	return htmlLabel;
}
