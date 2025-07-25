// OBJECT_PROTO
// it can {} or null or anyObject.prototype
Object.create( OBJECT_PROTO, { /* equivalent to Object.defineProperties */})
/*
// [1]

var o = {}
// equivalent to
Object.create(Object.prototype)

// [2]

function Big() {}
var small = new Big()
// equivalent
var small = Object.create(Big.prototype)
*/