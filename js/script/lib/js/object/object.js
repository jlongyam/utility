script({ name: 'object' });

function object(args){
  if( typeof args !== 'object' ) return String(args);
  else {
    object.chain.args = args;
    return object.chain;  
  }
}
object.chain = {
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
};
