import formatString from "format-string-by-pattern";

export function formatValue(template, fieldType, value) {
	if (!value) {
		return value;
	}

	if (!template && fieldType === "number") {
		return new Intl.NumberFormat().format(value);
	}

	// All items below this require a template
	if (!template) {
		return value;
	}

	if (template.includes("#")) {
		const formatted = formatString(template.replace(/[#\d]/g, "9"), value);
		// console.log(formatted);
		return formatted;
	} else if (template === "currency") {
		const onlyNumbers = value.replace(/[^\d]/g, "");
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(onlyNumbers);
	}

	return value;
}

export function getCSSFormat() {}
