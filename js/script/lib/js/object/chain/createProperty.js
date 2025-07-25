script({ name: 'object.chain.createProperty' });

object.chain.extend({
  createProperty: function(s_key,s_val) {
    if( !this.hasProperty(s_key) ) {
      this.args[s_key] = s_val;
      if(this.args['events']) {
        if(this.args['events']['create'].length > 0 ) {
          var a_events = this.args['events']['create'], i;
          for( i in a_events ) a_events[i].call(false,s_key,s_val);
        }
      }
    }
    return this;
  }
});