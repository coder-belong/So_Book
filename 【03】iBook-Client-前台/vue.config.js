module.exports = {
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'sass',
			patterns: []
		}
	},
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: []
		},
	},
	configureWebpack: {
		resolve: {
			// 在HTML模板中使用`路径别名`引入文件时，需要在别名前在`~`符号
			// 在JS中使用`路径别名`引入文件时，可以直接使用`路径别名`
			alias: {
				'src': '@',
				'components': '@/components',
				'content': 'components/content',
				'common': 'components/common',
				'assets': '@/assets',
				'network': '@/network',
				'views': '@/views',
			}
		}
	},
}
	