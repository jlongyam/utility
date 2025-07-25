script({ name: 'calc', require: ['sample/one.js', 'sample/two.js', 'sample/three.js'] })

function calc() {
  //object([one,two,three]).forEach(function(val){
    //console.log(val)
  //})
  // or
  console.log([one,two,three])
}