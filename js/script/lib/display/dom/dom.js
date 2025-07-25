(function(w,d){
  if( typeof dom === 'undefined' ) dom = {};

  dom.write = function(s_epression) {
    d.write(s_epression)
  };

  // Result in IE7: head late, body first, Problem!
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
  };

  dom.createElement = function( option ) {
    option = option || {}
    var config = {
      name: option.name || false,
      atribute: option.attribute || false,
      property: option.property || false,
      parent: option.parent || false
    }, el = false;
    if(config.name) el = d.createElement( config.name );
    if(config.property) {
      var prop = config.property;
      for( i in prop ) el[i] = prop[i];
    }
    if(config.attribute) {
      var attr = config.attribute;
      for( i in attribute ) el.setAttribute(i, attr[i]);
    }
    if(config.parent) config.parent.appendChild(el);
    else return el;
  };
  
  w.dom = dom;   
}(window,document));



/*
*/