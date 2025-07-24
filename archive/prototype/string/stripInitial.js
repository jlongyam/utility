String.prototype.stripInitial = function () {
  var
    pttrn = /^\s*(?=[^\s]+)/mg,
    indentLen = this.match(pttrn).reduce(function (min, line) { return Math.min(min, line.length) }, Infinity),
    indent = new RegExp('^\\s{' + indentLen + '}', 'mg')
    ;
  return indentLen > 0 ? this.replace(indent, '') : this
}