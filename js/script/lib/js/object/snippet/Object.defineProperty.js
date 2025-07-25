// OBJECT_TARGET is from available object
// or create new with '{}' or  
Object.defineProperty( OBJECT_TARGET, "STRING_NAME", {
  value: ANY, // undefined | optional ? js value, any type
  get: function() { // undefined | optional ? call without ()
  }, 
  set: function( ARGS ) { // undefined | optional ? use ARGS to set outside value
  },
  enumerable: BOOL, // false | optional ? JSON.stringify_able | controlable by 'for in'
  writeable: BOOL, // false | optional ? assignment_able
  configurable: BOOL // false | optional ? allow other property to configure value. true if writable also true
})
/*
// == 1 ==

var o = {}
o.a = 1
// equivalent to
Object.defineProperty(o,'a', {
  value: 1,
  enumerable: true,
  writeable: true,
  configurable: true
})

// == 2 ==
// if no other configuration, like
Obejct.defineProperty(o,'a', { value: 2 })
// equivalent to 'default'
  ...
  enumerable: false,
  writeable: false,
  configurable: false
  ...

*/
// Note:
// this creational can be use to make self prototype,
// then function become class.
// instance_able with 'new' keyword
/* example

// [1] inside

function Big() {
  let value = undefined;
  Object.defineProperty( Big.prototype, 'prop' , {
    get: function() { return value },
    set: (a) {
      value = a
    }
  })
}
var small = new Big();
small.prop

// [2] outside

function Big() {}
Big.prototype.A = 1
Object.defineProperty(Big.prototype, 'B', { ... })

// [3] this

function Big() {
  var A = 0
  Object.defineProperty(this,'A', {})
}

*/