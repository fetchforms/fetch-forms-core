import { getPermission } from "../auth/permission";

export default async function cloudSave(formSlug, body) {
	const resp = await window.fetch(`https://api.fetchforms.io/v1/form/${formSlug}/submission`, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${getPermission()}`,
		},
		body: JSON.stringify({ submission: body }),
	});

	if (resp.status === 204) {
		return { success: true };
	}
	const errorResp = await resp.json();
	throw {
		status: resp.status,
		message:
			(errorResp.error && errorResp.error.message) ||
			errorResp.error ||
			"There has been a problem saving your submission.",
	};
}
