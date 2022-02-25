export default function createInput(fieldHtml, className) {
	var inputField = document.createElement("input");

	const htmlKeys = Object.keys(fieldHtml);
	for (let key of htmlKeys) {
		inputField.setAttribute(key, fieldHtml[key]);
	}

	inputField.setAttribute("class", className || "fetch-input");

	return inputField;
}
