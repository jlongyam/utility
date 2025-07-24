const toggle = (()=> {
  const toggleStyle = (el)=> ( el.style.display = el.style.display === 'none' ? 'block' : 'none' )
  const toggleHidden = (el)=> ( el.hidden = !ele.hidden )
  const toogleAttribute = ( el, atr )=> ( el.setAttribute( atr ))
  return {
    style: toggleStyle,
    hidden: toggleHidden,
    attribute: toggleAttribute
  }
})()
// shorthand
// ELEMENT.toggleAttribute('hidden')