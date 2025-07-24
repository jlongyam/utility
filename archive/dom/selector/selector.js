// @author Lea Verou (http://lea.verou.me)
function $(selector, ctx) {
  return typeof selector === 'string' ? (ctx || document).querySelector(selector) : selector
}
function $$(selector, ctx) {
  var elements = (ctx || document).querySelectorAll(selector)
  try {
    return Array.prototype.slice.call(elements)
  }
  catch (e) {
    var arr = Array(elements.length)
    for (var i = elements.length; i-- > 0;) {
      arr[i] = elements[i]
    }
    return arr
  }
}