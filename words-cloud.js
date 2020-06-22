const cloud = {
	parse(posts)
	{
		const result = []
		posts.map(it => it.tags.data.map(tag => {
			let tagIndex = null
			// 在结果集中寻找这个tag
			result.map((word , index) => {
				// 存在的话，把index返回掉
				if (tag.name.toLowerCase() === word.name) {
					return tagIndex = index
				}
			})

			// index 不存在，加入一条
			if (tagIndex === null) {
				return result.push({
					name: tag.name.toLowerCase() ,
					count: 1 ,
				})
			}

			// index 存在，给这条 + 1
			++result[tagIndex].count
		}))

		// 为结果集排序
		// return result.sort((a , b) => b.count - a.count).slice(0 , 30)
		return result.sort((a , b) => b.count - a.count).slice(0 , 30)
	} ,
	// 词云算法移植自 wordpress，原理是根据数量计算比例
	// 使文章最多的tag字体大小不超过 maxSize，最少的不低于 minSize
	render(posts)
	{
		tags = cloud.parse(posts)

		const maxCounts = tags[0].count
		const minCounts = tags[tags.length - 1].count
		const maxSize   = 30
		const minSize   = 16
		for (let tag of tags.sort(() => (Math.random() - 0.5))) {
			let spread = maxCounts - minCounts
			if (spread <= 0) {
				spread = 1
			}

			let fontSpread = maxSize - minSize
			if (fontSpread < 0) {
				fontSpread = 1
			}

			let step     = fontSpread / spread
			tag.fontsize = minSize + (tag.count - minCounts) * step
			tag.link     = `/tags/${tag.name}/`
		}

		return tags
	} ,
}

module.exports = cloud