script({ name: 'object.chain.renameProperty' });

object.chain.extend({
  renameProperty: function(s_from,s_to) {
    if(this.hasProperty(s_from) && !this.hasProperty(s_to) ) {
      for( var i in this.args ) {
        if(i === s_from) {
          this.args[s_to] = this.args[s_from];
          delete this.args[s_from];
        }
      }
      if(this.args['events']) {
        if(this.args['events']['rename'].length > 0 ) {
          var a_events = this.args['events']['rename'], i;
          for( i in a_events ) a_events[i].call(false,s_from,s_to);
        }
      }
    }
    return this.valueOf();
  }
});