import { getForm } from "../api/forms";
import createFormItem from "./components/createFormItem";
import createSubmitButton from "./components/createSubmitButton";
import createAlert from "./components/createAlert";
import createHtmlForm from "./components/createHtmlForm";
import { createForm } from "final-form";
import { validate } from "./logic/validation";

export default async function useFetchForm(formId, elementId) {
	this.placement = document.getElementById(elementId);
	let fetchForm = {};
	let registered = {};

	try {
		fetchForm = await getForm(formId);
	} catch (err) {
		console.error("Error on useFetchForms", err);
		this.placement.appendChild(createAlert(err));
		return;
	}

	const validations = fetchForm.formItems.map((item) => ({
		name: item.name,
		rules: item.validation,
	}));

	const form = createForm({
		onSubmit,
		validate: (values) => {
			const errors = validate(values, validations);
			return errors;
		},
	});

	const htmlForm = createHtmlForm(formId);
	overrideSubmit(htmlForm, form);

	for (let i = 0; i < fetchForm.formItems.length; i++) {
		const formItemDiv = document.createElement("div");
		formItemDiv.setAttribute("class", "form-item");

		const formItems = await createFormItem(fetchForm.formItems[i]);
		formItems.forEach((item) => formItemDiv.appendChild(item));
		htmlForm.appendChild(formItemDiv);
	}

	const submitButton = createSubmitButton(fetchForm.submitText);
	htmlForm.appendChild(submitButton);

	this.placement.appendChild(htmlForm);

	[...htmlForm].forEach((input) => {
		if (input.name) {
			registerField(input);
		}
	});

	function registerField(input) {
		const { name } = input;
		form.registerField(
			name,
			(fieldState) => {
				const { blur, change, error, focus, touched, value } = fieldState;
				const errorElement = document.getElementById(name + "_error");
				if (!registered[name]) {
					// first time, register event listeners
					input.addEventListener("blur", () => blur());
					input.addEventListener("input", (event) =>
						change(input.type === "checkbox" ? event.target.checked : event.target.value)
					);
					input.addEventListener("focus", () => focus());
					registered[name] = true;
				}

				// update value
				if (input.type === "checkbox") {
					input.checked = value;
				} else {
					input.value = value === undefined ? "" : value;
				}

				// show/hide errors
				if (errorElement) {
					if (touched && error) {
						errorElement.innerHTML = error;
						errorElement.style.display = "block";
					} else {
						errorElement.innerHTML = "";
						errorElement.style.display = "none";
					}
				}
			},
			{
				value: true,
				error: true,
				touched: true,
			}
		);
	}
}

function overrideSubmit(htmlForm, form) {
	htmlForm.addEventListener("submit", function (event) {
		event.preventDefault();
		form.submit();
	});
}

function onSubmit(values) {
	window.alert(JSON.stringify(values, undefined, 2));
}
