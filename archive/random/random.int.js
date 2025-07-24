random.int = (max=10) => {
  let min = 1
  return Math.floor(Math.random() * (max - min++)) + min
}
if (random.dataset) {
  document.addEventListener('DOMContentLoaded', () => {
    let els = document.querySelectorAll('[data-random-int]')
    els.forEach(el => {
      let val = el.getAttribute('data-random-int').split(',')
      el.textContent = random.int(val[0], val[1])
    })
  })
}
