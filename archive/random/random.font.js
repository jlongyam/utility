// require random.js
random.font = (arr)=> {
  var
    fonts = [
      "Arial, Helvetica, sans-serif",
      "Verdana, Geneva, Tahoma, sans-serif",
      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
      "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
      "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
      "Georgia, 'Times New Roman', Times, serif",
      "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
      "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    ],
    arr = arr === undefined ? fonts : arr,
    l = arr.length,
    calc = Math.floor(Math.random()*l)
    ;
  return arr[calc]
}
if (random.dataset) {
  document.addEventListener('DOMContentLoaded', () => {
    let els = document.querySelectorAll('[data-random-font]')
    els.forEach(el => {
      el.style.fontFamily = random.font()
    })
  })
}