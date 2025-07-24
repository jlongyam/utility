$module({
  name: 'init',
  dependency: [
    'lib/json.js',
    'lib/innerHTML.js'
  ]
})

function init() {
  innerHTML( pre, json({
    foo: 'bar',
    bar: 'baz',
    baz: 'qux'
  }))
}