// Console Polyfill - ECMAScript Console Standard compliant
// https://console.spec.whatwg.org/
(function (global) {
  document.addEventListener('DOMContentLoaded', function () {
    // String substitution and style support
    function formatArgs(args) {
      if (!args.length) return { formatted: [], styles: [] };
      var first = args[0];
      var rest = Array.prototype.slice.call(args, 1);
      var styles = [];
      if (typeof first === 'string' && /%[sdifoOc]/.test(first)) {
        var i = 0;
        var nodes = [];
        var lastIndex = 0;
        var pattern = /%([sdifoOc%])/g;
        var match, str = first;
        while ((match = pattern.exec(str)) !== null) {
          if (match.index > lastIndex) {
            nodes.push(document.createTextNode(str.slice(lastIndex, match.index)));
          }
          var type = match[1];
          if (type === '%') {
            nodes.push(document.createTextNode('%'));
          } else if (type === 'c') {
            styles.push(rest[i++] || '');
          } else {
            var val = rest[i++];
            nodes.push(formatSingleArg(val));
          }
          lastIndex = match.index + match[0].length;
        }
        if (lastIndex < str.length) {
          nodes.push(document.createTextNode(str.slice(lastIndex)));
        }
        // Add any remaining arguments
        for (; i < rest.length; i++) {
          nodes.push(document.createTextNode(' '));
          nodes.push(formatSingleArg(rest[i]));
        }
        return { formatted: nodes, styles };
      } else {
        // No substitution, return array of spans
        var spans = Array.prototype.map.call(args, formatSingleArg);
        return { formatted: spans, styles: [] };
      }
    }
    function getTypeClass(arg) {
      if (arg === null) return 'js-null';
      if (Array.isArray(arg)) return 'js-array';
      switch (typeof arg) {
        case 'string': return 'js-string';
        case 'number': return 'js-number';
        case 'boolean': return 'js-boolean';
        case 'undefined': return 'js-undefined';
        case 'function': return 'js-function';
        case 'symbol': return 'js-symbol';
        case 'bigint': return 'js-bigint';
        case 'object': return 'js-object';
        default: return '';
      }
    }
    function formatSingleArg(arg) {
      var span = document.createElement('span');
      var typeClass = getTypeClass(arg);
      span.className = typeClass;
      if (typeClass === 'js-string') {
        span.textContent = arg;
      } else if (typeClass === 'js-null') {
        span.textContent = 'null';
      } else if (typeClass === 'js-undefined') {
        span.textContent = 'undefined';
      } else if (typeClass === 'js-array') {
        try {
          span.textContent = JSON.stringify(arg);
        } catch (e) {
          span.textContent = '[array]';
        }
      } else if (typeClass === 'js-object') {
        try {
          span.textContent = JSON.stringify(arg);
        } catch (e) {
          span.textContent = '[object]';
        }
      } else if (typeClass === 'js-function') {
        span.textContent = arg.toString();
      } else if (typeClass === 'js-symbol') {
        span.textContent = arg.toString();
      } else if (typeClass === 'js-bigint') {
        span.textContent = arg.toString() + 'n';
      } else {
        span.textContent = String(arg);
      }
      return span;
    }

    var timers = {};
    var counts = {};
    var indentLevel = 0;
    var indentString = '  ';

    function isExpandable(val) {
      return val && typeof val === 'object' && (Array.isArray(val) || Object.keys(val).length > 0);
    }

    function renderTree(obj, depth) {
      depth = depth || 0;
      var container = document.createElement('div');
      container.className = 'dir-tree dir-indent-' + Math.min(depth, 9);
      if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
          var val = obj[i];
          var item = renderTreeEntry(i, val, depth + 1);
          container.appendChild(item);
        }
      } else if (typeof obj === 'object' && obj !== null) {
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; j++) {
          var key = keys[j];
          var val = obj[key];
          var item = renderTreeEntry(key, val, depth + 1);
          container.appendChild(item);
        }
      } else {
        var valSpan = document.createElement('span');
        valSpan.className = 'dir-value';
        valSpan.textContent = String(obj);
        container.appendChild(valSpan);
      }
      return container;
    }

    function renderTreeEntry(key, val, depth) {
      var entry = document.createElement('div');
      entry.className = 'dir-tree-entry dir-indent-' + Math.min(depth, 9);
      if (isExpandable(val)) {
        var collapsedLine = document.createElement('div');
        collapsedLine.className = 'dir-collapsed-line';
        var toggle = document.createElement('span');
        toggle.className = 'dir-toggle';
        toggle.textContent = '▶';
        var keySpan = document.createElement('span');
        keySpan.className = 'dir-key';
        keySpan.textContent = key + ': ';
        var typeSpan = document.createElement('span');
        typeSpan.className = 'dir-type';
        typeSpan.textContent = Array.isArray(val) ? 'Array(' + val.length + ')' : (val && val.constructor && val.constructor !== Object ? val.constructor.name : 'Object');
        collapsedLine.appendChild(keySpan);
        collapsedLine.appendChild(typeSpan);
        collapsedLine.appendChild(toggle);
        var expanded = renderTree(val, depth + 1);
        expanded.classList.add('dir-hidden');
        function doToggle(e) {
          e.stopPropagation();
          if (expanded.classList.contains('dir-hidden')) {
            expanded.classList.remove('dir-hidden');
            expanded.classList.add('dir-expanded');
            toggle.textContent = '▼';
          } else {
            expanded.classList.add('dir-hidden');
            expanded.classList.remove('dir-expanded');
            toggle.textContent = '▶';
          }
        }
        toggle.addEventListener('click', doToggle);
        toggle.addEventListener('touchstart', function (e) { e.preventDefault(); doToggle(e); });
        entry.appendChild(collapsedLine);
        entry.appendChild(expanded);
      } else {
        var keySpan = document.createElement('span');
        keySpan.className = 'dir-key';
        keySpan.textContent = key + ': ';
        var valSpan = document.createElement('span');
        valSpan.className = 'dir-value';
        valSpan.textContent = String(val);
        entry.appendChild(keySpan);
        entry.appendChild(valSpan);
      }
      return entry;
    }

    function consolePrint(type, args, rawObj) {
      var indent = indentString.repeat(indentLevel);
      var out = document.getElementById('console');
      if (!out) return;
      var div = document.createElement('div');
      div.className = type;
      // Special handling for log/info/warn/error with substitution and style
      if ((type === 'log' || type === 'info' || type === 'warn' || type === 'error' || type === 'debug') && args.length > 0) {
        var { formatted, styles } = formatArgs(args);
        // Handle %c for inline styles
        if (styles.length > 0) {
          // Handle %c for inline styles
          var spanIdx = 0;
          var styleIdx = 0;
          while (spanIdx < formatted.length) {
            var span = document.createElement('span');
            // Collect nodes until next style or end
            while (spanIdx < formatted.length && !(formatted[spanIdx].nodeType === 3 && formatted[spanIdx].textContent === '')) {
              span.appendChild(formatted[spanIdx]);
              spanIdx++;
            }
            if (styles[styleIdx]) span.setAttribute('style', styles[styleIdx]);
            div.appendChild(span);
            styleIdx++;
            spanIdx++;
          }
        } else {
          div.appendChild(document.createTextNode(indent));
          for (var i = 0; i < formatted.length; i++) {
            if (i > 0) div.appendChild(document.createTextNode(' '));
            div.appendChild(formatted[i]);
          }
        }
      } else if (type === 'dir' && rawObj !== undefined) {
        var collapsedRoot = document.createElement('div');
        collapsedRoot.className = 'dir-collapsed-line';
        var toggle = document.createElement('span');
        toggle.className = 'dir-toggle';
        toggle.textContent = '▶';
        var typeSpan = document.createElement('span');
        typeSpan.className = 'dir-type';
        if (Array.isArray(rawObj)) {
          typeSpan.textContent = 'Array(' + rawObj.length + ')';
        } else if (rawObj && rawObj.constructor && rawObj.constructor !== Object) {
          typeSpan.textContent = rawObj.constructor.name;
        } else {
          typeSpan.textContent = 'Object';
        }
        collapsedRoot.appendChild(typeSpan);
        collapsedRoot.appendChild(toggle);
        var tree = renderTree(rawObj, 0);
        tree.classList.add('dir-hidden');
        function doToggle(e) {
          e.stopPropagation();
          if (tree.classList.contains('dir-hidden')) {
            tree.classList.remove('dir-hidden');
            tree.classList.add('dir-expanded');
            toggle.textContent = '▼';
          } else {
            tree.classList.add('dir-hidden');
            tree.classList.remove('dir-expanded');
            toggle.textContent = '▶';
          }
        }
        toggle.addEventListener('click', doToggle);
        toggle.addEventListener('touchstart', function (e) { e.preventDefault(); doToggle(e); });
        div.appendChild(collapsedRoot);
        div.appendChild(tree);
      } else {
        // For all other types (assert, count, etc.), use formatArgs and append nodes
        var { formatted } = formatArgs(args);
        div.appendChild(document.createTextNode(indent));
        for (var i = 0; i < formatted.length; i++) {
          div.appendChild(formatted[i]);
        }
      }
      out.appendChild(div);
    }

    var console = {
      log: function () { consolePrint('log', arguments); },
      info: function () { consolePrint('info', arguments); },
      warn: function () { consolePrint('warn', arguments); },
      error: function () { consolePrint('error', arguments); },
      debug: function () { consolePrint('debug', arguments); },
      assert: function (condition) {
        if (!condition) {
          var args = Array.prototype.slice.call(arguments, 1);
          consolePrint('assert', ['Assertion failed:'].concat(args));
        }
      },
      clear: function () {
        var out = document.getElementById('console');
        if (out) out.innerHTML = '';
      },
      count: function (label) {
        label = label || 'default';
        counts[label] = (counts[label] || 0) + 1;
        consolePrint('count', [label + ': ' + counts[label]]);
      },
      countReset: function (label) {
        label = label || 'default';
        counts[label] = 0;
      },
      group: function () {
        indentLevel++;
      },
      groupCollapsed: function () {
        indentLevel++;
      },
      groupEnd: function () {
        if (indentLevel > 0) indentLevel--;
      },
      time: function (label) {
        label = label || 'default';
        timers[label] = Date.now();
      },
      exception: function () {
        consolePrint('error', arguments);
      },
      markTimeline: function () { },
      timeline: function () { },
      timelineEnd: function () { },
      timeStamp: function (label) {
        consolePrint('timeStamp', [label ? String(label) : 'Timestamp: ' + new Date().toISOString()]);
      },
      context: function () { },
      memory: {},
      timeEnd: function (label) {
        label = label || 'default';
        if (timers[label]) {
          var duration = Date.now() - timers[label];
          consolePrint('time', [label + ': ' + duration + 'ms']);
          delete timers[label];
        }
      },
      timeLog: function (label) {
        label = label || 'default';
        if (timers[label]) {
          var duration = Date.now() - timers[label];
          consolePrint('timeLog', [label + ': ' + duration + 'ms']);
        }
      },
      trace: function () {
        var err = new Error();
        var stack = (err.stack || '').split('\n');
        if (stack.length > 1) stack = stack.slice(1);
        consolePrint('trace', ['Trace:', stack.join('\n')]);
      },
      table: function (data, columns) {
        // Table rendering unchanged
      },
      dir: function (obj) {
        consolePrint('dir', [''], obj);
      },
      dirxml: function (obj) {
        function renderDomTree(node, depth) {
          depth = depth || 0;
          var container = document.createElement('div');
          container.className = 'dir-tree dir-indent-' + Math.min(depth, 9);
          if (node.nodeType === 1) { // Element
            var entry = document.createElement('div');
            entry.className = 'dir-tree-entry dir-indent-' + Math.min(depth, 9);
            var collapsedLine = document.createElement('div');
            collapsedLine.className = 'dir-collapsed-line';
            var toggle = document.createElement('span');
            toggle.className = 'dir-toggle';
            toggle.textContent = node.children.length > 0 ? '▶' : '';
            var tagSpan = document.createElement('span');
            tagSpan.className = 'dir-key';
            tagSpan.textContent = '<' + node.nodeName.toLowerCase();
            // Add attributes
            for (var i = 0; i < node.attributes.length; i++) {
              var attr = node.attributes[i];
              tagSpan.textContent += ' ' + attr.name + '="' + attr.value + '"';
            }
            tagSpan.textContent += '>';
            collapsedLine.appendChild(tagSpan);
            if (toggle.textContent) collapsedLine.appendChild(toggle);
            var expanded = document.createElement('div');
            expanded.className = 'dir-hidden';
            // Children
            for (var j = 0; j < node.childNodes.length; j++) {
              expanded.appendChild(renderDomTree(node.childNodes[j], depth + 1));
            }
            // Closing tag
            if (node.childNodes.length > 0) {
              var closeTag = document.createElement('div');
              closeTag.className = 'dir-tree-entry dir-indent-' + Math.min(depth + 1, 9);
              var closeSpan = document.createElement('span');
              closeSpan.className = 'dir-key';
              closeSpan.textContent = '</' + node.nodeName.toLowerCase() + '>';
              closeTag.appendChild(closeSpan);
              expanded.appendChild(closeTag);
            }
            function doToggle(e) {
              e.stopPropagation();
              if (expanded.classList.contains('dir-hidden')) {
                expanded.classList.remove('dir-hidden');
                expanded.classList.add('dir-expanded');
                toggle.textContent = '▼';
              } else {
                expanded.classList.add('dir-hidden');
                expanded.classList.remove('dir-expanded');
                toggle.textContent = '▶';
              }
            }
            if (toggle.textContent) {
              toggle.addEventListener('click', doToggle);
              toggle.addEventListener('touchstart', function (e) { e.preventDefault(); doToggle(e); });
            }
            entry.appendChild(collapsedLine);
            if (node.children.length > 0) entry.appendChild(expanded);
            container.appendChild(entry);
          } else if (node.nodeType === 3) { // Text
            var textEntry = document.createElement('div');
            textEntry.className = 'dir-tree-entry dir-indent-' + Math.min(depth, 9);
            var textSpan = document.createElement('span');
            textSpan.className = 'dir-value';
            textSpan.textContent = '"' + node.textContent.trim() + '"';
            textEntry.appendChild(textSpan);
            container.appendChild(textEntry);
          } else if (node.nodeType === 8) { // Comment
            var commentEntry = document.createElement('div');
            commentEntry.className = 'dir-tree-entry dir-indent-' + Math.min(depth, 9);
            var commentSpan = document.createElement('span');
            commentSpan.className = 'dir-value';
            commentSpan.textContent = '<!-- ' + node.textContent + ' -->';
            commentEntry.appendChild(commentSpan);
            container.appendChild(commentEntry);
          } else if (node.nodeType === 9) { // Document
            for (var k = 0; k < node.childNodes.length; k++) {
              container.appendChild(renderDomTree(node.childNodes[k], depth));
            }
          } else {
            // Other node types
            var otherEntry = document.createElement('div');
            otherEntry.className = 'dir-tree-entry dir-indent-' + Math.min(depth, 9);
            var otherSpan = document.createElement('span');
            otherSpan.className = 'dir-value';
            otherSpan.textContent = node.nodeName;
            otherEntry.appendChild(otherSpan);
            container.appendChild(otherEntry);
          }
          return container;
        }
        if (typeof obj === 'object' && obj && obj.nodeType) {
          var out = document.getElementById('console');
          if (!out) return;
          var div = document.createElement('div');
          div.className = 'dirxml';
          div.appendChild(renderDomTree(obj, 0));
          out.appendChild(div);
        } else {
          consolePrint('dirxml', [''], obj);
        }
      },
      profile: function (label) { },
      profileEnd: function (label) { },
    };

    // Console area and input
    if (!document.getElementById('console')) {
      var outDiv = document.createElement('div');
      outDiv.id = 'console';
      document.body.appendChild(outDiv);
    }
    if (!document.getElementById('console-input')) {
      var input = document.createElement('input');
      input.id = 'console-input';
      input.type = 'text';
      input.autocomplete = 'off';
      input.placeholder = 'Type JavaScript and press Enter...';
      document.body.appendChild(input);
    }
    var input = document.getElementById('console-input');
    if (input) {
      var history = [];
      var historyIndex = -1;
      var tempInput = '';
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          var code = input.value;
          if (code.trim() !== '') {
            if (history.length === 0 || history[history.length - 1] !== code) {
              history.push(code);
            }
          }
          historyIndex = history.length;
          input.value = '';
          tempInput = '';
          try {
            var result = eval(code);
            if (result !== undefined) {
              console.log(result);
            }
          } catch (err) {
            console.error(err);
          }
        } else if (e.key === 'ArrowUp') {
          if (history.length > 0 && historyIndex > 0) {
            if (historyIndex === history.length) tempInput = input.value;
            historyIndex--;
            input.value = history[historyIndex];
            setTimeout(function () { input.setSelectionRange(input.value.length, input.value.length); }, 0);
          }
          e.preventDefault();
        } else if (e.key === 'ArrowDown') {
          if (history.length > 0 && historyIndex < history.length) {
            historyIndex++;
            if (historyIndex === history.length) {
              input.value = tempInput;
            } else {
              input.value = history[historyIndex];
            }
            setTimeout(function () { input.setSelectionRange(input.value.length, input.value.length); }, 0);
          }
          e.preventDefault();
        }
      });
      input.focus();
    }
    var out = document.getElementById('console');
    if (out) {
      var observer = new MutationObserver(function () {
        out.scrollTop = out.scrollHeight;
      });
      observer.observe(out, { childList: true });
    }

    Object.defineProperty(console, 'memory', {
      get: function () { return {}; },
      configurable: true
    });

    global.console = console;
  });
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
