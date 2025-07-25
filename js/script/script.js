if( !('currentScript' in document ) ) {
  Object.defineProperty( Document.prototype, 'currentScript', {
    get: function() { return document.scripts[document.scripts.length-1] }
  });
}
document.write(
'<style id="console_style">'+[
  '#console_box {',
  '  box-sizing: border-box;',
  '  border: 2px solid whitesmoke;',
  '  font: 16px/1.25 Monaco, Consolas, "Roboto Mono", "Ubuntu Monospace", monospace;',
  '}',
  '#console_output {',
  '  padding: 8px;',
  '  padding-bottom: 0;',
  '}',
  '#console_input {}',
  '.console {',
  '  border-left: 8px solid gray;',
  '  padding: 8px;',
  '  margin-bottom: 8px;',
  '  background-color: black;',
  '  white-space: pre;',
  '  overflow: auto;',
  '}',
  '.console.log { color: silver; }',
  '.console.error { color: red; }',
  '.console.warn { color: orange; }',
  '.console.info { color: white; }',
  '.console.debug { color: green; }'
].join('\n')+'</style>');
if( 'console' in window ) var Console = console;
var console = {
  dev: false,
  input: false,
  html: true
};
console.setup = function() {
  var console_box = document.createElement('div');
  console_box.id = 'console_box';
  document.body.appendChild(console_box);
  var console_output = document.createElement('div');
  console_output.id = 'console_output';
  console_box.appendChild(console_output);
};
console.log = function(){
  if( !( 'console_output' in window ) ) console.setup();
  var line = document.createElement('div');
  line.className = 'console log';
  for( var i = 0; i < arguments.length; i ++ ) {
    if( console.dev ) Console.log(arguments[i]);
    if( console.html) line.innerHTML += arguments[i];
    else line.textContent += arguments[i];
  }
  console_output.appendChild(line);
};
console.error = function(){
  if( !( 'console_output' in window ) ) console.setup();
  var line = document.createElement('div');
  line.className = 'console error';
  for( var i = 0; i < arguments.length; i ++ ) {
    if( console.dev ) Console.error(arguments[i]);
    if( console.html) line.innerHTML += arguments[i];
    else line.innerText += arguments[i];
  }
  console_output.appendChild(line);
};
console.warn = function(){
  if( !( 'console_output' in window ) ) console.setup();
  var line = document.createElement('div');
  line.className = 'console warn';
  for( var i = 0; i < arguments.length; i ++ ) {
    if( console.dev ) Console.warn(arguments[i]);
    if( console.html) line.innerHTML += arguments[i];
    else line.innerText += arguments[i];
  }
  console_output.appendChild(line);
};
console.info = function(){
  if( !( 'console_output' in window ) ) console.setup();
  var line = document.createElement('div');
  line.className = 'console info';
  for( var i = 0; i < arguments.length; i ++ ) {
    if( console.dev ) Console.info(arguments[i]);
    if( console.html) line.innerHTML += arguments[i];
    else line.innerText += arguments[i];
  }
  console_output.appendChild(line);
};
console.debug = function(){
  if( !( 'console_output' in window ) ) console.setup();
  var line = document.createElement('div');
  line.className = 'console debug';
  for( var i = 0; i < arguments.length; i ++ ) {
    if( console.dev ) Console.debug(arguments[i]);
    if( console.html) line.innerHTML += arguments[i];
    else line.innerText += arguments[i];
  }
  console_output.appendChild(line);
};

