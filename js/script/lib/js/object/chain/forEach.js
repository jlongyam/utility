script({ name: 'object.chain.forEach' });

object.chain.extend({
  forEach: function( f_cb ) {
    if( typeof f_cb !== 'function' ) return;
    for( i in this.args ) f_cb(this.args[i], i)
  }
});
