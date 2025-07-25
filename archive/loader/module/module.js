﻿const path = new class {
  constructor(location = typeof self === 'undefined' ? __filename : self.location) {
    this.location = location
    return this.location
  }
  #separator(path = this.location) { return (path.indexOf("/") !== -1) ? "/" : "\\" }
  #rest(path = this.location) {
    let
      sub = this.directory(path),
      n = path.length - sub.length
      ;
    return path.substring(0, path.length - n) + this.#separator(path)
  }
  directory(path = this.location) { return path.substring(0, path.lastIndexOf(this.#separator(path))) }
  up(num = 1, path = this.location) {
    let sep = this.#separator(path)
    let dir = this.directory(path)
    let loc = dir.split(sep)
    return path.split(sep).slice(0, (loc.length - num)).join(sep)
  }
  root(part = this.directory().split(this.#separator()).pop()) { return this.location.substring(0, this.location.indexOf(part)) + part }
  name(path = this.location) {
    let rest = this.#rest(path)
    return path.substring(rest.length)
  }
  relative(target_location, path = this.location) {
    let
      sep = this.#separator(path),
      tail = target_location.substring(target_location.length - sep.length)
      ;
    target_location = tail !== sep ? target_location + sep : target_location
    let
      n_start = path.indexOf(target_location) + target_location.length,
      s_rest = path.substring(n_start),
      s_clean = this.#rest(s_rest),
      n = s_clean.split(sep).length - sep.length,
      buff = '..' + sep
      ;
    return buff.repeat(n)
  }
  absolute( part, file_path = location.href ) {
    let 
      sep = this.#separator(part),
      clean_part = part.replace('./', '')
    ;
    return this.directory(file_path)+ sep + clean_part
  }
}(location.pathname) // singleton, require
if( typeof $module === 'undefined' ) $module = {}
if( typeof $module.config === 'undefined' ) $module.config = {}
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
      if( file === 'js' ) {
        let script = d.createElement('script');
        script.src = url
        script.async = false
        script.defer = true
        d.head.appendChild(script)
        $module.collection.push(script.src)
      }
    }
  })
  if(!$module.namespace.includes(config.name)) { $module.namespace.push( config.name )}
  window.addEventListener('load', window[config.name])
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
  if(data_main) document.write('<script src="'+data_main+'" defer><\/script>')
})()
//if (typeof module != 'undefined' && module.exports) module.exports = new Path()
