script({ name: 'object.chain.deleteProperty' });

object.chain.extend({
  deleteProperty: function(s_key) {
    if( this.hasProperty(s_key) ) delete this.args[s_key];
    if(this.args['events']) {
      if(this.args['events']['delete'].length > 0 ) {
        var a_events = this.args['events']['delete'], i;
        for( i in a_events ) a_events[i].call(false,s_key);
      }
    }
    return this.valueOf();
  }
});