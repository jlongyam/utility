$module({
  name: 'init',
  dependency: [
    'lib/innerHTML.js'
  ]
})

function init() {
  //window['str_init'] = 'string str_init from rethrow.js' // work
  this.str_init = 'string str_init from rethrow.js' // work
  //let str_init = 'string str_init from rethrow.js' // not work
  return 'string from rethrow.js'
}