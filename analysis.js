const {wordcount} = require('./utils.js')

module.exports = hexo => {
	hexo.extend.helper.register('analysis' , (posts) => {
		let wordsCount = 0
		posts.map(it => wordsCount += wordcount(it.content))
		return {
			postsCount: posts.length ,
			wordsCount ,
		}
	})

	hexo.extend.generator.register('analysis' , ({posts}) => {
		return {
			path: 'analysis/index.html' ,
			data: posts ,
			layout: ['analysis'] ,
		}
	})
}
