import { getForm } from "../api/forms";
import createFormItem from "./logic/createFormItem";
import createSubmitButton from "./logic/createSubmitButton";

export default async function useFetchForm(formId, elementId) {
	let fetchForm;
	try {
		fetchForm = await getForm(formId);
	} catch (err) {
		console.error("Error on useFetchForms", err);
		// set element to show error;
		return;
	}

	const htmlForm = document.createElement("form");
	htmlForm.setAttribute("id", fetchForm.id);
	htmlForm.setAttribute("method", "post");
	htmlForm.setAttribute("class", "fetch-form");
	watchForSubmit(htmlForm);

	for (let i = 0; i < fetchForm.formItems.length; i++) {
		const formItemDiv = document.createElement("div");
		formItemDiv.setAttribute("class", "form-item");

		const formItems = await createFormItem(fetchForm.formItems[i]);
		formItems.forEach((item) => formItemDiv.appendChild(item));
		htmlForm.appendChild(formItemDiv);
	}

	const submitButton = createSubmitButton(fetchForm.submitText);
	htmlForm.appendChild(submitButton);

	const placement = document.getElementById(elementId);
	placement.appendChild(htmlForm);
}

function watchForSubmit(htmlForm) {
	htmlForm.addEventListener("submit", function (event) {
		event.preventDefault();
		console.log("Form elements", htmlForm.elements);
	});
}
