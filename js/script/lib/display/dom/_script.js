// == object == //

if( typeof object === 'undefined' ) object = {}
object.type = function(any) {
  var str = Object.prototype.toString.call(any);
  return str.split(' ')[1].replace(']','');
};
object.extend = function() {
  for( var i = 0; i < arguments.length; i++ ) {
    for( key in arguments[i] ) {
      var property = arguments[i][key]
      if( typeof property === 'object' ) {
        this[key].extend = this.extend;
        this[key].extend(property);
      }
      else {
        this[key] = this[key] || property;
      }
    }
  }
  delete this.extend;
  return this; 
}
object['Function'] = function() {
  this.args = undefined;
  this.valueOf = function() { return this.args };
  this.extend = object.extend;
};
object['function'] = new object['Function']();
function object(obj){
  object['function'].args = obj;
  return object['function'];
}
object['function'].extend({
  forEach: function( f_cb ) {
    if( typeof f_cb !== 'function' ) return;
    for( i in this.args ) f_cb(this.args[i], i)
  },
  hasProperty: function(search) {
    var bool = false;
    search = search.toString();
    for( var i in this.args ) {
      if( i === search ) {
        bool = true;
        break;
      }
    }
    return bool;
  }
})
object.keys = function(obj) {
  var keys = [];
  for( var i in obj) { if( object(obj).hasProperty(i) ) keys.push(i) }
  return keys;
}
object.stringify = function(input) {
  return String(input);
}

// == array == //

if( typeof array === 'undefined' ) array = {}
array['function'] = new object['Function']();
array.extend = object.extend;
function array(arr) {
  //var a = []
  //if(object.type(arr) !== 'Array' ) a.push(arr)
  array['function'].args = arr;
  return array['function'];
}
array['function'].extend({
  has: function(i) {
    return this.args.indexOf(i) >= 0
  },
  join: function(spacer) {
    var sp = object.type(spacer) === 'String' ? spacer : ',', str = '', l = this.args.length;
    object(this.args).forEach(function(v,k) {
      str += v;
      if(parseInt(k) !== l-1 ) str += sp
    });
    return str;
  },
  forEach: function( f_cb ) {
    if( typeof f_cb !== 'function' ) return;
    for( i in this.args ) f_cb(this.args[i], i);
  }
})

// == string == //

if( typeof string === 'undefined' ) string = {}
string['function'] = new object['Function']();
string.extend = object.extend;
function string(str) {
  if( object.type(str) !== 'String' ) return;
  string['function'].args = str;
  return string['function'];
}
string['function'].extend({
  has: function(s) {
    return this.args.indexOf(s) >= 0
  },
  replaceAll: function(s_from, s_to) {
    function replace( str, _s, s_ ) {
      s = ''
      if(string(str).has(_s)) { 
        s = str.replace(_s,s_)
        if(string(s).has(_s)) replace(s,_s,s_)
      }
      return s
    }
    this.args = replace(this.args,s_from,s_to);
    return this;
  },
  lowerCase: function() {
    this.args = this.args.toLowerCase()
    return this;
  }
});


function script(args){
  if(args) var name = args.name, require = args.require;
  if(name && ( name in window ) ) {
    
    when( window,'load', window[name] );
  }
  if(require) {
    function load(url) {
      var d = document, head = d.getElementsByTagName('head')[0];
      var file_type = url.split('.').pop(), new_url = url, base = script.path.base;
      if(base.element) new_url = base.actual + url
      if(file_type === 'js') {
        var new_script = document.createElement('script');
        new_script.src = new_url;
        head.appendChild(new_script);
        new_script.onload = function() {
          //head.removeChild(el)
        }
      }
    }
    if(typeof require === 'string' ) load(require)
    else for( url in require ) load(require[url])
  }
  
}
script.current = function() {
  var d = document;
  return d.currentScript || d.scripts[d.scripts.length-1];
}
script.internal = script.current()
script.path = {}
script.path.file = script.internal.getAttribute('src');
script.path.dir = script.path.file.replace('script.js','');
script.path.base = (function(){
  var
    element = (function() {
      var base = document.getElementsByTagName('base')[0];
      if(base) return base.getAttribute('href');
      else return false;
    }()),
    href = location.href.replace('file://',''),
    relative = (function() {
      // IE-fix, alias: script.internal.baseURI.replace('file://',''),
      if(element) {
        var i_element = element.split('/').length;
        var a_href = href.split('/'), a_result = [];
        for(var i = 0; i < a_href.length - i_element; i++ ){
          a_result.push(a_href[i])
        }
        return a_result.join('/')+'/';
      }
      else return href
    }()),
    rest = href.substring(relative.length),
    actual = rest.substring(0,rest.lastIndexOf('/')+1),
    file = href.split('/').pop()    
  ;
  return {
    element: element,
    href: href,
    relative: relative,
    rest: rest,
    actual: actual,
    file: file
  }
}())
script.test = function( option, stringify ) {
  var config = {
    name: option.name || 'Test',
    call: option.call ? option.call() : 0,
    should: typeof option.should === 'boolean' ? option.should.toString() : option.should || '0'
  };
  var result = {
    test: config.name,
    should: config.should,
    pass: (config.should.toString() === config.call.toString())
  }
  if( stringify ) {
    if(typeof JSON === 'undefined') {
      var s = '';
      for( k in result ) s += k+': '+result[k]+'<br>\n'
      return s;   
    }
    else JSON.stringify( result, 0, 2 );
  }
  else return result;
};

// == console == //

if( 'console' in window ) var Console = console;
var console = {};
console.dev = false;
console.input = false;
console.html = true;
console.setup = function() {
  var d = document, head = d.getElementsByTagName('head')[0],url;
  var console_box = d.createElement('div');
  console_box.id = 'console_box';
  d.body.appendChild(console_box);
  var console_output = d.createElement('div');
  console_output.id = 'console_output';
  console_box.appendChild(console_output);
  var console_link = d.createElement('link');
  console_link.id = 'console_link';
  console_link.rel = 'stylesheet';
  console_link.href = script.path.dir + 'script.css';
  head.insertBefore(console_link, d.scripts[0]);
};

// -- console.log -- //
console.log = function(){
  if( !( 'console_output' in window ) ) console.setup();
  var line = document.createElement('div');
  line.className = 'console log';
  for( var i = 0; i < arguments.length; i ++ ) {
    if( console.dev ) Console.log(arguments[i]);
    if( console.html) line.innerHTML += arguments[i];
    else line.innerHTML += string(arguments[i]).replaceAll('<','&lt;').replaceAll('>','&gt');
  }
  console_output.appendChild(line);
}
