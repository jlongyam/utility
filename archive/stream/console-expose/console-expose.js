/*! console-expose v1.0.0 | 2023 | MIT License | https://github.com/jlongyam/console-expose *//*
  ========================
  Require:
  ------------------------------
  lib/ua-parser.pack
  lib/detect
  lib/prototype/getAll
  lib/prototype/encodeHTML
  lib/dom/selector
  lib/dom/createElement
  lib/result-hilight
  ------------------------------ */
{
  // Global
  w = window, d = document, ce = createElement
  parent = d.currentScript.parentElement,
  in_head = parent === d.head, ss = sessionStorage
  ui = {}, ui.line = {}, my = {}
  // CSS
  style = `
    .console-container {
      display: block;
      font: 1em/2em system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
      border: 1px solid silver;
      padding: 2.5%;
    }
    .console-line,
    .script-expose {
      white-space: pre;
      font: 1em/1.5em ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
      padding: 1em;
      background-color: black;
      color: silver;
      margin: 0 0 .5em 0;
      border-top: 1em solid gray;
      position: relative;
      overflow: auto;
    }
    .script-expose[data-result-source]::before {
      content: '//<script src="' attr(data-result-source) '">';
      color: gray;
    }
    .console-line_log { color: silver; }
    .console-line_error { color: red; }
    .console-line_warn { color: orange; }
    .console-line_debug { color: green; }
    .script-expose {
      display: block;
      background-color: #fff9c8;
      color: black;
    }
    `
  // ui-root
  ui.style = ce('style', { innerHTML: style })
  ui.container = ce('div', { classList: 'console-container' })
  w.addEventListener('load', ()=> {
    d.head.appendChild(ui.style)
    d.body.appendChild(ui.container)
  })
  // bind
  my.console = console
  my.console.defaultLog = my.console.log.bind( my.console )
  my.console.logs = []
  my.console.log = function() {
    my.console.defaultLog.apply( my.console, arguments )
    my.console.logs.push( Array.from( arguments ).toString().encodeHTML() )
    // --> UI-log
    ui.line.log = createElement( 'div', { classList: 'console-line console-line_log' } )
    ui.container.appendChild( ui.line.log )
    // --> data
    i_log = my.console.logs.length - 1
    ui.line.log.innerHTML = my.console.logs[ i_log ]
    // hilight
    ui.line.log.classList.add('hilight', 'lang-js')
    hilight.js( ui.line.log )
    // --> <script>
    try {
      if( d.currentScript.getAttribute('src') === null ) {
        d.currentScript.classList = 'script-expose'
        ui.container.appendChild( d.currentScript )
        // hilight
        d.currentScript.innerHTML = d.currentScript.innerHTML.stripInitial().trim()
        d.currentScript.classList.add('hilight', 'lang-js')
        hilight.js( d.currentScript )
      }
      else if( d.currentScript.getAttribute('src') !== null && d.currentScript.parentElement != $('head') ) {
        d.currentScript.setAttribute('data-result-source', d.currentScript.getAttribute('src'))
        ui.container.appendChild( d.currentScript )
        d.currentScript.classList.add('script-expose')
      }
    } catch(e){}
  }
  // next!
}