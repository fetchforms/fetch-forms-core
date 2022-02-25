export default function createSubmitButton(submitText) {
	let htmlButton = document.createElement("button");
	htmlButton.setAttribute("type", "submit");
	htmlButton.setAttribute("class", "fetch-submit-button");
	htmlButton.innerHTML = submitText;

	return htmlButton;
}
