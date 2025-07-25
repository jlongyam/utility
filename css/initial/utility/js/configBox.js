function configBox( option = {}, root = document.body ) {
  if( option.style === undefined ) option.style = {}
  const config = ui.sync({
    id: option.id || 'config_box_' + Math.floor(Math.random()*100),
    title: option.title || undefined,
    style: {
      left: option.style.left || '',
      top: option.style.top || '',
      right: option.style.right || '',
      bottom: option.style.bottom || '',
      width: option.style.width || 'o'
    },
    body: option.body || [
      { type: 'text', content: 'configBox: NO_CONTENT' }
    ],
    drag: option.drag || false
  })
  function dragHandler() {
    window.displacejs = displacejs
    let drag_box = document.getElementById(config.id)
    let drag_handler = drag_box.firstElementChild.firstElementChild
    let drag_options = {
      constrain: true,
      handle: drag_handler,
      relativeTo: document.body
    }
    displacejs(drag_box,drag_options)
    drag_handler.style.cursor = 'move'
  }
  function handleChoose(el) {
    let item = el.target
    let choose_value = []
    let a_choose = el.target.parentElement.children
    for( let i in a_choose ) {
      if( typeof a_choose[i] === 'object' ) {
        if(a_choose[i].classList.contains('active')) choose_value.push(a_choose[i].textContent)
      }
    }
    function arrayDeleteItem(array,item) {
      let index = array.indexOf(item);
      if (index !== -1) {
        array.splice(index, 1);
      }
      return array
    }
    if(item.classList.contains('active')) {
      item.classList.remove('active')
      arrayDeleteItem(choose_value,item.textContent)
      // === event === //
      let parent = el.target.parentElement
      let field = parent.parentElement
      let root = field.parentElement
      let idx = 0
      for( let i = 0; i < root.children.length; i++ ) {
        if( root.children[i] === field ) idx = i
      }
      let idn = 0
      for( let i = 0; i < field.children[0].children.length; i++ ) {
        if( field.children[0].children[i] === el.target ) idn = i
      }
      config.body[idx].content[idn].onclick()
    }
    else { // no `active`
      item.classList.add('active')
      choose_value.push(item.textContent)
    }
  }
  function handleSwitch(el) {
    let item = el.target
    let config_switch = el.target.parentElement
    function resortItem(el) {
      let items = config_switch.children, i
      for( i in items ) {
        if(typeof items[i] === 'object' && items[i] != el ) {
          items[i].classList.remove('active')
        }
      }
    }
    if(!item.classList.contains('active')) {
      item.classList.add('active')
      resortItem(item)
      switch_value = item.textContent
      // === event === //
      let parent = el.target.parentElement
      let field = parent.parentElement
      let root = field.parentElement
      let idx = 0
      for( let i = 0; i < root.children.length; i++ ) {
        if( root.children[i] === field ) idx = i
      }
      let idn = 0
      for( let i = 0; i < field.children[0].children.length; i++ ) {
        if( field.children[0].children[i] === el.target ) idn = i
      }
      config.body[idx].content[idn].onclick()
    }      
  }
  function handleInput( el ) {
    let parent = el.target.parentElement
    let root = parent.parentElement
    let idx = 0
    for( let i = 0; i < root.children.length; i++ ) {
      if( root.children[i] === parent ) idx = i
    }
    config.body[idx].onkeyup(el)
  }
  function handleAction(el) {
    let parent = el.target.parentElement
    let root = parent.parentElement
    let idx = 0
    for( let i = 0; i < root.children.length; i++ ) {
      if( root.children[i] === parent ) idx = i
    }
    config.body[idx].onclick()
  }
  function handleClose() { document.querySelector('#'+config.id).remove() }
  function template() {
    const { id, style, title, body } = config
    return `
      <div id="${id}" class="config-box" style="right:${style.right};bottom:${style.bottom};left:${style.left};top:${style.top};width:${style.width};">
        ${(()=> {
          if( title === undefined ) return ''
          else { return `
            <div class="config-box_head">
              <span class="config-box_title">${title}</span>
              <span class="config-box_close" onclick="handleClose()"></span>
            </div>
            `
          }
        })()}
        <div class="config-box_body">
          ${body.map((item)=> {
            let s = '<div class="config-box_field">'
            if( item.type === 'text' ) {
              s += `<span class="config-box_text">${item.content}</span>`
            }
            if( item.type === 'action' ) {
              s += `<span class="config-box_action" onclick="handleAction(this)">${item.content}</span>`
            }
            if( item.type === 'input' ) {
              const activated = ( item.active ) ? ' contenteditable="true"' : ''
              s += `<span class="config-box_input"${activated} spellcheck="false" onkeyup="handleInput(this)">${item.content || 'input here ...' }</span>`
            }
            if( item.type === 'switch' ) {
              s += `<div class="config-box_switch">`
              item.content.map((item_switch)=> {
                const activated = ( item_switch.active ) ? ' active' : ''
                s+= `<span class="config-box_switch-item${activated}" onclick="handleSwitch(this)">${item_switch.value}</span>`
              }).join('')
              s += `</div>`
            }
            if( item.type === 'choose' ) {
              s += `<div class="config-box_choose">`
              item.content.map((item_choose)=> {
                const activated = ( item_choose.active ) ? ' active' : ''
                s+= `<span class="config-box_choose-item${activated}" onclick="handleChoose(this)">${item_choose.value}</span>`
              }).join('')
              s += `</div>`
            }
            s += '</div>'
            return s
          }).join('')}
        </div>
      </div>
    `
  }
  let div = document.createElement('div')
  root.prepend(div)
  ui.display( div, template, { events: { handleClose, handleAction, handleInput, handleSwitch, handleChoose, dragHandler } } )
  document.addEventListener('ui:render', function (event) {
		if(config.drag) dragHandler()
  })
}
/*
    // ------
		//  SYNC
		// ------
		config.body.push({ type: 'input', active: true, onkeyup: (e)=> { console.log(e) } });
		config.body.push({ type: 'switch', content: [
		  { value: 'switch item 1', active: false },
		  { value: 'switch item 2', active: true },
		  { value: 'switch item 3', active: false, onclick: ()=> { alert(9) } }
		]})
		config.body.push({ type: 'choose', content: [
		  { value: 'choose item 1', active: true },
		  { value: 'choose item 2', active: true, onclick: ()=> { alert(9) } },
		  { value: 'choose item 3', active: false }
		]})
		config.body.push({ type: 'action', content: 'Click me!', onclick: ()=> { alert(9) } });
*/