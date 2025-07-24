// require random.js
random.uuid = crypto.randomUUID()
if (random.dataset) {
  document.addEventListener('DOMContentLoaded', () => {
    let els = document.querySelectorAll('[data-random-uuid]')
    els.forEach(el => {
      el.textContent = random.uuid
    })
  })
}