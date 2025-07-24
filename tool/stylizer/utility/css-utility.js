// require filesaver.js
class CSSUtility {
  constructor() {
    this.scope_query = 'html'
    this.style_id = 'utility'
    this.data_classes = []
    this.data_alias = []
  }
  #m_stack = {
    ['xx-small']: [],
    ['x-small']: [],
    ['small']: [],
    ['medium']: [],
    ['large']: [],
    ['x-large']: [],
    ['xx-large']: [],
    ['compact']: [],
    ['wide']: [],
    ['state']: []
  }
  #resetStack() {
    this.#m_stack = {
      ['xx-small']: [],
      ['x-small']: [],
      ['small']: [],
      ['medium']: [],
      ['large']: [],
      ['x-large']: [],
      ['xx-large']: [],
      ['compact']: [],
      ['wide']: [],
      ['state']: []
    }
  }
  #uglify = false
  #writeStyleQuery(SPACE) {
    let
      a_stack = Object.keys(this.#m_stack),
      _xx_small = `@media screen and (max-width:${SPACE}320px)${SPACE}{\n`,
      _x_small = `@media screen and (min-width:${SPACE}321px) and (max-width:${SPACE}375px)${SPACE}{\n`,
      _small = `@media screen and (min-width:${SPACE}376px) and (max-width:${SPACE}425px)${SPACE}{\n`,
      _medium = `@media screen and (min-width:${SPACE}426px) and (max-width:${SPACE}768px)${SPACE}{\n`,
      _large = `@media screen and (min-width:${SPACE}769px) and (max-width:${SPACE}1024px)${SPACE}{\n`,
      _x_large = `@media screen and (min-width:${SPACE}1025px) and (max-width:${SPACE}1440px)${SPACE}{\n`,
      _xx_large = `@media screen and (min-width:${SPACE}1441px)${SPACE}{\n`,
      _compact = `@media screen and (max-width:${SPACE}425px)${SPACE}{\n`,
      // _medium
      _wide = `@media screen and (min-width:${SPACE}769px)${SPACE}{\n`,
      _close = '}\n',
      _s = ''
      ;
    if (this.#m_stack['xx-small'].length > 0) { _s += _xx_small; this.#m_stack['xx-small'].forEach(s => _s += s); _s += _close }
    if (this.#m_stack['x-small'].length > 0) { _s += _x_small; this.#m_stack['x-small'].forEach(s => _s += s); _s += _close }
    if (this.#m_stack['small'].length > 0) { _s += _small; this.#m_stack['small'].forEach(s => _s += s); _s += _close }
    if (this.#m_stack['medium'].length > 0) { _s += _medium; this.#m_stack['medium'].forEach(s => _s += s); _s += _close }
    if (this.#m_stack['large'].length > 0) { _s += _large; this.#m_stack['large'].forEach(s => _s += s); _s += _close }
    if (this.#m_stack['x-large'].length > 0) { _s += _x_large; this.#m_stack['x-large'].forEach(s => _s += s); _s += _close }
    if (this.#m_stack['xx-large'].length > 0) { _s += _xx_large; this.#m_stack['xx-large'].forEach(s => _s += s); _s += _close }
    if (this.#m_stack['compact'].length > 0) { _s += _compact; this.#m_stack['compact'].forEach(s => _s += s); _s += _close }
    if (this.#m_stack['wide'].length > 0) { _s += _wide; this.#m_stack['wide'].forEach(s => _s += s); _s += _close }
    if (this.#m_stack['state'].length > 0) { this.#m_stack['state'].forEach(s => _s += s); _s += _close }
    return _s
  }
  #storeQueryRule(rule, state, str_media, prop, val, SPACE) {
    if (state === 'media-xx-small') this.#m_stack['xx-small'].push(str_media)
    else if (state === 'media-x-small') this.#m_stack['x-small'].push(str_media)
    else if (state === 'media-small') this.#m_stack['small'].push(str_media)
    else if (state === 'media-medium') this.#m_stack['medium'].push(str_media)
    else if (state === 'media-large') this.#m_stack['large'].push(str_media)
    else if (state === 'media-x-large') this.#m_stack['x-large'].push(str_media)
    else if (state === 'media-xx-large') this.#m_stack['xx-large'].push(str_media)
    else if (state === 'media-compact') this.#m_stack['compact'].push(str_media)
    else if (state === 'media-wide') this.#m_stack['wide'].push(str_media)
    else this.#m_stack['state'].push(`.${rule}:${state}${SPACE}{${SPACE}${prop}:${SPACE}${val}${SPACE}}\n`)
  }
  #writeStyle() {
    let
      str = '',
      i = 0,
      SPACE = this.#uglify ? '' : ' '
      ;
    for (i; i < this.data_classes.length; i++) {
      let
        _class = this.data_classes[i].toString(),
        decl = _class.split(':'),
        len = decl.length,
        val = decl[len - 1].replaceAll('_', ' '),
        prop = decl[len - 2].replace('$', ''),
        rule = this.#uglify ? this.data_alias[i] : _class.replaceAll('$', '\\$').replace(')', '\\)').replace('(', '\\(').replaceAll('*', '\\*').replace('!', '\\!').replace('?', '\\?').replaceAll("\'", "\\'").replaceAll(':', '\\:').replace('#', '\\#').replace('.', '\\.').replace('%', '\\%')
        ;
      if (len == 2) str += `.${rule}${SPACE}{${SPACE}${prop}:${SPACE}${val}${SPACE}}\n`
      else if (len == 3) {
        let
          media = decl[len - 3].replace('$', ''),
          str_media = `${SPACE}.${rule}${SPACE}{${SPACE}${prop}:${SPACE}${val}${SPACE}}\n`
          ;
        this.#storeQueryRule(rule, media, str_media, prop, val, SPACE)
      }
      else if (len == 4) {
        let media = decl[len - 4].replace('$', ''),
          state = decl[len - 3].replace('$', ''),
          str_media = `${SPACE}.${rule}:${state}${SPACE}{${SPACE}${prop}:${SPACE}${val}${SPACE}}\n`
          ;
        this.#storeQueryRule(rule, media, str_media, prop, val, SPACE)
      }
      else if (len == 5) {
        let
          media = decl[len - 5].replace('$', ''),
          state = decl[len - 4].replace('$', ''),
          modifier = decl[len - 3].replace('$', ''),
          str_media = `${SPACE}.${rule}:${state}:${modifier}${SPACE}{${SPACE}${prop}:${SPACE}${val}${SPACE}}\n`
          ;
        this.#storeQueryRule(rule, media, str_media, prop, val, SPACE)
      }
      else str += `/*[${rule}] [${prop}] [${val}]*/`
    }
    str += this.#writeStyleQuery(SPACE)
    if (this.#uglify) {
      let style = document.getElementById(this.style_id)
      style.innerHTML = str
    }
    else {
      if (document.getElementById(this.style_id) != null) document.getElementById(this.style_id).innerHTML = str
      else {
        let style = document.createElement('style')
        style.id = this.style_id
        style.innerHTML = str
        document.head.appendChild(style)
      }
    }
  }
  #randomID(n = 3) {
    const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    return [...Array(n)].reduce(a => a + A[~~(Math.random() * A.length)], '')
  }
  #storeClassAndAlias(class_list) {
    for (let chunk of class_list) {
      if (chunk.substring(0, 1) != '$') continue
      if (!this.data_classes.includes(chunk)) {
        this.data_classes.push(chunk)
        if (!this.data_alias.includes(this.#randomID())) this.data_alias.push(this.#randomID())
      }
    }
  }
  #registerElements(el) {
    for (let i = 0; i < el.length; i++) {
      if (el[i].classList.length != 0) {
        if (this.#uglify) {
          for (let a = 0; a < this.data_classes.length; a++) {
            el[i].classList.replace(this.data_classes[a], this.data_alias[a])
          }
        }
        else {
          this.#storeClassAndAlias(el[i].classList)
        }
      }
      this.#registerElements(el[i].children)
    }
  }
  start() {
    let el = document.querySelectorAll(this.scope_query)
    this.#registerElements(el)
    this.#writeStyle()
  }
  uglify() {
    this.#resetStack()
    this.#uglify = true
    this.start()
  }
  get data_config() {
    return this.style_id + '_config = {classes:' + JSON.stringify(this.data_classes, 0, 2) + ',alias:' + JSON.stringify(this.data_alias, 0, 2) + '}'
  }
  get data_style() {
    return document.getElementById(this.style_id).innerHTML
  }
  downloadCofig(name) {
    let
      file_name = name === undefined ? this.style_id + '_config.js' : name,
      file = new File([this.data_config], file_name, { type: "text/javascript;charset=utf-8" })
      ;
    saveAs(file)
  }
  downloadCSS(name) {
    var
      file_name = name === undefined ? this.style_id + '.css' : name,
      file = new File([this.data_style], file_name, { type: "text/css;charset=utf-8" })
      ;
    saveAs(file)
  }
  downloadHTML(scope) {
    scope = scope === undefined ? document.querySelector(this.scope_query) : scope
    var
      content = scope.outerHTML,
      file_name = this.style_id + '.html',
      file = new File([content], file_name, { type: "text/html;charset=utf-8" })
      ;
    saveAs(file)
  }
}