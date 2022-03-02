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
			{
				test: /\.s[ac]ss$/i,
				exclude: /(node_modules)/,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
		],
	},
	resolve: {
		extensions: [".js"],
	},
};
