// require current.root for deep check
function checkStylesheet( url, callback ) {
  let bool = false
  $$( 'link' ).forEach(( obj )=> {
    if( obj.getAttribute('href') === url ) {
      if( callback ) callback( obj )
      bool = true
      }
    })
  return bool
  }
function checkScript( url, callback ) {
  let bool = false
  $$( 'script' ).forEach(( obj )=> {
    if( obj.getAttribute('src') === url ) {
      if( callback ) callback( obj )
      bool = true
      }
    })
  return bool
  }