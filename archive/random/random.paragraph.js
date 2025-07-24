// require String.toUpperFirst
random.paragraph = ( size = random.int() )=> {
  var
    i = 0,
    stack = [],
    n = random.int(10)
    n2 = random.int(10)
  ;
  for(i;i<size;i++) {
    buffer = random.sentence(n,',')+' '+random.sentence(n2,'.')+' '
    stack.push(buffer)
  }
  return stack.join('').trim().toUpperFirst()
}
if (random.dataset) {
  document.addEventListener('DOMContentLoaded', () => {
    let els = document.querySelectorAll('[data-random-paragraph]')
    els.forEach(el => {
      let val = el.getAttribute('data-random-paragraph')
      el.textContent = random.paragraph(parseInt(val))
    })
  })
}