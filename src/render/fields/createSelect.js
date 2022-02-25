export default function createSelect(fieldHtml, options) {
	const selectField = document.createElement("select");

	const htmlKeys = Object.keys(fieldHtml);
	for (let key of htmlKeys) {
		selectField.setAttribute(key, fieldHtml[key]);
	}

	// Add an empty option as the first one
	const defaultOption = document.createElement("option");
	defaultOption.value = "";
	defaultOption.innerHTML = "";
	selectField.appendChild(defaultOption);
	selectField.setAttribute("class", "fetch-input");

	for (let i = 0; i < options.length; i++) {
		const opt = document.createElement("option");
		opt.value = options[i].value;
		opt.innerHTML = options[i].label;
		selectField.appendChild(opt);
	}

	return selectField;
}
