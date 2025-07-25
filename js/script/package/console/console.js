script({
  import: ['style.js', 'dom/create.js' ],
  context: { name: 'dom' }
}, function(package,d,w){
  var style = package.style, dom = package.dom;
  var Console = {
    input: false,
    html: true,
    override: false 
  };
  function setupStyle() {
    var s_style = style({
      '#console_box': [
        'box-sizing: border-box',
        'border: 2px solid whitesmoke',
        'font: 16px/1.25 Monaco, Consolas, "Roboto Mono", monospace'
      ],
      '#console_output': [
        'padding: 8px',
        'padding-bottom: 0'
      ],
      '#console_input': [],
      '.console': [
        'border-left: 8px solid gray',
        'padding: 8px',
        'margin-bottom: 8px',
        'background-color: black',
        'white-space: pre',
        'overflow: auto'
      ],
      '.console.log': ['color: silver'],
      '.console.error': ['color: red'],
      '.console.warn': ['color: orange'],
      '.console.info': ['color: white'],
      '.console.debug': ['color: green']
    })
    dom.create(['style', { id: 'console_style' }, s_style], d.head )
  }
  function setupDOM() {
    if(!('console_style' in w)) setupStyle()
    dom.create(['div', { id: 'console_box' }], d.body )
    dom.create(['div', { id: 'console_output' }], console_box )
  }
  Console.log = function() {
    if( !('console_output' in w) ) setupDOM()
    var line = dom.create(['div',{ class:'console log' }])
    var args = arguments, i;
    for(i in args) {
      if(Console.html) line.innerHTML += args[i]
      else line.textContent += args[i]
    }
    console_output.appendChild(line)
  }
  Console.error = function() {
    if( !('console_output' in w) ) setupDOM()
    var line = dom.create(['div',{ class:'console error' }])
    var args = arguments, i;
    for(i in args) {
      if(Console.html) line.innerHTML += args[i]
      else line.textContent += args[i]
    }
    console_output.appendChild(line)
  }
  Console.warn = function() {
    if( !('console_output' in w) ) setupDOM()
    var line = dom.create(['div',{ class:'console warn' }])
    var args = arguments, i;
    for(i in args) {
      if(Console.html) line.innerHTML += args[i]
      else line.textContent += args[i]
    }
    console_output.appendChild(line)
  }
  Console.info = function() {
    if( !('console_output' in w) ) setupDOM()
    var line = dom.create(['div',{ class:'console info' }])
    var args = arguments, i;
    for(i in args) {
      if(Console.html) line.innerHTML += args[i]
      else line.textContent += args[i]
    }
    console_output.appendChild(line)
  }
  Console.debug = function() {
    if( !('console_output' in w) ) setupDOM()
    var line = dom.create(['div',{ class:'console debug' }])
    var args = arguments, i;
    for(i in args) {
      if(Console.html) line.innerHTML += args[i]
      else line.textContent += args[i]
    }
    console_output.appendChild(line)
  }
  script({
    package: script.package,
    export: { console: Console }
  })
})