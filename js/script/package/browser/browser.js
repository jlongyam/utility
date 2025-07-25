(function() {
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
  script({
    package: script.package,
    export: {
      browser: {
        is: _is(),
        engine: _engine(),
        brand: _brand(),
        name: _name(),
        version: _version(),
        os: _os(),
        cpu: _cpu(),
        lang: _lang()      
      }
    }
  })
}())