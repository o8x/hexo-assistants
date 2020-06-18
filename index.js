hexo.load().then(() => {
	hexo.locals.invalidate()
	hexo.extend.generator.register('analysis' , locals => {
		return {
			path: 'analysis/index.html' ,
			data: locals.posts ,
			layout: ['analysis'] ,
		}
	})

	let sum   = 0
	let posts = hexo.locals.get('posts')
	for (let it of posts.data) {
		let chineseReg = /\p{Unified_Ideograph}/ug

		// 过滤掉标签
		let contents = it.content ? it.content : it._content
		contents     = contents.replace(/<[^>]+>/g , '')

		// 统计文字数量
		// 英文按单词数计算
		let english  = contents.replace(chineseReg , '').match(/[\w\-]+/g)
		let hans     = contents.match(chineseReg , '')
		it.charCount = (english ? english.length : 0) + (hans ? hans.length : 0)

		sum += it.charCount

		// 生成分享链接
		const queryString = {
			url: 'https://println.org/' + encodeURI(it.path) ,
			title: it.title ,
			source: 'Alex\'s site' ,
			desc: '' ,
			pics: 'https://println.org/images/logo512.png' ,
			summary: contents.substring(0 , 150) + '...' ,
		}

		const query = new URLSearchParams(queryString).toString()
		it.qqLink   = `http://connect.qq.com/widget/shareqq/index.html?${query}`
	}

	console.log(`本站目前共 ${posts.data.length} 篇文章，共计 ${sum} 个字`)
	hexo.locals.set('posts' , () => posts)
})
