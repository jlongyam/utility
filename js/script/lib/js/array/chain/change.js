script({ name: 'array.chain.change' });

array.chain.extend({
  change: function(from,to,pos) {
    if((from||from === 0) && (to||to === 0)) {
      var l = this.args.length, i;
      if(pos||pos === 0) {
        for( i = 0; i < l; i++ ) {
          if(i === pos && this.args[i] === from ) this.args[i] = to
        }
      }
      else {
        for( i = 0; i < l; i++ ) {
          if(this.args[i] === from ) this.args[i] = to
        }
      }
      if(this.args['events']) {
        if(this.args['events']['change'].length > 0 ) {
          var a_events = this.args['events']['change'], i;
          for( i in a_events ) a_events[i].call(false,from,to,pos);
        }
      }
      return this
    }
    else return false
    
  }
});