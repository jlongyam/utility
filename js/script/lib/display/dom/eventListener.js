script({ name: 'dom.eventListener' });

dom.eventListener = {
  add: function( o, s_ev, f ) {
    if( o.addEventListener ) o.addEventListener( s_ev, f, false );
    else if( o.attachEvent ) o.attachEvent( 'on'+s_ev, f );
    else return false
  },
  remove: function( o, s_ev, f ) {
    if( o.removeEventListener ) o.removeEventListener( s_e, f );
    else if( o.detachEvent ) o.detachEvent( 'on'+s_ev, f );
    else return false
  }
}
