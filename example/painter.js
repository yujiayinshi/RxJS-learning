const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
ctx.beginPath()

const down$ = Rx.Observable.fromEvent(canvas, 'mousedown')
.map(() => 'down')
const up$ = Rx.Observable.fromEvent(canvas, 'mouseup')
.map(() => 'up')

const upAndDown$ = up$.merge(down$)

const move$ = Rx.Observable.fromEvent(canvas, 'mousemove')
.map(e => ({ x: e.offsetX, y: e.offsetY}))
.bufferCount(2, 1)

upAndDown$.switchMap(
  action => action === 'down' ? move$ : Rx.Observable.empty()
)
.subscribe(draw)

function draw ([first, sec]) {
  ctx.moveTo(first.x, first.y)
  ctx.lineTo(sec.x, sec.y)
  ctx.stroke()
}
