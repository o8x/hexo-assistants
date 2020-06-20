const cloud = {
	parse(posts)
	{
		const result = []
		posts.map(it => it.tags.data.map(tag => {
			let tagIndex = null
			// 在结果集中寻找这个tag
			result.map((word , index) => {
				// 存在的话，把index返回掉
				if (tag.name.toLowerCase() === word.text) {
					return tagIndex = index
				}
			})

			// index 不存在，加入一条
			if (tagIndex === null) {
				return result.push({
					text: tag.name.toLowerCase() ,
					size: 1 ,
				})
			}

			// index 存在，给这条 + 1
			++result[tagIndex].size
		}))

		// 为结果集排序
		return result.sort((a , b) => b.size - a.size).slice(0 , 30)
	} ,
	render(posts)
	{
		const data = JSON.stringify(cloud.parse(posts))

		return `
<script src="http://static.popodv.com/dvlibs/d3/d3.v3.min.js"></script>
<script src="http://static.popodv.com/dvlibs/d3/d3.layout.cloud.js"></script>
<script src="http://static.popodv.com/dvlibs/tool/jquery.min.js"></script>
<style>
	html , body , #container {
		width:100%;
		height:100%;
		margin:0;
		padding:0;
	}
</style>
<div id="container"></div>
<script>
var fill = d3.scale.category20();
function draw(words) {
	d3.select("#container").append("svg")
		.attr("width", '100%').attr("height", 600)
		.attr("class", "wordcloud")
		.append("g")
		.attr("transform", "translate(320,200)")
		.attr("width",600)
		.attr("height",600)
		.selectAll("text")
		.data(words)
		.enter().append("text")
		.style("font-size", function (d) { return d.size + "px"; })
		.style("fill", function (d, i) { return fill(i); })
		.style("font-family", "黑体")
		.attr("transform", function (d) {
			return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		})
		.text(function (d) { return d.text; });
}

	d3.scale.linear()
	.domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100])
	.range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);
	d3.layout.cloud()
	.words(${data})
	.padding(2)
	.rotate(0)
	.fontSize(function (d) { 
		return d.size + 12; 
	})
	.on("end", draw)
	.start();
	
</script>
`
	} ,
}

module.exports = cloud
