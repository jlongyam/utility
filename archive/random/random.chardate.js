// require random.js
random.chardate = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now()
if (random.dataset) {
  document.addEventListener('DOMContentLoaded', () => {
    let els = document.querySelectorAll('[data-random-chardate]')
    els.forEach(el => {
      el.textContent =random.chardate
    })
  })
}