// optional
function execute(f) {
  try {
    f.call()
  } catch(e) { throw e.message }
  return {
    then: function(f_next) {
      try {
        f_next.call();
        return this
      } catch(e) { throw e.message }
    }
  }
}
var browser = (function() {
  var n = navigator, ua = n.userAgent.toLowerCase(),
  is = _is(), engine = _engine(), brand = _brand(), name = _name();
  function _is() {
    return {
      trident: ua.indexOf('trident') >= 0,
      webkit: ua.indexOf('applewebkit') >= 0,
      gecko: ua.indexOf('gecko') >= 0,
      ie: ua.indexOf('msie') >= 0,
      safari: ua.indexOf('safari') >= 0,
      firefox: ua.indexOf('firefox') >= 0,
      chrome: ua.indexOf('chrome') >= 0,
      epiphany: ua.indexOf('epiphany') >= 0,
      opr: ua.indexOf('opr') >= 0,
      rv: ua.indexOf('rv') >= 0
    }
  }
  function _engine() {
    var s_result = '';
    if(is.trident && !is.gecko ) s_result = 'trident';
    else if(is.trident && is.gecko ) s_result = 'trident';
    else if(is.safari && is.webkit && !is.chrome) s_result = 'webkit';
    else if(is.firefox && is.gecko) s_result = 'gecko';
    else if(is.chrome && is.webkit) s_result = 'blink';
    return s_result; 
  }
  function _brand() {
    var s_result = '';
    if(n.userAgentData) s_result = n.userAgentData.brands[1].brand.toLowerCase();
    return s_result;
  }
  function _name() {
    var s_result = ''
    if(engine === 'trident' && is.ie ) s_result = 'ie';
    else if(engine === 'trident' && is.rv ) s_result = 'ie';
    else if(is.epiphany) s_result = 'epiphany';
    else if(is.safari && !is.chrome) s_result = 'safari';
    else if(is.firefox) s_result = 'firefox';
    else if(brand === 'chromium') s_result = 'chromium';
    else if(is.chrome && engine === 'blink' && !is.opr ) s_result = 'chrome';
    else if(is.opr && engine === 'blink') s_result = 'opera';    
    return s_result; 
  }
  function _version() {
    var s_chunk = '', i_chunk = 0, i_end = 0, s_ver = '';
    if(name === 'ie' && !is.rv) {
      i_chunk = ua.indexOf('msie');
      s_chunk = ua.substring(i_chunk);
      i_end = s_chunk.indexOf(';');
      s_ver = s_chunk.substring(0,i_end).split(' ')[1].split('.')[0];
    }
    else if(name === 'ie' && is.rv) {
      i_chunk = ua.indexOf('rv');
      s_chunk = ua.substring(i_chunk);
      i_end = s_chunk.indexOf(')');
      s_ver = s_chunk.substring(3,i_end).split('.')[0]
    }
    else if( name === 'safari' ) {
      i_chunk = ua.indexOf('version');
      s_chunk = ua.substring(i_chunk);
      i_end = s_chunk.indexOf(' ');
      s_ver = s_chunk.substring(8,i_end).split('.')[0]
    }
    else if( name === 'firefox') {
      i_chunk = ua.indexOf('firefox');
      s_chunk = ua.substring(i_chunk);
      i_end = s_chunk.length;
      s_ver = s_chunk.substring(8).split('.')[0];
    }
    else if( name === 'chrome' ) {
      i_chunk = ua.indexOf('chrome');
      s_chunk = ua.substring(i_chunk);
      i_end = s_chunk.indexOf(' ');
      s_ver = s_chunk.substring(7,i_end).split('.')[0]
    }
    else if( name === 'opera' ) {
      i_chunk = ua.indexOf('opr');
      s_chunk = ua.substring(i_chunk);
      i_end = s_chunk.length;
      s_ver = s_chunk.substring(4,i_end).split('.')[0]
    }
    else if( name === 'chromium' ) {
      i_chunk = ua.indexOf('chrome');
      s_chunk = ua.substring(i_chunk);
      i_end = s_chunk.indexOf(' ');
      s_ver = s_chunk.substring(7,i_end).split('.')[0]
    }
    else if( name === 'epiphany' ) {
      i_chunk = ua.indexOf('epiphany');
      s_chunk = ua.substring(i_chunk);
      i_end = s_chunk.length;
      s_ver = s_chunk.substring(9,i_end).split('.')[0]
    }
    return s_ver;
  }
  function _os() {
    var s_result = '';
    if( ua.indexOf('windows') >= 0 ) s_result = 'windows';
    else if( ua.indexOf('linux') >= 0 ) s_result = 'linux';
    return s_result;
  }
  function _cpu() {
    var s_result = ''
    if(n.cpuClass) s_result = n.cpuClass
    else if(n.platform) {
      var cpu = n.platform.toLowerCase();
      if(cpu === 'win32') s_result = 'x86';
      else if(cpu.indexOf('i686') >=0 ) s_result = 'x86';
      else if(cpu.indexOf('x86_64') >=0 ) s_result = 'x86_64';
    }
    return s_result;
  }
  function _lang() {
    var s_result = '';
    if(n.language) s_result = n.language;
    else if(n.browserLanguage) s_result = n.browserLanguage
    return s_result;
  }
  return {
    is: _is(),
    engine: _engine(),
    brand: _brand(),
    name: _name(),
    version: _version(),
    os: _os(),
    cpu: _cpu(),
    lang: _lang()
  }
}());

