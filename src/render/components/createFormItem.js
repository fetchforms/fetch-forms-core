import createCheckbox from "../fields/createCheckbox";
import createInput from "../fields/createInput";
import createLabel from "../fields/createLabel";
import createRadio from "../fields/createRadio";
import createSelect from "../fields/createSelect";
import createTextArea from "../fields/createTextArea";
import createFieldError from "./createFieldError";

export default async function createFormItem(fieldJson) {
	const formItemDiv = document.createElement("div");
	formItemDiv.setAttribute("class", "fetch-form-item");

	const formItems = buildField(fieldJson);
	formItems.forEach((item) => formItemDiv.appendChild(item));

	return formItemDiv;
}

function buildField(fieldJson) {
	const label = createLabel(fieldJson.label, fieldJson.name);
	const errorMsg = createFieldError(fieldJson.fieldHtml.name);

	if (fieldJson.fieldType == "select") {
		return [label, createSelect(fieldJson.fieldHtml, fieldJson.options), errorMsg];
	} else if (fieldJson.fieldType == "checkbox") {
		return [createCheckbox(fieldJson.fieldHtml, fieldJson.label), errorMsg];
	} else if (fieldJson.fieldType == "radio") {
		const radioGroupDiv = document.createElement("div");
		radioGroupDiv.setAttribute("class", "radio-group");
		radioGroupDiv.appendChild(label);
		createRadio(fieldJson.fieldHtml, fieldJson.options, radioGroupDiv);
		return [radioGroupDiv, errorMsg];
	} else if (fieldJson.fieldType == "textarea") {
		return [label, createTextArea(fieldJson.fieldHtml), errorMsg];
	} else {
		return [label, createInput(fieldJson.fieldHtml, null, !!fieldJson.format), errorMsg];
	}
}
