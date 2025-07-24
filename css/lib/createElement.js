// function createElement(tagName, properties) {
//   let tag = document.createElement(tagName)
//   for (prop in properties) tag.setAttribute(prop, properties[prop])
//   return tag
// }
function createElement(arr, cb ) {
  let d = document
  function nodeRender(arr_tpl, parent, el, o) {
    for (; (o = arr_tpl.shift()) != null;) {
      if ('' + o === o || +o === o)
        parent.appendChild(d.createTextNode(o))
      else if ('' + o === '[object Object]')
        for (el in o) parent.setAttribute(el, o[el])
      else {
        nodeRender(o, el = d.createElement(o.shift()))
        parent.appendChild(el)
      }
    }
    return el
  }
  doc_frag = d.createDocumentFragment()
  let el = nodeRender([arr.slice()], doc_frag )
  if( cb ) cb(el)
  return doc_frag
}