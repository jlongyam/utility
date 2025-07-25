script({ name: 'object.chain.hasProperty' });

object.chain.extend({
  hasProperty: function(search) {
    var bool = false;
    search = search.toString();
    for( var i in this.args ) {
      if( i === search ) {
        bool = true;
        break;
      }
    }
    return bool;
  }
});
