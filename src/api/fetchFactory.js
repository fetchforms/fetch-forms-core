import { getPermission } from "../auth/permission";

export default async function fetchFactory(endpoint, body) {
	const resp = await window.fetch(`https://api.fetchforms.io/v1/${endpoint}`, {
		method: "GET",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${getPermission()}`,
		},
		body: JSON.stringify(body),
	});
	const temp = await resp.json();

	if (!temp.success) {
		throw {
			status: resp.status,
			message: (temp.error && temp.error.message) || temp.error || "There has been a problem fetching your form",
		};
	}
	return temp.data;
}
