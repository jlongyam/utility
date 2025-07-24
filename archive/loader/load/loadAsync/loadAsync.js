function loadAsync(arr, callback) {
  function load(url, cb) {
    let script = document.createElement('script')
    script.src = url
    script.async = true
    script.onload = async () => { if (cb) await cb() }
    document.head.appendChild(script)
  }
  return arr.forEach((url, i) => {
    if (i === arr.length - 1) {
      if (callback) load(url, callback)
      else load(url)
    }
    else load(url)
  })
}