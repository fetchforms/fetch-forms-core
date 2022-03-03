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

	switch (fieldJson.fieldType) {
		case "select":
			return [label, createSelect(fieldJson.fieldHtml, fieldJson.options), errorMsg];
		case "checkbox":
			return [createCheckbox(fieldJson.fieldHtml, fieldJson.label), errorMsg];
		case "radio":
			const radioGroupDiv = document.createElement("div");
			radioGroupDiv.setAttribute("class", "radio-group");
			radioGroupDiv.appendChild(label);
			createRadio(fieldJson.fieldHtml, fieldJson.options, radioGroupDiv);
			return [radioGroupDiv, errorMsg];
		case "textarea":
			return [label, createTextArea(fieldJson.fieldHtml), errorMsg];
		default:
			return [label, createInput(fieldJson.fieldHtml, null, fieldJson.format), errorMsg];
	}
}
