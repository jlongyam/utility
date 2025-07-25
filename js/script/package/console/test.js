script({
  import: ['console.js'],
  context: { name: 'console' }
},function(package){
  var Console = package.console
  function consoleTest(option){
    var L = '\n', result = script.test(option),
      pretty = [
        result.context ? 'Context  : <span style="font-weight:bold;color:white">'+result.context+'</span>' : '',
        result.test ? 'Test     : <span style="color:white">'+result.test+'</span>' : '',
        'Should   : <span style="color:orange">'+result.should+'</span>',
        'Pass     : '+( result.pass ? '<span style="color:green">'+result.pass+'</span>' : '<span style="color:red">'+result.pass+'</span>' )
      ].join(L)
    ;
    return Console.log(pretty.trim())
  }
  script({
    package: package.console,
    export: {
      test: consoleTest
    }
  })
})