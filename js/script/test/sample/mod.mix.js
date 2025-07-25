script({
  import: [
    'mod.js',
    'mod.two.js',
    'mod.three.js'
  ]
}, function(package){
  
  script({
    package: package.mod,
    export: {
      mix: [
        package.mod.one,
        package.mod.two,
        package.mod.three
      ]
    }
  })
  // or
  //package.mod.mix = [
    //package.mod.one,
    //package.mod.two,
    //package.mod.three
  //]
})