export default function createFieldError(fieldName) {
	const error = document.createElement("span");
	error.setAttribute("id", `${fieldName}_error`);
	error.setAttribute("class", "fetch-error-msg");
	return error;
}
