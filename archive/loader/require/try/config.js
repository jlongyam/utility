// Uncomment to show result
$script.path('sample/')
//====================
$include(['say'], ()=> {
	root.innerHTML = say_hello
})
// == method 1 == */
// $require(['say'], ()=> {
//   root.innerHTML = say_hello
// })

// == method 2 == */
// $require(['say'], 'simple')
// root.innerHTML = '<p id="p">Example</p>'
// $script.ready('simple', ()=> {
//   root.innerHTML += say_hello
// })

// == method 3 == */
// $require(['awesome', 'extend' ], 'lib')
//  execute 'lib', see source code
// $script('action')

// == method 4 == */
// $require(['awesome', 'extend'], 'other')
// $require('plugin')
// $script.ready('plugin'/*see plugin.js*/, ()=> {
//   root.innerHTML = '<pre>' + JSON.stringify(o,0,2) + '</pre>'
// })

// == method 5 == */
// combine with $script.get(<url>)
// $script.get('https://rawcdn.githack.com/jlongyam/router/689a55d62e70bb27e38eb10c8f96dcad5e132bb8/dist/Router.min.js', function () {
//   root.innerHTML = `<pre>${Router}</pre>`
// })
// == Note:
// $script.urlArgs not work properly
//root.innerHTML = `<iframe src="./config.js" style="width:90%;height:${screen.height/1.35}px">`
$include.css(['sample/css/h1.min.css'])
//
//$check.link , should not double load
$include.css(['sample/css/h1.min.css'])