const similars = require('./similars')

const utils = {
	// 过滤掉标签解析出文章的文字
	parseWord(contents) {
		return contents.replace(/<[^>]+>/g, '').replace(/\n/g, '')
	},

	// 过滤出单词
	usenFilter(content) {
		// 有一些bug，这里会把一整行英语认为是一个单词，造成统计数量过少的问题
		const result = content.replace(/\p{Unified_Ideograph}/ug, '').match(/[\w\-]+/g)
		return result ? result : []
	},

	// 过滤出汉字
	hansFilter(content) {
		const result = content.match(/\p{Unified_Ideograph}/ug, '')
		return result ? result : []
	},

	// 统计文字数量
	wordcount(content) {
		content = utils.parseWord(content)
		return utils.usenFilter(content).length + utils.hansFilter(content).length
	},

	// 分析阅读时间
	timeStatistics(content) {
		let wordscount = utils.wordcount(content)
		let time = wordscount / 350

		if (time < 1) {
			time = 0
		}

		// 拆分字符串
		let segment = String(time).split('.')
		// 还原成 0.xxxx 
		segment[1] = Number(`0.${segment[1]}`);

		// 如果是 1.5 就处理成 2
		if (segment[1] && segment[1] >= 0.5) {
			++segment[0]
		}

		// 初始化默认值
		let similar = `${segment[0]}分钟`
		if (similars[segment[0]]) {
			similar = similars[segment[0]] + '的时间'
		} else {
			if (segment[1] && segment[1] >= 0.5) {
				similar = `${segment[0]}分半钟`
			}
		}

		return {
			wordscount,
			similar,
		}
	}
}

module.exports = utils