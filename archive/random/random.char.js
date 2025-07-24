// require random.int
random.char = (size = random.int()) => {
  const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  return [...Array(size)].reduce(a => a + A[~~(Math.random() * A.length)], '')
}
if (random.dataset) {
  document.addEventListener('DOMContentLoaded', () => {
    let els = document.querySelectorAll('[data-random-char]')
    els.forEach(el => {
      let val = el.getAttribute('data-random-char')
      el.textContent = random.char(parseInt(val))
    })
  })
}