class Router {
  constructor(map = {}) {
    this.map = map
    window.addEventListener('hashchange', async () => {
      this._listen
    })
    if (window.location.hash.length > 0) {
      this._listen
    }
  }
  _exec(hash, vars, args) {
    // evaluate map, then comparison
    let maps = Object.keys(this.map)
    let key = false, cb = false;
    // find key and cb by URL hash
    // ========================================================
    // let report = '' // DON't delete this comments
    // report += '\n'
    // report += 'location.hash: ' + location.hash + '\n'
    // report += '====================================\n'
    // report += 'hash: ' + hash + '\n'
    // report += 'vars: ' + vars + '\n'
    // report += 'args: ' + args + '\n'
    // report += '====================================\n'
    // report += 'select: ' + 'this.map[' + hash + args + ']' + '\n'
    // report += 'cb: (' + args + ')\n'
    // report += '====================================\n'
    // console.log(report)
    // ========================================================
    for (let i = 0; i < maps.length; i++) {
      try {
        if ('' + args === 'undefined') this.map[hash].call()
      else {
        let _args = ':' + args.join('/:')
        this.map[hash + _args].apply(null, vars)
      }
      }
      catch(e) {
        console.log(e.message )
      }
      
    }
  }
  _sort(match, hash) {
    for (let i = 0; i < match.length; i++) {
      let map = match[i]['map']
      let tail = hash.substring(map.length)
      let arg = match[i]['variable']
      if (tail.length === 0) {
        if (arg.length === 0) this._exec(map)
      }
      else { // tail.length > 0
        if (arg.length > 0) {
          let hash_no_tail = tail.substring(0, tail.length - 1)
          let a_hash = hash_no_tail.split('/')
          if (a_hash.length === arg.length) this._exec(map, a_hash, arg)
        }
      }
    }
  }
  get _filter() {
    const maps = Object.keys(this.map)
    let a = []
    for (let i = 0; i < maps.length; i++) {
      let hashs = maps[i].split(':')
      let base = hashs[0]
      let normalize = base.substring(base.length - 1) != '/' ? base + '/' : base
      let vars = []
      for (let u = 0; u < hashs.length; u++) {
        if (hashs[u] === base) continue
        let a_hash_u = hashs[u].split('/')
        if (a_hash_u.includes('')) a_hash_u.pop()
        vars.push(a_hash_u)
      }
      a.push({
        hash: maps[i],
        base: normalize,
        variable: vars,
      })
    }
    return a
  }
  get _listen() {
    const hash = decodeURI(window.location.hash)
    let tail = hash.substring(hash.length, hash.length - 1)
    let normalize = tail === '/' ? hash : hash + '/'
    let a = []
    for (let i = 0; i < this._filter.length; i++) {
      let base = this._filter[i]['base']
      if (normalize.indexOf(base) != -1) {
        a.push({
          map: base,
          variable: this._filter[i]['variable']
        })
      }
    }
    this._sort(a, normalize)
    return {
      hash: hash,
      normalize: normalize,
      match: a
    }
  }
}