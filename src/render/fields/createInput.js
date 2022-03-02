export default function createInput(fieldHtml, className, hasFormat) {
	var inputField = document.createElement("input");

	const htmlKeys = Object.keys(fieldHtml);
	for (let key of htmlKeys) {
		inputField.setAttribute(key, fieldHtml[key]);
	}

	inputField.setAttribute("class", className || "fetch-input");
	if (hasFormat) {
		inputField.setAttribute("type", "text");
	}

	return inputField;
}
