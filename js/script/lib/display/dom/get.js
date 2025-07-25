script({ name: 'dom.get' });

if( typeof dom === 'undefined' ) dom = {};

dom.get = function(s_tag, o_attribute ) {
  var d = document, els = d.getElementsByTagName(s_tag);
  if( els.length === 1 ) return els[0];
  if( o_attribute ) {
    var a_tag = [], i;
    for( i = 0; i < els.length; i++ ) {
      // if o_attribute is string, attribute only
      // if o_attribute is array, multiple attribute
      // if o_attribute is object, key value attribute
      var el = els[i], a_attribute = Object.keys( o_attribute ), n;
      for( n = 0; n < a_attribute.length; n++ ) {
        if( el.getAttribute(a_attribute[n]) !== null ) {
          if( el.getAttribute(a_attribute[n]) === o_attribute[a_attribute[n]] ) {
            a_tag.push(el);
          } 
        }
      }
    }
    return a_tag;
  }
  else return els
}
