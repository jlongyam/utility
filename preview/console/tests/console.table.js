//[1]
console.table(["apples", "oranges", "bananas"]);
//[2] an object whose properties are strings
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
//[3]
const me = new Person("Tyrone", "Jones");
console.table(me);
//[4] an array of arrays
const people = [
  ["Tyrone", "Jones"],
  ["Janet", "Smith"],
  ["Maria", "Cruz"],
];
console.table(people);
//[5] an array of objects
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

var tyrone = new Person("Tyrone", "Jones");
var janet = new Person("Janet", "Smith");
var maria = new Person("Maria", "Cruz");

console.table([tyrone, janet, maria]);
//[6] an array of objects, logging only firstName

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

var tyrone = new Person("Tyrone", "Jones");
var janet = new Person("Janet", "Smith");
var maria = new Person("Maria", "Cruz");

console.table([tyrone, janet, maria], ["firstName"]);


// single quotes
console.table({
  name: "John",
  age: 30,
  active: true,
  tags: ["admin", "user"],
  address: null
});

// final
// Custom object
console.table({
  name: "John",
  age: 30,
  active: true,
  address: null,
  skills: ["JS", "CSS"]
});

// class instance
class Pers {
  constructor(name) {
    this.name = name;
  }
}
console.table(new Pers("Alice"));

// Array of mixed values
console.table([1, true, "text", {key: "value"}]);