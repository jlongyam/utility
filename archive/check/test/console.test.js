function runTest() {
  return `
    engine              : ${engine}
    typeOf(console)     : ${typeOf(console)}
    typeClass(console)  : ${typeClass(console)}
  `
}
function $include(input) {
  $include.path = typeof $include.path === 'undefined' ? '' : $include.path
  input = $include.path+input
  // node <script>.js
  if ( typeof print === 'undefined' && typeof document !== 'object' ) {
    let f = require('fs')
    function $exec(s) { eval(f.readFileSync(s)+'','utf') }
    if(Array.isArray(input)) { input.forEach( file => $exec(file) ) }
    else if(typeof input === 'string') $exec(input) 
    else console.log('$include type is '+input)
  }
  if( typeof print === 'function' && typeof document !== 'object' && typeof ARGV === 'undefined' ) {
    // qjs --std <script>.js
    if(Array.isArray(input)) { input.forEach( file => std.loadScript(file) ) }
    else if(typeof input === 'string') std.loadScript(input)
    else console.log('$include type is '+input)
  }
}
$require = $include
//
$include.path = '../'
$require([
  'engine.js',
  'type.js'
])
console.log(runTest())
