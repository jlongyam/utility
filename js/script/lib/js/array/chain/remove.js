script({ name: 'array.chain.remove' });

array.chain.extend({
  remove: function(val, pos) {
    if(val||val === 0) {
      var arr = [], l = this.args.length, i;
      if(pos || pos === 0) {    
        for( i = 0; i < l; i++ ) {
          if(i === pos && this.args[i] === val) this.args.splice(i,1)
        }
      }
      else {
        for( i = 0; i < l; i++ ) {
          if(this.args[i] === val ) this.args.splice(i,1)
        }
      }
      if(this.args['events']) {
        if(this.args['events']['remove'].length > 0 ) {
          var a_events = this.args['events']['remove'], i;
          for( i in a_events ) a_events[i].call(false,val,pos);
        }
      }
    }
    else delete this.args
    return this
  }
});