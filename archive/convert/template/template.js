function template(obj, input) {
  let
    re = /{%(.+?)%}/g,
    reExp = /(^( )?(let|if|for|else|switch|case|break|{|}))(.*)?/g,
    code = 'let r=[];\n',
    cursor = 0,
    match,
    add = (line, js) => {
      js
        ? (code += line.match(reExp)
          ? line + '\n' : 'r.push(' + line + ');\n')
        : (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
      return add;
    }
    ;
  while (match = re.exec(input)) {
    add(input.slice(cursor, match.index))(match[1], true);
    cursor = re.lastIndex;
  }
  add(input.substr(cursor, input.length - cursor));
  code += 'return r.join("");';
  return new Function(code.replace(/[\r\t\n]/g, '')).apply(obj);
}
function innerHTML(o, s) { o.innerHTML = s }