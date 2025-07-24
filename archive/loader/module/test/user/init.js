$module({
  name: 'init',
  dependency: [
    'lib/json.js',
    'lib/innerHTML.js',
    'lib/base.css',
    'lib/pre.css'
  ]
})

function init() {
  innerHTML( pre, json({
    foo: 'bar',
    bar: 'baz',
    baz: 'qux'
  }))
}