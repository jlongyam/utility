// require loadCheck.js
function loadCSS( arr, cb, media ) {
  let at = document.head.querySelectorAll('script')[0]
  function load( url, med  ) {
    let link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    link.media = 'only x'
    at.parentNode.insertBefore( link, at )
    setTimeout(()=> link.media = med || "all" ) // magic 
  }
  arr.forEach( ( url, i ) => {
    if(!checkStylesheet(url)) load( url, media )
    if( i === arr.length-1 ) { if( cb ) cb() }
  })
}