script({ name: 'object.keys' });

object.keys = function(obj) {
  var keys = [];
  for( var i in obj) { if( object(obj).hasProperty(i) ) keys.push(i) }
  return keys;
};
