script({ name: 'object.chain.removeProperty' });

object.chain.extend({
  removeProperty: function(s_key) {
    if( this.hasProperty(s_key) ) delete this.args[s_key];
    if(this.args['events']) {
      if(this.args['events']['remove'].length > 0 ) {
        var a_events = this.args['events']['remove'], i;
        for( i in a_events ) a_events[i].call(false,s_key);
      }
    }
    return this.valueOf();
  }
});