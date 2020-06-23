module.exports = hexo => {
	hexo.extend.helper.register('recendArticles' , (posts , count = 10) => {
		for (let post of posts) {
			post.timestamp = new Date(post.date.toString()).getTime()
		}

		return posts.sort((a , b) => b.timestamp - a.timestamp).slice(0 , 10)
	})
}
