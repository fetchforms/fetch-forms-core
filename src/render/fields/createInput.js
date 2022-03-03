export default function createInput(fieldHtml, className, format) {
	const cssFormatClass = format && format.includes("#") ? null : format;
	var inputField = document.createElement("input");

	const htmlKeys = Object.keys(fieldHtml);
	for (let key of htmlKeys) {
		inputField.setAttribute(key, fieldHtml[key]);
	}

	inputField.setAttribute("class", className || `fetch-input ${cssFormatClass}`);
	if (format) {
		inputField.setAttribute("type", "text");
	}

	return inputField;
}
