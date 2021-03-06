const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
	mode: "development",
	output: {
		filename: "[name].dev.js",
		path: path.resolve(__dirname, "public"),
	},
	devtool: "inline-source-map",
	devServer: {
		static: "./public",
		hot: true,
	},
});
