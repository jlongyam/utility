String.prototype.encodeHTML = function() {
  const map = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
  }
  return this.replace( /[<>]/g, function( m ) { return map[m] } )
}