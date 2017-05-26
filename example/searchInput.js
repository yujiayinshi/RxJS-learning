var Observable = Rx.Observable;

var input = document.querySelector('input')

const search$ = Observable.fromEvent(input, 'input')
.map(e => e.target.value)
.filter(value => value.length >= 1)
.distinctUntilChanged()
.switchMap((value) => wikiIt(value))
.subscribe(
  x => renderSearchResult(x),
  err => renderError(err)
)

function renderSearchResult (res) {
  var result = {};
  if (res.status === 200) {
    result = res.response
  }
  document.querySelector('#result').innerHTML = result.login
  document.querySelector('#avatar').src = result['avatar_url']
}

function renderError (err) {
  document.querySelector('#result').innerHTML = err.message
  document.querySelector('#avatar').src = null
  console.error(err)
}

function wikiIt (name) {
  return Observable.ajax('https://api.github.com/users/' + name)
}