(function(w,d) {
  function script(args){
    if(args) var name = args.name, require = args.require;
    if(name && (name in w) ) w.addEventListener( 'load', w[name] );
    if(require) {
      if(typeof require === 'string' ) {
        if(require in script.map) require = script.map[require]
        script.load(require);
      }
      else {
        for( i in require ) {
          var url =  require[i];
          if(url in script.map) url = script.map[url];
          script.load(url);
        }
      }
    }
  }
  var internal = d.currentScript;
  script.map = {};
  script.path = {};
  script.path.file = internal.getAttribute('src');
  script.path.dir = script.path.file.replace('script.js','');
  script.path.base = (function(){
    var
      element = (function() {
        var base = d.getElementsByTagName('base')[0];
        if(base) return base.getAttribute('href');
        else return false;
      }()),
      href = location.href.replace('file://',''),
      relative = (function() {
        if(element) {
          var
            i_element = element.split('/').length,
            a_href = href.split('/'), a_result = [],
            i
          ;
          for( i = 0; i < a_href.length - i_element; i++ ) a_result.push(a_href[i]);
          return a_result.join('/')+'/';
        }
        else return href;
      }()),
      rest = href.substring(relative.length),
      actual = rest.substring(0,rest.lastIndexOf('/')+1),
      filename = href.split('/').pop()
    ;
    return {
      element: element,
      href: href,
      relative: relative,
      rest: rest,
      actual: actual,
      filename: filename
    };
  }());
  script.path.loaded = [];
  script.load = function(url,cb, pending ) {
    var base = script.path.base;
    if(base.element) url = base.actual + url;
    var url_absolute = (function() {
      var link = d.createElement('link');
      link.disabled = 'disabled';
      link.href = url
      d.head.appendChild(link);
      link.parentNode.removeChild(link);
      return link.href
    })(), loaded = script.path.loaded;
    if( loaded.indexOf(url_absolute) >= 0 ) return;
    else {
      loaded.push(url_absolute);
      var file_type = url.split('.').pop();
      if(file_type === 'js') {
        var new_script = d.createElement('script');
        new_script.src = url;
        new_script.async = false;
        new_script.onload = function() {
          if(cb) cb(new_script);
          //d.head.removeChild(new_script);
        }
        d.head.appendChild(new_script);
      }
      if(file_type === 'css') {
        var new_link = d.createElement('link');
        new_link.rel = 'stylesheet';
        new_link.href = url;
        d.head.insertBefore( new_link, d.scripts[0] );
        if(cb) cb(new_link);
      }
    }
  }
  script.test = function(option,native) {
    var config = {
      name: option.name || '',
      call: option.call ? option.call() : 0,
      should: typeof option.should === 'boolean' ? option.should.toString() : option.should || '0'
    };
    var result = {
      test: config.name,
      should: config.should,
      pass: (config.should.toString() === config.call.toString())
    };
    if(native) return result;
    else {
      var pretty = [
        'Test   : <span style="color:white">'+result.test+'</span>',
        'Should : <span style="color:orange">'+result.should+'</span>',
        'Pass   : '+( result.pass ? '<span style="color:green">'+result.pass+'</span>' : '<span style="color:red">'+result.pass+'</span>' )
      ].join('\n');
      return console.log(pretty);
    }
  };
  script.routes = function(f_cb) {
    w.addEventListener('hashchange', function() {
      var routes= location.hash.substring(2);
      if(f_cb) f_cb(routes)
    })
  };
  w.script = script;
}(window,document))
