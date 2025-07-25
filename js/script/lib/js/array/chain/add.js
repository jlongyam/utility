script({ name: 'array.chain.add' });

array.chain.extend({
  add: function(val,pos) {
    
    if(pos || pos === 0) {    
      if(typeof pos === 'string') {
        if(pos === 'first') this.args.unshift(val)
        else if(pos === 'last') this.args.push(val)
        else return false
      }
      else if(typeof pos === 'number') this.args.splice(pos,0,val)
      else return false
    }
    else this.args.push(val)
    if(this.args['events']) {
      if(this.args['events']['add'].length > 0 ) {
        var a_events = this.args['events']['add'], i;
        for( i in a_events ) a_events[i].call(false,val,pos);
      }
    }
    return this
  }
});