const cssProperty ={
  get: ( property, el = document.documentElement )=> {
    return getComputedStyle(el).getPropertyValue(property)
  },
  set: ( propery, value ,el = document.documentElement )=> {
    el.style.setProperty( propery, value )
  }
}