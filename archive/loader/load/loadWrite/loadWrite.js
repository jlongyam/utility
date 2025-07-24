function loadWrite(arr) {
  arr.forEach( url=> {
    document.write('<script src="' + url + '"><\/script>')
  })
  document.currentScript.remove()
}