function $module( config ) {
  let collection = []
  config.dependency.forEach( url=> {
    if(!collection.includes(url)) {
      collection.push(url)
      let file = url.split('.').pop(), d = document;
      if( file === 'css' ) {
        let link = d.createElement('link')
        link.href = url
        link.rel = "stylesheet"
        d.head.insertBefore(link,document.scripts[0])
      }
      else if( file === 'js' ) {
        let script = d.createElement('script');
        script.src = url
        script.async = false
        script.defer = true
        d.head.appendChild(script)
      }
      else {
        console.log('file type not supported')
      }
    }
  })
  window.addEventListener('load', window[config.name] )
} 
let
  d = document,
  js_lib = d.currentScript.getAttribute('src').replace('/demo/dev.js','/js/')
  ;
$module({ name: 'dev',
  dependency: [
    js_lib+'path.js',
    js_lib+'ui.js',
    js_lib+'displace.js',
    js_lib+'configBox.js',
    js_lib+'config-box.css',
    '../../../_tweak.css'
  ]
})
/*
$return(()=> {
  return false
})
*/
function dev() {
  let path = new Path(location.pathname)
  let path_root = path.root('css-initial/src/')
  let dot_rel = path.relative(path_root)
  let url_component = path.location.substring(path_root.length)
  let path_compare = 'utility/demo/compare/compare.html'
  let path_emulator = 'utility/demo/simulator/index.html'
  function compare() {
    location.assign(dot_rel+path_compare+'?'+url_component)
  }
  function emulate() {
    location.assign(dot_rel+path_emulator+'?'+url_component)
  }
  function unstyle() {
    document.querySelectorAll('link')[0].toggleAttribute('disabled')
  }
  function debug() {
    document.body.classList.toggle('debug')
  }
  if(window.top.length < 1) { // not in iframe
    configBox({
      id: 'config_box',
      title: 'Dev',
      style: {
        bottom: '10px',
        right: '25px',
        width: '100px'
      },
      body: [
        { type: 'action', content: 'Debug', onclick: (el)=> {debug()} },
        { type: 'action', content: 'Unstyle', onclick: (el)=> {unstyle()} },
        { type: 'action', content: 'Compare', onclick: ()=> {compare()} },
        { type: 'action', content: 'Emulator', onclick: ()=> {emulate()} }
      ]
    })
  }
  if(location.search.includes('unstyle')) {
    document.querySelectorAll('link')[0].setAttribute('disabled','')
  }
}