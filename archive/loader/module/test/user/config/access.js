$module({
  name: 'access',
  dependency: [
    'user/config/main.js'
  ]
})
// in main.js
/*
function foo() { return 'foo, bar' } 
let baz = 'quux'
*/

function access() {
  pre.innerHTML = `Hello ${foo()} and ${baz}, from 'access.js'\n`
}