const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
	mode: "production",
	output: {
		filename: "fetchforms.[name].prod.js",
		path: path.resolve(__dirname, "dist"),
	},
});
