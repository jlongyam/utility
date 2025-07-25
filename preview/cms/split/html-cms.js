// require utility.js
function insert() {
  code_editor.textContent = code_proxy.value = html5_str( document.title, '<style>\n\t\n\t</style>', '<pre id="log">LOG</pre>\n\t<script>\n\t\n\t<\/script>')
}
function update() {
  let last_script = document.scripts[document.scripts.length-1]
  last_script.innerHTML = 'content(`' + code_editor.innerHTML + '`)\n'
  code_editor.innerHTML = 'Content Updated ...'
  str_head = document.querySelector('#style').outerHTML
  str_head += '\n  '
  str_head += document.querySelector('#utility').outerHTML
  str = html5_str( document.title, str_head, document.body.innerHTML.trim() )
  let file_name = location.pathname.split('/').pop()
  downloadString(str,'text/html',file_name)
}
function edit() {
  code_preview.className = code_marker.className = 'hide'
  code_proxy.focus()
  button_preview.removeAttribute('disabled')
  if(button_edit.textContent === 'Edit') {
    code_proxy.className = ''
    code_editor.className =  'hide'
    button_edit.textContent = 'Save'
    button_insert.removeAttribute('disabled')
    button_mark.setAttribute('disabled','')
    button_update.setAttribute('disabled','')
    if(sessionStorage.getItem('content-current_textContent') === null ) {
      code_proxy.value = code_editor.textContent
    }
    else code_proxy.value = sessionStorage.getItem('content-current_textContent')
    code_proxy.focus()
    return
  }
  if(button_edit.textContent === 'Save') {
    code_proxy.className = 'hide'
    code_editor.className =  ''
    button_edit.textContent = 'Edit'
    button_insert.setAttribute('disabled','')
    button_mark.removeAttribute('disabled')
    button_update.removeAttribute('disabled')
    code_marker.value = code_proxy.value
    code_editor.textContent = code_proxy.value
    sessionStorage.setItem('content-current_textContent', code_editor.textContent)
    sessionStorage.setItem('content-current_innerHTML', code_editor.innerHTML)
  }
}
function mark() {
  code_proxy.className = code_preview.className = 'hide'
  if( button_mark.textContent === 'Mark' ) {
    code_marker.className = ''
    code_editor.className = 'hide'
    button_preview.setAttribute('disabled','')
    button_update.setAttribute('disabled','')
    button_edit.setAttribute('disabled','')
    button_mark.textContent = 'Save'
    if(sessionStorage.getItem('content-current_innerHTML') === null ) {
      code_marker.value = code_editor.innerHTML
    }
    else code_marker.value = sessionStorage.getItem('content-current_innerHTML')
    code_marker.focus()
    return
  }
  if( button_mark.textContent === 'Save' ) {
    code_marker.className = 'hide'
    code_preview.className = 'hide'
    code_editor.className = ''
    button_preview.removeAttribute('disabled')
    button_update.removeAttribute('disabled')
    button_edit.removeAttribute('disabled')
    button_mark.textContent = 'Mark'
    code_editor.innerHTML = code_marker.value
    code_proxy.value = code_editor.textContent
    sessionStorage.setItem('content-current_innerHTML', code_marker.value )
    sessionStorage.setItem('content-current_textContent', code_editor.textContent )
  }
}
function preview() {
  if( button_preview.textContent === 'Preview') {
    button_preview.textContent = 'Go Back'
    code_proxy.className = code_marker.className = 'hide'
    code_preview.className = ''
    code_editor.className = 'hide'
    button_edit.setAttribute('disabled','')
    button_insert.setAttribute('disabled','')
    button_mark.setAttribute('disabled','')
    button_update.setAttribute('disabled','')
    let ifr_doc = code_preview.contentWindow.document
    ifr_doc.open()
    ifr_doc.write(code_proxy.value)
    ifr_doc.close()
    return
  }
  if( button_preview.textContent === 'Go Back') {
    button_preview.textContent = 'Preview'
    code_preview.className = 'hide'
    button_edit.removeAttribute('disabled')
    button_update.removeAttribute('disabled')
    if( button_edit.textContent === 'Save' ) {
      button_mark.setAttribute('disabled','')
      button_insert.removeAttribute('disabled')
      code_proxy.className = ''
      code_proxy.focus()
    }
    if( button_edit.textContent === 'Edit' ) {
      button_mark.removeAttribute('disabled')
      code_proxy.className = 'hide'
      code_editor.className = ''
    }
  }
}
function viewMode( mode ) {
  const mode_snippet = ()=> {
    button_insert.classList.add('hide')
    button_edit.classList.add('hide')
    button_mark.classList.add('hide')
    button_update.classList.add('hide')
    document.title = location.href.split('\/').pop()
    document.body.classList.remove('hide')
  }
  const mode_site = ()=> {
    preview()
    menu_bar.remove()
    code_layout.style.height = '100%'
    code_layout.style.border = '0'
    document.title = location.href.split('\/').pop()
    document.body.classList.remove('hide')
  }
  const mode_admin = ()=> {
    document.body.classList.remove('hide')
  }
  switch( mode ) {
    case 'snippet': mode_snippet(); break;
    case 'website': mode_site(); break;
    default : mode_admin(); break;
  }
}
function content(str) {
  if( sessionStorage.getItem('content-current_innerHTML') === null){
    code_editor.innerHTML = str.trim()
  }
  else code_editor.innerHTML = sessionStorage.getItem('content-current_innerHTML')
  code_proxy.value = code_editor.textContent
  code_marker.value = code_editor.innerHTML
  let data_mode = document.querySelector('html').dataset.mode
  if(location.search.includes('?mode') || location.search.includes('?admin') ) {
    data_mode = location.search.split('=')[1]
  }
  viewMode(data_mode)
  document.body.classList.remove('hide')
  document.title = location.href.split('/').pop()
  sessionStorage.setItem('content-default', str)
}