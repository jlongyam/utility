script({
  package: script.package,
  export: {
    mod: function() {
      return 'MOD'
    }
  }
},function(package) {
  package.mod.one = 'ONE'
})