// require String.toUpperFirst
random.sentence = (size = 4, sep=',', upperFirst = false )=> {
  var
    i = 0,
    stack = [],
    real_size = size/2
  ;
  for( i; i < real_size; i++ ) {
    var buffer = random.word()
    var buffer2 = random.word(random.int(),true)
    stack.push(buffer+' '+buffer2+' ')
  }
  if( upperFirst ) return stack.join('').toUpperFirst().trim()+sep
  else return stack.join('').trim()+sep
}
if (random.dataset) {
  document.addEventListener('DOMContentLoaded', () => {
    let els = document.querySelectorAll('[data-random-sentence]')
    els.forEach(el => {
      let val = el.getAttribute('data-random-sentence')
      el.textContent = random.sentence(parseInt(val),'.',true)
    })
  })
}