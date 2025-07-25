script({ name: 'object.type' });

object.type = function(input) {
  var str = Object.prototype.toString.call(input);
  return str.split(' ')[1].replace(']','');
};