import fetchFactory from "./fetchFactory";

export async function getForm(id) {
	return await fetchFactory(`form/${id}`);
}

export async function buildJsonForm(id, json) {
	return await fetchFactory(`build/${id}`, json);
}
