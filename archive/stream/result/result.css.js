{
  let style = `
    .result-area {
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Ubuntu, Cantarell, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
      padding: 2.5%;
      line-height: 2em;
    }
    .result-log,
    .result-script {
      font: 1em ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
      padding: 1em;
      background-color: black;
      color: silver;
      margin: 0 0 1em 0;
      border-top: 1em solid gray;
      position: relative;
      overflow: auto;
    }
    .result-script[data-result-source]::before {
      content: '//<script src="' attr(data-result-source) '">';
      color: gray;
    }
    .result-demo {
      margin: 0 0 1em 0;
    }
    .result-script {
      display: block;
      background-color: #fff9c8;
      color: black;
      white-space: pre;
    }
  `
  document.head.appendChild(Object.assign(document.createElement('style'), { textContent: style }))
  document.head.removeChild(document.currentScript)
}