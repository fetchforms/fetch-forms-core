export default function createAlert(error) {
	const alertDiv = document.createElement("div");
	alertDiv.setAttribute("class", "fetch-alert");
	alertDiv.setAttribute("role", "alert");
	alertDiv.innerHTML = error.message || error || "There was an error fetching this form";
	return alertDiv;
}
