script({ name: 'myApp' })

var temp = 'temp content';

Object.create(myApp = function(arg) {
  console.log(arg);  
//}, { // Not work
  //val: {
    //value: 'the value of myApp.val'
  //},
  //prop: {
    //get: function() {
      //return temp
    //},
    //set: function(arg) {
      //temp = arg
    //}
  //}
});
Object.defineProperties(myApp, { // OK
  val: {
    value: 'the value of myApp.val'
  },
  prop: {
    get: function() {
      return temp
    },
    set: function(arg) {
      temp = arg
    }
  }
});
