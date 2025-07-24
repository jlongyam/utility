// require createElement.js, Object.forEach
class ConfigBox {
  constructor(title) {
    this.title = title || 'CONFIG'
  }
  #el = {}
  #create() {
    let
      el = createElement('div', { classList: 'config-box', draggable: 'true' }),
      el_head = createElement('div', { classList: 'config-box_head' }),
      el_title = createElement('span', { classList: 'config-box_title', textContent: this.title }),
      el_close = createElement('span', { classList: 'config-box_close', textContent: '[X]' }),
      el_body = createElement('div', { classList: 'config-box_body' })
      ;
    document.body.appendChild(el)
    el.appendChild(el_head)
    el_head.appendChild(el_title)
    el_head.appendChild(el_close)
    el.appendChild(el_body)
    // register
    this.#el.root = el
    this.#el.head = el_head
    this.#el.title = el_title
    this.#el.close = el_close
    this.#el.body = el_body
  }
  #listen() {
    window.addEventListener('dragover', e => e.preventDefault(), false)
    this.#el.root.addEventListener('drag', e => {
      e.target.style.left = e.clientX + 'px'
      e.target.style.top = e.clientY + 'px'
      e.target.style.visibility = 'hidden'
    })
    this.#el.root.addEventListener('dragend', e => e.target.style.visibility = 'visible')
    //
    this.#el.close.addEventListener('click', () => this.#el.root.remove())
  }
  createText(content = 'LABEL') {
    let
      el_field = createElement('div', { classList: 'config-box_field' }),
      el_text = createElement('span', { classList: 'config-box_text', textContent: content })
      ;
    el_field.appendChild(el_text)
    this.#el.body.appendChild(el_field)
  }
  createAction(text, cb) {
    let
      el_field = createElement('div', { classList: 'config-box_field' }),
      el_action = createElement('span', { classList: 'config-box_action', textContent: text })
      ;
    el_field.appendChild(el_action)
    this.#el.body.appendChild(el_field)
    el_action.addEventListener('click', cb)
  }
  start() {
    this.#create()
    this.#listen()
  }
  fixed() {
    this.#el.root.style.top = 0+'px'
    this.#el.root.style.right = 0+'px'
    this.#el.root.style.left = 'auto'
    this.#el.root.removeAttribute('draggable')
  }
  get body() {
    return this.#el.body
  }
}
class ConfigChoose {
  constructor(parent) {
    this.parent = parent // should instance of ConfigBox.body
  }
  #choosed = []
  create(arr = ['One', 'Two', 'Three'], cb) {
    let
      el_field = createElement('div', { classList: 'config-box_field' }),
      el_choose = createElement('div', { classList: 'config-box_choose' })
      ;
    el_field.appendChild(el_choose)
    arr.forEach(item => {
      let el_item = createElement('span', { classList: 'config-box_choose-item', textContent: item })
      el_choose.appendChild(el_item)
      el_item.addEventListener('click', () => {
        el_item.classList.toggle('active')
        if (!el_item.classList.contains('active')) {
          let i = this.#choosed.indexOf(item)
          this.#choosed.splice(i, 1)
        }
        else {
          if (!this.#choosed.includes(item)) this.#choosed.push(item)
        }
        if (cb) cb(this.#choosed)
      })
    })
    this.parent.appendChild(el_field)
  }
}
class ConfigSwitch {
  constructor(parent) {
    this.parent = parent // should instance of ConfigBox.body
  }
  #choosen = ''
  create(arr = ['One', 'Two', 'Three'], cb) {
    let
      el_field = createElement('div', { classList: 'config-box_field' }),
      el_switch = createElement('div', { classList: 'config-box_switch' })
      ;
    el_field.appendChild(el_switch)
    let el_child = el_switch.children
    function chooseOne(o) {
      el_child.forEach((i) => {
        if (i != o) i.classList.remove('active')
      })
    }
    arr.forEach(item => {
      let el_item = createElement('span', { classList: 'config-box_switch-item', textContent: item })
      el_switch.appendChild(el_item)
      el_item.addEventListener('click', () => {
        el_item.classList.toggle('active')
        chooseOne(el_item)
        this.#choosen = item
        if (cb) cb(this.#choosen)
      })
    })
    this.parent.appendChild(el_field)
  }
}