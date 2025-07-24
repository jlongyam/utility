$module.config = {
  'base.css': 'lib/base.css',
  'pre.css': 'lib/pre.css',
  'innerHTML.js': 'lib/innerHTML.js'
}
$module({
  name: 'main',
  dependency: [
    'base.css',
    'pre.css',
    'innerHTML.js',
    'lib/json.js'
  ]
})
/*$module({
  name: 'main',
  dependency: [
    'lib/base.css',
    'lib/pre.css',
    'lib/innerHTML.js',
    'lib/json.js'
  ]
})
*/
// stored in global too, but no guarantee and NOT MODULE
function foo() { return 'foo, bar' } 
let baz = 'quux'

// stored in global, guarantee, MODULE
function main() {
  //innerHTML( pre, `Hello ${foo()} and ${baz}, from 'main.js`)
  pre.textContent += `Hello ${foo()} and ${baz}, from 'main.js'\n`
}
// this will fail,
//innerHTML( pre, `Hello ${foo()} and ${baz}, from 'main.js`)
// dependency can be access only in main()