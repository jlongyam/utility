const createFragment = ( tagName, properties ) => document.createDocumentFragment().appendChild( Object.assign( document.createElement( tagName ), properties ) )
function createFragments( o_parent, arr) {
  let d = document
  function nodeRender(arr_tpl, parent, el, o) {
    for (; (o = arr_tpl.shift()) != null;) {
      if ('' + o === o || +o === o) //scalar
        parent.appendChild(d.createTextNode(o))
      else if ('' + o === '[object Object]') //object
        for (el in o) parent.setAttribute(el, o[el])
      else { //array
        nodeRender(o, el = d.createElement(o.shift()))
        parent.appendChild(el)
      }
    }
  }
  doc_frag = d.createDocumentFragment()
  nodeRender(arr.slice(), doc_frag)
  return o_parent.appendChild(doc_frag)
}