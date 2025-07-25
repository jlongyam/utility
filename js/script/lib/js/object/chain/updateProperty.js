script({ name: 'object.chain.updateProperty' });

object.chain.extend({
  updateProperty: function(s_key,s_value) {
    if( this.hasProperty(s_key) ) this.args[s_key] = s_value;
    if(this.args['events']) {
      if(this.args['events']['update'].length > 0 ) {
        var a_events = this.args['events']['update'], i;
        for( i in a_events ) a_events[i].call(false,s_key,s_value);
      }
    }
    return this.valueOf();
  }
});