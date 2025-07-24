$script.ready('lib', ()=> {
  a = Object.keys(o)
  let str = '<ul>'
  a.forEach((el)=>{
    str += '<li>'+o[el]+'</li>'
  })
  str += '</ul>'
  root.innerHTML += str
})