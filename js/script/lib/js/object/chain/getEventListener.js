script({ name: 'object.chain.getEventListener' });

object.chain.extend({
  getEventListener: function(s_event,s_fname) {
    if(!this.args['events'] || !s_event) return false;
    else {
      var a_name = this.args['events'][s_event];
      var s_result = '';
      if(!s_fname) {
        for( var i in a_name ) {
          s_result += i+',';
          s_result += (!a_name[i].name ? 'anon': 'name' );
          s_result += (!a_name[i].name ? '': ','+a_name[i].name )+'\n'; 
        }
        return s_result;
      }
      else {
        var n = -1;
        for( var i in a_name ) {
          if(a_name[i].name === s_fname) {
            n = i;
            break;
          }
        }
        return n;
      }
    }
  }
});