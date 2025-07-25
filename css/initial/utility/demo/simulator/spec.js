const device_spec = {
  'xx-small': {
    name: 'iPhone 5',
    width: 320,
    height: 568
  },
  'x-small': {
    name: 'Samsung Galaxy S7',
    width: 360,
    height: 640
  },
  'small': {
    name: 'Nexus 6P',
    width: 412,
    height: 732
  },
  'medium': {
    name: 'Nexus 7',
    width: 600,
    height: 960
  },
  'large': {
    name: 'iPad Pro',
    width: 1024,
    height: 1366
  },
  'x-large': {
    name: 'Chromebook Pixel',
    width: 1280,
    height: 850
  },
  'xx-large': {
    name: 'TV Full HD',
    width: 1920,
    height: 1080
  }
}
function specText( size = 'medium' ) {
  return `<span><b>${device_spec[size].name}</b>: <b>${device_spec[size].width}</b>x${device_spec[size].height}px: ${size}</span>`
}
document.addEventListener('DOMContentLoaded', ()=> {
  const el_spec = document.querySelector('.spec')
  const el_text = el_spec.nextElementSibling.firstElementChild.className
  el_spec.innerHTML = specText(el_text)
  //
  //
  let iframe = document.querySelector('iframe')
  if(location.search.length > 0 ) {
    let root = '../../../'
    let target = location.search.substring(1)
    iframe.src = root+target
  }
  else {
    iframe.src = 'example.html'
  }
})