script({ name: 'object.chain.addProperty' });

object.chain.extend({
  addProperty: function(s_key,s_val) {
    if( !this.hasProperty(s_key) ) {
      this.args[s_key] = s_val;
      if(this.args['events']) {
        if(this.args['events']['add'].length > 0 ) {
          var a_events = this.args['events']['add'], i;
          for( i in a_events ) a_events[i].call(false,s_key,s_val);
        }
      }
    }
    return this;
  }
});