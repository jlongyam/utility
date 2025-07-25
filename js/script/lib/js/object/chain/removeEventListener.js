script({ name: 'object.chain.removeEventListener' });

object.chain.extend({
  removeEventListener: function(s_event,t_name) {
    if(!this.args['events'] || !s_event) return false;
    else {
      if(!t_name && t_name !== 0) {
        this.args['events'][s_event] = [];
        return  this.args['events'][s_event];
      }
      else {
        var a_events = this.args['events'][s_event], i, a_new = [];
        if(t_name === 0 || typeof t_name === 'number') {
          for( i in a_events ) {
            if(t_name === parseInt(i)) continue;
            a_new.push(a_events[i]);
          }
          this.args['events'][s_event] = a_new;
        }
        if(typeof t_name === 'string') {
          var i_pos = parseInt(this.getEventListener(s_event,t_name));
          for( i in a_events ) {
            if(i_pos === parseInt(i)) continue;
            a_new.push(a_events[i]);
          }
          this.args['events'][s_event] = a_new;
        }
        return this.valueOf();
      }
    }
  }
});