function inlineScript(str) {
  let
    d = document,
    current = d.currentScript,
    spawn = s => {
      s += ';document.currentScript.remove()'
      let script = d.createElement('script')
      script.textContent = s
      d.body.appendChild(script)
    }
    ;
  spawn(str)
  current.remove()
}