// Require String.stripInitial, hilight.js
let result = {
  createWorkSpace: () => {
    let workarea = Object.assign(document.createElement('div'), { classList: 'result-area' })
    document.currentScript.parentElement.appendChild(workarea)
    workarea.appendChild(document.currentScript)
    return workarea
  },
  showSource: (script) => {
    script.classList.add('result-script')
    if (script.getAttribute('src') === null) {
      script.innerHTML = script.innerHTML.stripInitial().trim()
      // script.classList.add('hilight')
      // script.classList.add('lang-js')
      // hilight.js( script )
    }
    else {
      script.setAttribute('data-result-source', script.getAttribute('src'))
    }
  },
  html: (strHTML, cb) => {
    let div = Object.assign(document.createElement('div'), { innerHTML: strHTML, classList: 'result-demo' })
    if (!document.currentScript.parentElement.classList.contains('result-area')) {
      let workarea = result.createWorkSpace()
      workarea.appendChild(div)
    }
    else {
      document.currentScript.parentElement.appendChild(div)
    }
    if (document.currentScript.getAttribute('data-source-show') !== null) {
      result.showSource(document.currentScript)
    }
    if (cb) cb.call()
    return {
      then: (cb)=> { if (cb) cb.call()}
    }
  },
  js: (strInput, cb) => {
    let output = Object.assign(document.createElement('pre'), { textContent: strInput, classList: 'result-log' })
    if (!document.currentScript.parentElement.classList.contains('result-area')) {
      let workarea = result.createWorkSpace()
      workarea.appendChild(output)
    }
    else {
      document.currentScript.parentElement.appendChild(output)
    }
    if (document.currentScript.getAttribute('data-source-show') !== null) {
      result.showSource(document.currentScript)
    }
    if (cb) cb.call()
    return {
      then: (cb)=> { if (cb) cb.call()}
    }
  },
  css: ( strInput, cb )=> {
    let style = Object.assign(document.createElement('style'), { textContent: strInput })
    document.head.appendChild(style)
    if (document.currentScript.getAttribute('data-source-show') !== null) {
      result.showSource(document.currentScript)
    }
    if (cb) cb.call()
    return {
      then: (cb)=> { if (cb) cb.call()}
    }
  }
}

