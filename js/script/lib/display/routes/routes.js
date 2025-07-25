function routes() {
  var s_base = location.hash.substring(location.hash.indexOf('/')+1),
    b_slash = [], a_tail = [], s_rest = [], l = arguments.length, i
  ;
  for( i = 0; i < l; i++ ) {
    if( i === 0 ) {
      b_slash[0] = (s_base.indexOf('/') >= 0);
      if(!b_slash[0]) {
        a_tail[0] = s_base.substring(0);
        s_rest[0] = '';
      }
      else {
        a_tail[0] = s_base.substring(0,s_base.indexOf('/'));
        s_rest[0] = s_base.substring(s_base.indexOf('/')+1)
      } 
    }
    else {
      var s_rest_i = parseInt(i<1)
      b_slash[i] = (s_rest[(i-1)].indexOf('/') >= 0);
      if(!b_slash[i]) {
        a_tail[i] = s_rest[(i-1)].substring(0);
        s_rest[i] = '';
      }
      else {
        a_tail[i] = s_rest[(i-1)].substring(0,s_rest[(i-1)].indexOf('/'));
        s_rest[i] = s_rest[(i-1)].substring(s_rest[(i-1)].indexOf('/')+1);
      }  
    }
    if( typeof arguments[i] === 'function') {
      arguments[i].call(false,a_tail[i],s_rest[i]);
    }
  }
}