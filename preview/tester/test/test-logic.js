// ===== Test Cases =====

// Replace these with your actual tests

test("Array length", function () {
  var arr = [1, 2, 3];
  assert(arr.length === 3, "Expected length 3");
});

test("String concatenation", function () {
  var result = "Hello" + " " + "World";
  assert(result === "Hello World", "Concatenation failed");
});

test("Object property", function () {
  var obj = { prop: "value" };
  assert(obj.prop === "value", "Property access failed");
});

test("Failing test example", function () {
  assert(1 === 2, "This test is designed to fail");
});