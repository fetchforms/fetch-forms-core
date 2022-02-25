export default function createLabel(label, fieldName) {
	const htmlLabel = document.createElement("label");
	htmlLabel.setAttribute("for", fieldName);
	htmlLabel.innerHTML = label;

	return htmlLabel;
}
