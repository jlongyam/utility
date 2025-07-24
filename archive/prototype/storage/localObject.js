// https://hacks.mozilla.org/2009/06/localstorage/
// look up sessionStorage.__proto__
// and     localStorage.__proto__
Storage.prototype.setObject = function( key, value ) {
  this.setItem(key, JSON.stringify(value))
}
Storage.prototype.getObject = function( key ) {
  return JSON.parse(this.getItem(key))
}
