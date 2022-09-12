module.exports = {
	globDirectory: 'js/',
	globPatterns: [
		'**/*.js'
	],
	swDest: 'js/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};