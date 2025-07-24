// node ./node.test.js
let path = require('../path')
let result = 'path.\n'
result += '.location: ' + path.location + '\n'
result += '.directory(): ' + path.directory() + '\n'
result += '.up(): ' + path.up() + '\n'
result += '.root(): ' + path.root() + '\n'
// windows separator '\\'
result += '.root("current\\"): ' + path.root('current\\') + '\n'
result += '.name(): ' + path.name() + '\n'
result += '.name(__filename): ' + path.name(__filename) + '\n'
result += '.relative("current\\"): ' + path.relative("current\\") + '\n'
result += '.relative("current\\", __filename): ' + path.relative("current\\", __filename) + '\n'
console.log(result)