// == string == //

if( typeof string === 'undefined' ) string = {}
string['function'] = new object['Function']();
string.extend = object.extend;
function string(str) {
  if( object.type(str) !== 'String' ) return;
  string['function'].args = str;
  return string['function'];
}
string['function'].extend({
  has: function(s) {
    return this.args.indexOf(s) >= 0
  },
  replaceAll: function(s_from, s_to) {
    function replace( str, _s, s_ ) {
      s = ''
      if(string(str).has(_s)) { 
        s = str.replace(_s,s_)
        if(string(s).has(_s)) replace(s,_s,s_)
      }
      return s
    }
    this.args = replace(this.args,s_from,s_to);
    return this;
  },
  lowerCase: function() {
    this.args = this.args.toLowerCase()
    return this;
  }
});