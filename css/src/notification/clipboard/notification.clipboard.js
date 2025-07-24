// require notification.js, clipboard.js
document.addEventListener('DOMContentLoaded', () => {
  notification.clipboardElement = document.querySelector('#notification_clipboard')
  notification.clipboard = (str, el) => {
    clipboard.text.copy(str)
    notification.clipboardElement.textContent = '"' + str + '" copied'
    notification.clipboardElement.classList.remove('hide')
    setTimeout(() => {
      notification.clipboardElement.classList.add('hide')
    }, 2000)
  }
})
