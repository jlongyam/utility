script({ name: 'array.keys' });

array.keys = function(arr) {
  if( object.type(arr) !== 'Array' ) return false
  else return object.keys(arr)
}