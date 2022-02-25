import createInput from "./createInput";
import createLabel from "./createLabel";

export default function createRadio(fieldHtml, options) {
	const radio = document.createElement("div");
	radio.setAttribute("class", "radio-group");

	for (let i = 0; i < options.length; i++) {
		const groupDiv = document.createElement("div");
		groupDiv.setAttribute("class", "fetch-input-group");

		const inputDiv = document.createElement("div");
		inputDiv.setAttribute("class", "input-group-field");
		inputDiv.appendChild(
			createInput({ ...fieldHtml, value: options[i].value, id: options[i].value }, "fetch-radio")
		);
		groupDiv.appendChild(inputDiv);

		const labelDiv = document.createElement("div");
		labelDiv.setAttribute("class", "input-group-label");
		labelDiv.appendChild(createLabel(options[i].label, options[i].value));
		groupDiv.appendChild(labelDiv);

		radio.appendChild(groupDiv);
	}

	return radio;
}
