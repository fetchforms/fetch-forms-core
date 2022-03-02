import { formatValue } from "../logic/formatting";
let registered = {};

export default function registerField(input, fetchFields, form) {
	if (!input.name) {
		return;
	}

	const field = fetchFields.find((field) => field.name === input.name);
	if (input.type === "radio") {
		addFieldToForm(input, field.options, form);
	} else {
		addFieldToForm(input, field, form);
	}
}

function addFieldToForm(input, field, form) {
	const { id, name } = input;

	form.registerField(
		name,
		(fieldState) => {
			const { blur, change, error, focus, touched, value } = fieldState;
			const errorElement = document.getElementById(name + "_error");
			if (!registered[id]) {
				// first time, register event listeners
				input.addEventListener("blur", () => blur());
				input.addEventListener("input", (event) => {
					formatInputValue(event.target, change);
				});
				input.addEventListener("change", (event) => {
					formatInputValue(event.target, change);
				});
				input.addEventListener("focus", () => focus());
				registered[id] = true;
			}

			// update value
			if (input.type === "checkbox") {
				input.checked = value;
			} else if (input.type === "radio") {
				input.value = input.value;
			} else {
				input.value = value === undefined ? "" : formatValue(field.format, field.fieldType, value);
			}

			// show/hide errors
			if (errorElement) {
				if (touched && error) {
					errorElement.innerHTML = error;
					errorElement.classList.add("show");
					input.classList.add("fetch-has-error");
				} else {
					errorElement.innerHTML = "";
					errorElement.classList.remove("show");
					input.classList.remove("fetch-has-error");
				}
			}
		},
		{
			value: true,
			error: true,
			touched: true,
		}
	);

	function formatInputValue(target, change) {
		if (input.type === "checkbox") {
			change(target.checked);
		} else if (field.fieldType === "number") {
			change(target.value.replace(/[^\d]/g, ""));
		} else {
			change(target.value);
		}
	}
}
