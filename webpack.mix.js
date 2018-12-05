const path = require('path');
const { mix } = require('laravel-mix');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isHMR = process.env.npm_lifecycle_event === 'hot';

// JS files compiling using laravel-mix and react babel presets
mix.react('resources/assets/js/admin/main.js', 'public/admin')
	.react('resources/assets/js/frontend/main.js', 'public/frontend');

/** With this we can extract sass code imported in react components **/
const rulesConfig = () => {
	const rulesArray = [];

	// ExtractTextPlugin breaks css HMR
	// Default behaviour is configured for vue in node_modules
	if (!isHMR) {
		rulesArray.push({
			test: /\.s[ac]ss$/,
			exclude: [], // Fix for newer versions because of webpack-merge usage behind the scenes
			loader: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
					}
				]
			})
		});
	}

	return rulesArray;
};

// SASS/SCSS webpack loader rules
// Configure dev server and HMR
mix.webpackConfig({
	// Make imports a bit more "pretty"
	resolve: {
		extensions: ['.js', '.json', '.sass', '.scss', '.css'],
		alias: {
			'root': path.resolve(__dirname, './resources/assets/js'),
			'admin': path.resolve(__dirname, './resources/assets/js/admin'),
			'frontend': path.resolve(__dirname, './resources/assets/js/frontend'),
		},
	},
	module: {
		rules: rulesConfig(),
	},
	plugins: [
		new ExtractTextPlugin({
			filename: '[name].css',
			allChunks: true,
		}),
	],
	devServer: {
		hot: true, // this enables hot reload
		inline: true, // use inline method for hmr
		port: 8080,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		contentBase: path.resolve(__dirname, 'public'),
		watchOptions: {
			exclude: [
				/bower_components/,
				/node_modules/,
			],
		},
	},
	node: {
		fs: 'empty',
		module: 'empty',
	},
	devtool: 'source-map',
})
.sourceMaps()
// Comment this line if you want be notified on every change
.disableNotifications();

// Apply HMR fix
// https://github.com/JeffreyWay/laravel-mix/issues/1483
Mix.listen('configReady', (webpackConfig) => {
	if (Mix.isUsing('hmr')) {
		// Remove leading '/' from entry keys
		webpackConfig.entry = Object.keys(webpackConfig.entry).reduce((entries, entry) => {
			entries[entry.replace(/^\//, '')] = webpackConfig.entry[entry];
			return entries;
		}, {});

		// Remove leading '/' from ExtractTextPlugin instances
		webpackConfig.plugins.forEach((plugin) => {
			if (plugin.constructor.name === 'ExtractTextPlugin') {
				plugin.filename = plugin.filename.replace(/^\//, '');
			}
		});
	}
});

// Versioning/Cache Busting
// Version does not work in hmr mode
if (!isHMR) {
	mix.version();
}

// Don't process image files in sass
// Images paths are written relative to compiled CSS
mix.options({
	extractVueStyles: false,
	processCssUrls: false
});
