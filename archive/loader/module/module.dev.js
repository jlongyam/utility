// require path.js
if( typeof $module === 'undefined' ) $module = {}
if( typeof $module.config === 'undefined' ) $module.config = {}
$module.log = ''
$module.namespace = []
$module.collection = []
function $module( config, report  = false ) {
  if( typeof config.dependency === 'undefined' ) config.dependency = []
  let dependency = [], alias = Object.keys($module.config)
  if(alias.length > 0 ) {
    config.dependency.forEach( name=> {
      if(alias.includes(name)) dependency.push($module.config[name])
      else dependency.push(name)
    })
  }
  else dependency = config.dependency
  dependency.forEach( url=> {
    let current_url = path.absolute(url)
    if(!$module.collection.includes(current_url)) {
      let file = url.split('.').pop(), d = document;
      if( file === 'css' ) {
        let link = d.createElement('link')
        link.href = url
        link.rel = "stylesheet"
        d.head.insertBefore(link,document.scripts[0])
        $module.collection.push(link.href)
      }
      else if( file === 'js' ) {
        let script = d.createElement('script');
        script.src = url
        script.defer = true
        d.head.appendChild(script)
        $module.collection.push(script.src)
      }
      else {
        $module.log += 'file type not supported\n'
      }
    }
  })
  if(!$module.namespace.includes(config.name)) {
    $module.namespace.push( config.name.toString() )
  }
  else $module.log += 'namespace <b>' + config.name + '</b> already included\n'
  window.addEventListener('load', window[config.name])
  log.innerHTML = `
    <pre>log: ${$module.log}</pre>
    <pre>namespace: ${JSON.stringify($module.namespace,0,2)}</pre>
    <pre>collection: ${JSON.stringify($module.collection,0,2)}</pre>
  `
}
// url cannot contain relative path '../'
// use 'path' ot './path' instead
/*
$module({ name: 'random'})
// OR
$module({ name: 'random',
  dependency: [
    URLs
  ]
})
function random() {}
*/
/* == alias, load before caller

$module.config = {
  'base.css': 'lib/base.css',
  'pre.css': 'lib/pre.css',
  'innerHTML.js': 'lib/innerHTML.js'
}
*/
(()=>{
  let data_main = document.currentScript.dataset.main
  data_main = ( typeof data_main === 'undefined' ) ? false : data_main
  if(data_main) {
    console.log(data_main)
    document.write('<script src="'+data_main+'" defer><\/script>')
  }
})()