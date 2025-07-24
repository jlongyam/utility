Object.prototype.extend = function (o) {
  for (key in o) {
    if (o.hasOwnProperty(key)) this[key] = o[key]
  }
  return this
}
/* alias Object.assign */