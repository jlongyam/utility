// require String.toUpperFirst, random.vocal, random.cons
random.word = (size = random.int(), reverse = false, upperFirst= false)=> {
  var
    stack = [],
    real_size = size/2
  ;
  for(i = 0; i < real_size;i++) {
    var buffer = random.cons()+random.vocal()
    if( reverse ) buffer = random.vocal()+random.cons()
    stack.push(buffer)
  }
  if( upperFirst ) return stack.join('').toUpperFirst()
  else return stack.join('')
}
if (random.dataset) {
  document.addEventListener('DOMContentLoaded', () => {
    let els = document.querySelectorAll('[data-random-word]')
    els.forEach(el => {
      let val = el.getAttribute('data-random-word')
      el.textContent = random.word(parseInt(val),false,true)
    })
  })
}