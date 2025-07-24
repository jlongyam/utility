$module({
  name: 'foo',
  dependency: [
    'lib/json.js',
    'lib/innerHTML.js',
    'user/rethrow.js'
  ]
})

function foo() {
  pre.innerHTML = 'repetitive active'
}