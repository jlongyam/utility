String.prototype.escapeQuote = function() {
  const map = { '"': '"', "'": '\\\'' }
  return this.replace( /"|'/g, function( m ) { return map[m] } )
}