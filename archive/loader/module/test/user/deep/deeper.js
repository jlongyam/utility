$module({
  name: 'deeper',
  dependency: [
    './lib/base.css',
    './lib/pre.css',
    './lib/innerHTML.js',
    'lib/json.js',
    //'user/repetitive.js',
    'user/rethrow.js'
  ]
})

function deeper() {
  pre.innerHTML = init() + ' and from deeper.js\n'
  pre.innerHTML += str_init
}