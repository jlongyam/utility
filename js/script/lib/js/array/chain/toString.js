script({ name: 'array.chain.toString' });

array.chain.extend({
  toString: function(spacer) {
    if(!spacer && typeof spacer !== 'string' ) return String(this.args)
    else {
      var
        sp = typeof spacer === 'string' ? spacer : ',',
        str = '', l = this.args.length
      ;
      this.forEach(function(v,k) {
        str += v, k = parseInt(k);
        if(k !== l-1 ) str += sp
      });
      return str; 
    }
  }
});