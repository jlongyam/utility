// require random.js
random.color = '#'+Math.floor(Math.random()*16777215).toString(16)
if (random.dataset) {
  document.addEventListener('DOMContentLoaded', () => {
    let els = document.querySelectorAll('[data-random-color]')
    els.forEach(el => {
      const val = el.getAttribute('data-random-color')
      if(val.length == 0 ) el.textContent = random.color
      if(val == 'color' ) el.style.color = random.color
      if(val == 'background' ) el.style.backgroundColor = random.color
      if(val == 'border' ) el.style.borderColor = random.color
    })
  })
}