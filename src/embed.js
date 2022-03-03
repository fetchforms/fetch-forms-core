import "./styles/fetch-forms.scss";
import { setPermission } from "./auth/permission";
import createFetchForm from "./render/index";

// auto-run the script
export default (async function () {
	const currentScript = document.currentScript;
	const dataAttrs = currentScript.dataset;
	const placement = document.createElement("div");
	const placementId = `fetch-form-${dataAttrs.slug}`;

	// Add the div to the page
	placement.setAttribute("id", placementId);
	currentScript.after(placement);
	setPermission(dataAttrs.permission);

	const onCompleteCallback = (data) =>
		currentScript.dispatchEvent(
			new CustomEvent("onFetchFormComplete", {
				bubbles: true,
				detail: () => data,
			})
		);
	const onDataCallback = (data) =>
		currentScript.dispatchEvent(
			new CustomEvent("onFetchFormLoad", {
				bubbles: true,
				detail: () => data,
			})
		);

	await createFetchForm(dataAttrs.slug, placementId, onCompleteCallback, onDataCallback);
})();
