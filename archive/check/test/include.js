result.data = ''
result.data += current() + '\n'
result.data += current.src() + '\n'
result.data += current.script() + '\n'
result.data += current.script.src() + '\n'
result.js(result.data)