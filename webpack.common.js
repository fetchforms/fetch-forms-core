const path = require("path");

module.exports = {
	entry: {
		app: "./src/index.js",
	},
	output: {
		filename: "fetchforms.js",
		library: "fetchforms",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				use: "babel-loader",
			},
		],
	},
	resolve: {
		extensions: [".js"],
	},
};
