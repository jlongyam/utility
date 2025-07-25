script({ name: 'dom.createElement' });

dom.createElement = function( s_name, o_prop, o_parent ) {
  var d = document, el = d.createElement(s_name);
  if(o_prop) for( i in o_prop ) el[i] = o_prop[i];
  if(o_parent) o_parent.appendChild(el);
  else return el;
};
