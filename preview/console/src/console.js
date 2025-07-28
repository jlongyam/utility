// Console Polyfill - ECMAScript Console Standard compliant
// https://console.spec.whatwg.org/
(function(global) {
    function formatArgs(args) {
        return Array.prototype.slice.call(args).map(function(arg) {
            if (typeof arg === 'object' && arg !== null) {
                try {
                    return JSON.stringify(arg);
                } catch (e) {
                    return '[object]';
                }
            }
            return String(arg);
        }).join(' ');
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
            toggle.addEventListener('touchstart', function(e) { e.preventDefault(); doToggle(e); });
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

    function renderTable(data, columns) {
        var table = document.createElement('table');
        table.className = 'console-table';
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');
        var allRows = Array.isArray(data) ? data : [data];
        if (!columns) {
            columns = [];
            allRows.forEach(function(row) {
                if (row && typeof row === 'object') {
                    Object.keys(row).forEach(function(k) {
                        if (columns.indexOf(k) === -1) columns.push(k);
                    });
                }
            });
        }
        var showIndex = Array.isArray(data);
        var tr = document.createElement('tr');
        if (showIndex) {
            var th = document.createElement('th');
            th.textContent = '(index)';
            tr.appendChild(th);
        }
        columns.forEach(function(col) {
            var th = document.createElement('th');
            th.textContent = col;
            tr.appendChild(th);
        });
        thead.appendChild(tr);
        allRows.forEach(function(row, idx) {
            var tr = document.createElement('tr');
            if (showIndex) {
                var td = document.createElement('td');
                td.textContent = idx;
                tr.appendChild(td);
            }
            columns.forEach(function(col) {
                var td = document.createElement('td');
                if (row && typeof row === 'object' && col in row) {
                    td.textContent = String(row[col]);
                } else {
                    td.textContent = '';
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(thead);
        table.appendChild(tbody);
        return table;
    }

    function print(type, args, rawObj) {
        var indent = indentString.repeat(indentLevel);
        var msg = indent + formatArgs(args);
        if (typeof window !== 'undefined' && document && document.getElementById) {
            var out = document.getElementById('console');
            if (out) {
                var div = document.createElement('div');
                div.className = type;
                if (type === 'dir' && rawObj !== undefined) {
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
                    toggle.addEventListener('touchstart', function(e) { e.preventDefault(); doToggle(e); });
                    div.appendChild(collapsedRoot);
                    div.appendChild(tree);
                } else if (type === 'table' && args.length > 0) {
                    var table = renderTable(args[0], args[1]);
                    div.appendChild(table);
                } else {
                    div.textContent = msg;
                }
                out.appendChild(div);
                return;
            }
        }
        if (typeof global.print === 'function') {
            global.print(msg);
        } else if (typeof global.alert === 'function') {
            global.alert(msg);
        }
    }

    var console = {
        log: function() { print('log', arguments); },
        info: function() { print('info', arguments); },
        warn: function() { print('warn', arguments); },
        error: function() { print('error', arguments); },
        debug: function() { print('debug', arguments); },
        assert: function(condition) {
            if (!condition) {
                var args = Array.prototype.slice.call(arguments, 1);
                print('assert', ['Assertion failed:'].concat(args));
            }
        },
        clear: function() {
            if (typeof window !== 'undefined' && document && document.getElementById) {
                var out = document.getElementById('console');
                if (out) out.innerHTML = '';
            }
        },
        count: function(label) {
            label = label || 'default';
            counts[label] = (counts[label] || 0) + 1;
            print('count', [label + ': ' + counts[label]]);
        },
        countReset: function(label) {
            label = label || 'default';
            counts[label] = 0;
        },
        group: function() {
            indentLevel++;
        },
        groupCollapsed: function() {
            indentLevel++;
        },
        groupEnd: function() {
            if (indentLevel > 0) indentLevel--;
        },
        time: function(label) {
            label = label || 'default';
            timers[label] = Date.now();
        },
        timeEnd: function(label) {
            label = label || 'default';
            if (timers[label]) {
                var duration = Date.now() - timers[label];
                print('time', [label + ': ' + duration + 'ms']);
                delete timers[label];
            }
        },
        timeLog: function(label) {
            label = label || 'default';
            if (timers[label]) {
                var duration = Date.now() - timers[label];
                print('timeLog', [label + ': ' + duration + 'ms']);
            }
        },
        trace: function() {
            var err = new Error();
            print('trace', ['Trace:', err.stack]);
        },
        table: function(data, columns) {
            print('table', arguments);
        },
        dir: function(obj) {
            print('dir', [JSON.stringify(obj, null, 2)], obj);
        },
        dirxml: function(obj) {
            print('dirxml', [JSON.stringify(obj, null, 2)]);
        },
        profile: function() {},
        profileEnd: function() {},
        timeStamp: function(label) {},
    };

    // Interactive console input, history, and scroll (non-test, reusable)
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        document.addEventListener('DOMContentLoaded', function() {
            // Create #console and #console-input if not present
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
                input.addEventListener('keydown', function(e) {
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
                            setTimeout(function() { input.setSelectionRange(input.value.length, input.value.length); }, 0);
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
                            setTimeout(function() { input.setSelectionRange(input.value.length, input.value.length); }, 0);
                        }
                        e.preventDefault();
                    }
                });
                input.focus();
            }
            var out = document.getElementById('console');
            if (out) {
                var observer = new MutationObserver(function() {
                    out.scrollTop = out.scrollHeight;
                });
                observer.observe(out, {childList: true});
            }
        });
    }

    global.console = console;
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
