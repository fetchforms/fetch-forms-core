export default function createSuccessMessage(message) {
	const messageDiv = document.createElement("div");
	messageDiv.setAttribute("class", "fetch-alert");
	messageDiv.setAttribute("role", "message");
	messageDiv.innerHTML = message;
	return messageDiv;
}
