script({ name: 'array.chain.indexAll' });

array.chain.extend({
  indexAll: function(val) {
    if(val || val === 0) {
      var arr = [], l = this.args.length, i;
      for( i = 0; i < l; i++ ) {
        if(this.args[i] === val ) arr.push(i)
      }
      return arr
    }
    else return false
  }
})