// 过滤掉标签
function parseWord(contents)
{
	return contents.replace(/<[^>]+>/g , '').replace(/\n/g , '')
}

// 过滤出单词
function usenFilter(content)
{
	const result = content.replace(/\p{Unified_Ideograph}/ug , '').match(/[\w\-]+/g)
	return result ? result : []
}

// 过滤出汉字
function hansFilter(content)
{
	const result = content.match(/\p{Unified_Ideograph}/ug , '')
	return result ? result : []
}

// 分析阅读时间
function timeStatistics(content)
{
	content        = parseWord(content)
	let wordscount = usenFilter(content).length + hansFilter(content).length
	let time       = wordscount / 350
	let similars   = {
		1: '品一杯茶' ,
		2: '在标准操场跑一圈' ,
		3: '喝一杯咖啡' ,
		4: '一个法式湿吻' ,
		5: '听一首歌' ,
		10: '读5-6页书' ,
		15: '做一次爱' ,
		20: '一次午餐' ,
		30: '跑5公里' ,
		45: '上一节课' ,
		60: '一个香甜的午觉' ,
	}

	if (time < 1) {
		time = 1
	}

	let segment = String(time).split('.')
	let similar = `${segment[0]}分钟`
	if (similars[segment[0]]) {
		similar = similars[segment[0]] + '的时间'
	} else {
		if (segment[1] && segment[1] >= 0.5) {
			similar = `${segment[0]}分半钟`
		}
	}

	return {
		wordscount ,
		similar,
	}
}

// 生成QQ分享链接
hexo.extend.helper.register('qqLink' , post => {
	const queryString = {
		url: 'https://println.org/' + encodeURI(post.path) ,
		title: post.title ,
		source: 'Alex\'s site' ,
		desc: '' ,
		pics: 'https://println.org/images/logo512.png' ,
		summary: parseWord(post.content).substring(0 , 150) + '...' ,
	}

	const query = new URLSearchParams(queryString).toString()
	return `http://connect.qq.com/widget/shareqq/index.html?${query}`
})

// 生成微博分享链接
hexo.extend.helper.register('weiboLink' , () => {
	return `javascript:void((function(s,d,e){try{}catch(e){}var f='http://service.weibo.com/share/share.php?',u=d.location.href,p=['url=',e(u),'&title=',e(d.title),'&appkey=2924220432'].join('');function a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(s.width-620)/2,',top=',(s.height-450)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else{a()}})(screen,document,encodeURIComponent));`
})

// 分析阅读时间
hexo.extend.helper.register('timeStatistics' , timeStatistics)

// 渲染阅读时间
hexo.extend.helper.register('renderTimeStatistics' , content => {
	const {wordscount , similar}= timeStatistics(content)
	return ` 全文共${wordscount}个字，阅读大约需要${similar}`
})
