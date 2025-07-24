const current = ((el) => ()=> el )(document.currentScript)
current.src = (el = current()) => ''+el.getAttribute('src')
current.script = (el = document.currentScript) => el
current.script.src = (el = current.script()) => ''+el.getAttribute('src')
