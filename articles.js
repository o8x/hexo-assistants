function sortBy(posts , property , count = 10) {
	for (let post of posts) {
		post.timestamp = new Date(post[property].toString()).getTime()
	}

	return posts.sort((a , b) => b.timestamp - a.timestamp).slice(0 , count)
}

module.exports = hexo => {
	// 最近发布的文章
	hexo.extend.helper.register('recendPublished' , (posts , count = 10) => sortBy(posts , 'date' , count))

	// 最近更新的文章
	hexo.extend.helper.register('recendUpdated' , (posts , count = 10) => sortBy(posts , 'updated' , count))
}
