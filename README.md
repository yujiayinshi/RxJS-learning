# RxJS-learning
learn RxJS

## [RxJS](http://reactivex.io/rxjs/)

RxJS是什么？能解决什么问题？

官方的解释是：RxJS is a library for composing asynchronous and event-based programs by using observable sequences。

RxJS是通过使用可观察序列来组合异步和基于事件的程序的库。

简单来说，RxJS解决异步和事件组合的问题。

## 重要概念

Observable：RxJS中最核心的一个数据类型。

Observable 其实就是一个 异步的数组，数组 + 时间轴 = Observable。

[参考文章](http://www.open-open.com/lib/view/open1474960866599.html)

Observer: 是一个回调的集合，它知道如何监听Observable传递的值。

Subscription: 表示Observable的执行，主要用于取消执行。

Operators: 是纯函数，使得能够处理具有诸如map，filter，concat，flatMap等操作的集合的功能编程风格。

Subject: 相当于一个EventEmitter，而且是向多个Observers组播一个值或事件的唯一方法。

Schedulers: 是集中调度器来控制并发，允许我们在例如计算时进行协调。 setTimeout或requestAnimationFrame或其他。

[2 minute introduction to Rx](https://medium.com/@andrestaltz/2-minute-introduction-to-rx-24c8ca793877)

## 例子

简单的查询框，查询github用户账号

```javascript
var Observable = Rx.Observable;

var input = document.querySelector('input')

const search$ = Observable.fromEvent(input, 'input')
.map(e => e.target.value)
.filter(value => value.length >= 1)
.distinctUntilChanged()
.switchMap((value) => wikiIt(value))
.subscribe(
  x => renderSearchResult(x),
  err => console.error(err)
)

function renderSearchResult (res) {
  var result = {};
  if (res.status === 200) {
    result = res.response
  }
  document.querySelector('#result').innerHTML = result.login
  document.querySelector('#avatar').src = result['avatar_url']
}

function wikiIt (name) {
  return Observable.ajax('https://api.github.com/users/' + name)
}
```

```html
<html !Doctype>
  <head>
    <title>RxJS</title>
  </head>
  <body>
    <input type="text">
    <div id="result"></div>
    <img id="avatar">
    <script src="node_modules/@reactivex/rxjs/dist/global/Rx.js"></script>
    <script src="index.js"></script>
  </body>
</html>
```

[更多例子](https://github.com/Reactive-Extensions/RxJS/tree/master/examples)
