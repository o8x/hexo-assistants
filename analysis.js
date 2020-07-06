const {wordcount} = require('./utils.js')
const cloud       = require('./words-cloud')

module.exports = hexo => {
	hexo.extend.helper.register('analysis' , (posts) => {
		let wordsCount = 0
		posts.map(it => wordsCount += wordcount(it.content))
		return {
			postsCount: posts.length ,
			wordsCount ,
		}
	})

	hexo.extend.helper.register('renderCloud' , cloud.render)
}
