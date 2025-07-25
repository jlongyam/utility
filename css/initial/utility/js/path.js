class Path {
  constructor(location = typeof self === 'undefined' ? __filename : self.location) {
    this.location = location
    return this.location
  }
  #separator(path = this.location) {
    return (path.indexOf("/") !== -1) ? "/" : "\\"
  }
  #rest(path = this.location) {
    let
      sub = this.directory(path),
      n = path.length - sub.length
      ;
    return path.substring(0, path.length - n) + this.#separator(path)
  }
  directory(path = this.location) {
    return path.substring(0, path.lastIndexOf(this.#separator(path)))
  }
  up(num = 1, path = this.location) {
    let sep = this.#separator(path)
    let dir = this.directory(path)
    let loc = dir.split(sep)
    return path.split(sep).slice(0, (loc.length - num)).join(sep)
  }
  root(part = this.directory().split(this.#separator()).pop()) {
    return this.location.substring(0, this.location.indexOf(part)) + part
  }
  name(path = this.location) {
    let rest = this.#rest(path)
    return path.substring(rest.length)
  }
  relative(target_location, path = this.location) {
    let
      sep = this.#separator(path),
      tail = target_location.substring(target_location.length - sep.length)
      ;
    target_location = tail !== sep ? target_location + sep : target_location
    let
      n_start = path.indexOf(target_location) + target_location.length,
      s_rest = path.substring(n_start),
      s_clean = this.#rest(s_rest),
      n = s_clean.split(sep).length - sep.length,
      buff = '..' + sep
      ;
    return buff.repeat(n)
  }
}
if (typeof module != 'undefined' && module.exports) module.exports = new Path()
