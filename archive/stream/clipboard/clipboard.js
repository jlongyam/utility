const clipboard = {
  text: {
    copy: async (data) => {
      await navigator.clipboard.writeText(data)
    }
  }
}
// listener
document.addEventListener('DOMContentLoaded', () => {
  let copier = document.querySelectorAll('[data-clipboard-copy]')
  copier.forEach(el => {
    el.addEventListener('click', (e) => {
      let
        datas = e.target.getAttribute('data-clipboard-copy').split(','),
        data = document.querySelector(datas[0])[datas[1]]
        ;
      clipboard.text.copy(data)
    })
  })
})