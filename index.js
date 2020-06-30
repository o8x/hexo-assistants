const { parseWord , timeStatistics } = require("./utils.js");
require('./analysis')(hexo)
require('./articles')(hexo)

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
