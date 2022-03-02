module.exports = {
	entry: {
		app: "./src/index.js",
	},
	output: {
		filename: "fetchforms.js",
		library: "fetchforms",
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
				use: ["style-loader", "css-loader", "sass-loader"],
			},
		],
	},
	resolve: {
		extensions: [".js"],
	},
};
