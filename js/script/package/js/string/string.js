(function(main,execute){
  var package = { js: { string: main } };
  if(typeof script === 'function') {
    script({
      package: script.package,
      export: package
    }, execute)
  }
  if(typeof define === 'function') {
    define(function(){
      execute(package);
      return package.js.string
    })
  }
  if(typeof window === 'object' ) {
    window.string = main
    execute(package);
  }
  if(typeof module === 'object' ) {
    module.exports = main
    execute(package);
  }
})(function(s){
  return s
},function(package){
  var string = package.js.string;
  string.index = 'INDEX';
});
