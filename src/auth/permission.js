let permission = null;

async function setPermission(token) {
	permission = token.repeat(1);
}

function getPermission() {
	return permission;
}

export { setPermission, getPermission };
