script({
  package: script.package,
  export: {
    style: function(prop) {
      var arr = [], o, l = '\n', s = '  ', ls = l+s
      for(o in prop ) arr.push(o+s+'{'+l+s+prop[o].join(';'+ls)+l+'}'+ls )
      return arr.join(l)
    }    
  }
},function(package,d,w){
  var style = package.style
  style.get = function(s_el, s_prop) {
    var el_style =  w.getComputedStyle(s_el)
    return s_prop ? el_style[s_prop] : el_style
  }
})
