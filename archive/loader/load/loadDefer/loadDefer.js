function loadDefer() {
  function load( url ) {
    let d = document, script = d.createElement('script')
    script.src = url
    script.defer = true
    d.currentScript.parentElement.appendChild(script)
  }
  return function( arr ) {
    arr.forEach( url=> {
      load( url )
    })
  }
  //window.addEventListener('load', loadAll, false)
  
}