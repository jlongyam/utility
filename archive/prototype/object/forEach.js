Object.prototype.forEach = function (func, context) {
  if (!(typeof func === 'function')) return
  context = context || this
  for (var i in this) {
    if (this.hasOwnProperty && this.hasOwnProperty(i)) {
      var ret = func.call(context, this[i], i)
      if (!!ret || ret === 0 || ret === '') return ret
    }
  }
  return null
}