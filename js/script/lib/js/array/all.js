// == object == //

if( typeof object === 'undefined' ) object = {}
object.type = function(any) {
  var str = Object.prototype.toString.call(any);
  return str.split(' ')[1].replace(']','');
};


// == array == //

if( typeof array === 'undefined' ) array = {}
array['function'] = new object['Function']();
array.extend = object.extend;
function array(arr) {
  //var a = []
  //if(object.type(arr) !== 'Array' ) a.push(arr)
  array['function'].args = arr;
  return array['function'];
}
array['function'].extend({
  has: function(i) {
    return this.args.indexOf(i) >= 0
  },
  join: function(spacer) {
    var sp = object.type(spacer) === 'String' ? spacer : ',', str = '', l = this.args.length;
    object(this.args).forEach(function(v,k) {
      str += v;
      if(parseInt(k) !== l-1 ) str += sp
    });
    return str;
  },
  forEach: function( f_cb ) {
    if( typeof f_cb !== 'function' ) return;
    for( i in this.args ) f_cb(this.args[i], i);
  }
})

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