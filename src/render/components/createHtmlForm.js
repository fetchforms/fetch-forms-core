export default function createHtmlForm(fetchFormId) {
	const htmlForm = document.createElement("form");
	htmlForm.setAttribute("id", fetchFormId);
	htmlForm.setAttribute("method", "post");
	htmlForm.setAttribute("novalidate", "true");

	return htmlForm;
}
