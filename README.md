hexo-analysis
======

> 一个 hexo 内容分析插件

## 调用
### 获取结果集
```javascript
const result = timeStatistics(item.content)

// 返回值
{
    wordscount: 666, 
    similar: '品一杯茶的时间' 
}
```

### 渲染结果集
```javascript
const result = renderTimeStatistics(item.content)

// 返回值
// 全文共666个字，阅读大约需要品一杯茶的时间
```

### 在pug中调用
```pug
if is_detail
    p=renderTimeStatistics(item.content)
```

## 效果图
![](https://alextech-1252251443.cos.ap-guangzhou.myqcloud.com/20200618173058.png)