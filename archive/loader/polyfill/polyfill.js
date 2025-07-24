!function( path ) {
  function script( url ) { return '<script src="' + path + url + '" async><\x2fscript>' }
  function write( s ) { return document.write( s ) }
  if( !( 'onhashchange' in window ) ) write( script( 'window.onhashchange.min.js' ) )
  if( !Array.prototype.forEach ) write( script( 'Array.forEach.min.js' ) )
}( 'polyfill/' )
