script({ name: 'array' });

function array(args) {
  if(typeof args !== 'object' || ''+args === '[object Object]') return String(args);
  else {
    array.chain.args = args;
    return array.chain
  }
}
array.chain = {
  args: undefined,
  valueOf: function() {
    return this.args
  },
  toString: function() {
    return String(this.args)
  },
  extend: function(o) {
    for( var i in o ) this[i] = o[i];
    return this
  } 
}
