import createInput from "../fields/createInput";
import createLabel from "../fields/createLabel";
import createRadio from "../fields/createRadio";
import createSelect from "../fields/createSelect";
import createTextArea from "../fields/createTextArea";

export default async function createFormItem(fieldJson) {
	const label = createLabel(fieldJson.label, fieldJson.name);

	if (fieldJson.fieldType == "select") {
		return [label, createSelect(fieldJson.fieldHtml, fieldJson.options)];
	} else if (fieldJson.fieldType == "checkbox") {
		return [createInput(fieldJson.fieldHtml), label];
	} else if (fieldJson.fieldType == "radio") {
		const radioGroupDiv = document.createElement("div");
		radioGroupDiv.setAttribute("class", "radio-group");
		radioGroupDiv.appendChild(label);
		radioGroupDiv.appendChild(createRadio(fieldJson.fieldHtml, fieldJson.options));
		return [radioGroupDiv];
	} else if (fieldJson.fieldType == "textarea") {
		return [label, createTextArea(fieldJson.fieldHtml)];
	} else {
		return [label, createInput(fieldJson.fieldHtml)];
	}
}
