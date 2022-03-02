import { getForm } from "../api/forms";
import createFormItem from "./components/createFormItem";
import createSubmitButton from "./components/createSubmitButton";
import createAlert from "./components/createAlert";
import createHtmlForm from "./components/createHtmlForm";
import { createForm } from "final-form";
import { validate } from "./logic/validation";
import registerField from "./logic/registerField";
import "../styles/fetch-forms.scss";

export default async function createFetchForm(formId, onCompleteCallback, onDataCallback) {
	const currentScript = document.currentScript;
	const placement = document.createElement("div");
	placement.setAttribute("class", "fetch-form");
	let fetchForm;
	let submitButton;

	try {
		fetchForm = await getForm(formId);
		onDataCallback({ name: fetchForm.name, id: fetchForm.id, version: fetchForm.version });
	} catch (err) {
		console.error("Error on render form", err);
		placement.appendChild(createAlert(err));
		return;
	}

	const validations = fetchForm.formItems.map((item) => ({
		name: item.name,
		rules: item.validation,
	}));

	const form = createForm({
		onSubmit,
		validate: (values) => {
			return validate(values, validations);
		},
	});

	const htmlForm = createHtmlForm(formId);
	overrideSubmit(htmlForm, form);

	for (let i = 0; i < fetchForm.formItems.length; i++) {
		const formItem = await createFormItem(fetchForm.formItems[i]);
		htmlForm.appendChild(formItem);
	}

	submitButton = createSubmitButton(fetchForm.submitText);
	htmlForm.appendChild(submitButton);

	[...htmlForm].forEach((input) => registerField(input, fetchForm.formItems, form));

	placement.appendChild(htmlForm);
	currentScript.after(placement);

	async function onSubmit(values) {
		submitButton.setAttribute("disabled", "disabled");

		document.getElementById("fetch_form_result").innerHTML = "";
		const formattedValues = {
			...values,
		};

		const valueKeys = Object.keys(values);
		for (let i = 0; i < valueKeys.length; i++) {
			const field = fetchForm.formItems.find((item) => item.name === valueKeys[i]);

			if (field.fieldType === "number") {
				formattedValues[valueKeys[i]] = parseInt(values[valueKeys[i]]);
			} else {
				formattedValues[valueKeys[i]] = values[valueKeys[i]];
			}
		}

		try {
			if (fetchForm.cloudSave) {
				const isSaved = await doCloudSubmit(fetchForm.id, formattedValues);
				if (!isSaved.success) {
					throw isSaved.message;
				}
			}

			if (onComplete) {
				const hasError = await onCompleteCallback(formattedValues);
				if (hasError) {
					throw hasError;
				}
			}
		} catch (err) {
			console.log(err);
			placement.appendChild(createAlert(err));
		}
		submitButton.removeAttribute("disabled");
	}
}

function overrideSubmit(htmlForm, form) {
	htmlForm.addEventListener("submit", function (event) {
		event.preventDefault();
		form.submit();
	});
}
