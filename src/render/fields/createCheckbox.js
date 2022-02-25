import createInput from "./createInput";
import createLabel from "./createLabel";

export default function createCheckbox(fieldHtml) {
	const checkbox = document.createElement("div");
	checkbox.setAttribute("class", "fetch-input-group");

	const inputDiv = document.createElement("div");
	inputDiv.setAttribute("class", "input-group-field");
	inputDiv.appendChild(createInput(fieldHtml, "fetch-checkbox"));
	checkbox.appendChild(inputDiv);

	const labelDiv = document.createElement("div");
	labelDiv.setAttribute("class", "input-group-label");
	labelDiv.appendChild(createLabel(option.label, option.value));
	checkbox.appendChild(labelDiv);

	return checkbox;
}
